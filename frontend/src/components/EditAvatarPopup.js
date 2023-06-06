import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {

  const avatarRef = useRef();

    // При открытии попапа очищаем поля ввода
    useEffect(() => {
      avatarRef.current.value = '';
    }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm 
      name='avatar' 
      title='Обновить аватар' 
      buttonText='Сохранить' 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="avatar-url" className="popup__input popup__input_type_avatar" name="avatar" type="url"
        placeholder="Ссылка на аватар" required ref={avatarRef} />
      <span className="popup__error avatar-url-error"></span>
    </PopupWithForm>
  )
}