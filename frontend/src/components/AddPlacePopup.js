import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

export default function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');
  

  // При открытии попапа очищаем поля ввода
  useEffect(() => {
    setPlaceLink('');
    setPlaceName('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы (Коментарий Практикума)
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик (Коментарий Практикума)
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  function handleNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handleLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm 
      name='add'
      title='Новое место'
      buttonText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="place-name" className="popup__input popup__input_type_top" name="name" type="text"
        placeholder="Название" required minLength="2" maxLength="30" value={placeName || ''} onChange={handleNameChange} />
      <span className="popup__error place-name-error"></span>
      <input id="url" className="popup__input popup__input_type_bottom" name="link" type="url"
        placeholder="Ссылка на страницу" required value={placeLink || ''} onChange={handleLinkChange} />
      <span className="popup__error url-error"></span>
    </PopupWithForm>
  )
}