import Button from "../Button/Button";
import style from "./BtnIcon.module.css";

function BtnIcon(props) {
  const classNameBtn = props.classBtn
    ? `${style.btn} ${props.classBtn}`
    : `${style.btn}`;

  const classNameText = props.classText
    ? `${style["btn__text"]} ${props.classText} capitalize transition--25`
    : `${style["btn__text"]} capitalize transition--25`;

  return (
    <Button type="button" className={classNameBtn}>
      <div
        onClick={props.onClick}
        data-id={props.dataID}
        className={style.cover}
      ></div>
      {props.children}
      <span className={classNameText}>{props.text}</span>
    </Button>
  );
}

export default BtnIcon;
