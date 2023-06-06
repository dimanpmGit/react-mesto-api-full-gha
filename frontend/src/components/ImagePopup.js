export default function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_card popup_bg-color_image ${card.isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container popup__container-image">
        <button className="popup__close-button link" aria-label="Close" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <p className="popup__image-name">{card.name}</p>
      </div>
    </div>
  );
};