import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePpup(props) {//{isOpen, onClose, props}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Подписка на контекст (Коментарий Практикума)
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.  (Коментарий Практикума)
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы (Коментарий Практикума)
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик (Коментарий Практикума)
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm 
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="name-input" className="popup__input popup__input_type_top" name="popup-name" type="text"
        placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange}/>
      <span className="popup__error name-input-error"></span>
      <input id="description-input" className="popup__input popup__input_type_bottom" name="popup-description" type="text"
        placeholder="Описание" required minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange}/>
      <span className="popup__error description-input-error"></span>
    </PopupWithForm>
  )
}