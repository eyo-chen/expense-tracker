import style from "./Backdrop.module.css";

function Backdrop(props) {
  const classNameBackdrop = props.classBackdrop
    ? `${style.backdrop} ${props.classBackdrop}`
    : `${style.backdrop}`;

  return (
    <div onClick={props.onClick} className={classNameBackdrop}>
      {props.children}
    </div>
  );
}

export default Backdrop;
