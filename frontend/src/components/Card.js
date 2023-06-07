import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  
  // Подписываем компонент Card на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);
  
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img className="card__image" src={`${card.link}`} alt={`${card.name}`} onClick={handleClick}/>
      {isOwn && <button className='card__trash-button' onClick={handleDeleteClick} />}
      <div className="card__info">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-block">
          <button className={cardLikeButtonClassName} aria-label="Like" type="button" onClick={handleLikeClick}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};