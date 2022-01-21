import Button from "../Button/Button";
import style from "./BtnIcon.module.css";

function BtnIcon(props) {
  return (
    <Button
      type="button"
      className={
        props.classBtn ? `${style.btn} ${props.classBtn}` : `${style.btn}`
      }
    >
      <div
        onClick={props.onClick}
        data-id={props.dataID}
        className={style["btn__inner"]}
      ></div>
      {props.children}
      <span
        className={
          props.classText
            ? `${style["btn__text"]} ${props.classText} capitalize`
            : `${style["btn__text"]} capitalize`
        }
      >
        {props.text}
      </span>
    </Button>
  );
}

export default BtnIcon;
