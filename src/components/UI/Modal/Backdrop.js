import style from "./Backdrop.module.css";

function Backdrop(props) {
  return (
    <div
      className={
        props.classBackdrop
          ? `${style.backdrop} ${props.classBackdrop}`
          : `${style.backdrop}`
      }
    >
      {props.children}
    </div>
  );
}

export default Backdrop;
