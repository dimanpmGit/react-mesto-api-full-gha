export default function PopupWithForm({name, title, buttonText, isOpen, onClose, onSubmit, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button link" aria-label="Close" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`popup-form-${name}`} onSubmit={onSubmit} >
          {children}
          <button className="popup__save-button" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
};