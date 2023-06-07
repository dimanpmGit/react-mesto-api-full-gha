import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info-wrapper">
          <button className="profile__avatar" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar-image" src={`${currentUser.avatar}`} alt={currentUser.name}/>
          </button>  
          <div className="profile__info">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button link" aria-label="Edit" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button link" aria-label="Add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((item) => (
            <Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;