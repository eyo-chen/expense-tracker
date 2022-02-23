import styles from "./Backdrop.module.css";

function Backdrop(props) {
  const classNameBackdrop = props.classBackdrop
    ? `${styles.backdrop} ${props.classBackdrop}`
    : `${styles.backdrop}`;

  function backdropClickHandler(e) {
    if (e.target.dataset.id === "backdrop" && props.onClick) props.onClick();
  }

  return (
    <div
      data-id="backdrop"
      onClick={backdropClickHandler}
      className={classNameBackdrop}
    >
      {props.children}
    </div>
  );
}

export default Backdrop;
