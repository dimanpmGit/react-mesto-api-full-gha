
export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button link" aria-label="Close" type="button" onClick={props.onClose} ></button>
        <div className="popup__info-wrapper">
          <img className="popup__info-image" src={props.imgPath} alt={props.titleText} ></img>
          <h2 className="popup__info-title">{props.titleText}</h2>
        </div>
      </div>
    </div>
  );
}