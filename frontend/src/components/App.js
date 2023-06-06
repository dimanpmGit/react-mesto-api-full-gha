import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api.js';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import okImage from '../images/ok.svg';
import notOkImage from '../images/not-ok.svg';
import auth from '../utils/Auth';

export function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // Хук открытия попапа аватарки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // Хук открытия профиля для редактирования
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  // Хук открытия попапа для добавления карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // Хук открытия полноразмерной картинки
  const [selectedCard, setSelectedCard] = useState({});

  // Стейт для определения, залогинен ли пользователь
  const [loggedIn, setLoggedIn] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  
  function handleLogin(user) {
    setLoggedIn(true);
    setFormValues(user);
  }

  useEffect(() => {
    tokenCheck();
    Promise.all([api.getUserInfo(), api.getCardsData()])
    .then((data) => {
      setCurrentUser({
        ...data[0],
        _id: data[0]._id,
        name: data[0].name,
        about: data[0].about,
        avatar: data[0].avatar
      });
      setCards(data[1]);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((message) => {
        setCards((cardsAfterDel) => cardsAfterDel.filter(cardToDel => cardToDel._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((user) => {
        setCurrentUser({
          ...currentUser,
          name: user.name,
          about: user.about
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    api.setUserAvatar(avatarLink)
      .then((avatar) => {
        setCurrentUser({
          ...currentUser,
          avatar: avatar.avatar
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    api.createCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!formValues.password) {
      setIsInfoTooltipOpen(true);
      return;
    }

    auth.register(formValues.email, formValues.password)
      .then(data => {
        setIsRegistered(data);
        setIsInfoTooltipOpen(true);
        navigate('/signin');
      })
      .catch(err => {
        setIsInfoTooltipOpen(true);
      })
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    if (!formValues.password || !formValues.email) {
      setIsInfoTooltipOpen(true);
      return;
    }

    auth.authorize(formValues.email, formValues.password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          tokenCheck(data.token);
          const url = location.state?.returnUrl || '/main';
          navigate(url);
        }
      })
      .catch(err => console.log(err));
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    auth.getContent(token)
      .then(res => {
        handleLogin(res);
        const url = location.state?.returnUrl || '/main';
        navigate(url);
      })
      .catch(err => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={formValues ? formValues.email : ''} />
            <Routes>
              <Route path="/signin" element={<Login handleChange={handleChange} handleSubmit={handleLoginSubmit} formValues={formValues} />} />
              <Route path="/signup" element={<Register handleChange={handleChange} handleSubmit={handleRegisterSubmit} formValues={formValues} />} />
              <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/signin" replace />} />
              <Route path="/main" element={
                <ProtectedRoute 
                  element={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                />
              }
            />
            </Routes>
            <Footer />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            <InfoTooltip 
              isOpen={isInfoTooltipOpen} 
              onClose={closeAllPopups} 
              titleText={isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
              imgPath={isRegistered ? okImage : notOkImage}
            />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};