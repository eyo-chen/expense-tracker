import Button from "../Button/Button";
import styles from "./BtnIcon.module.css";

function BtnIcon(props) {
  const classNameBtn = props.classBtn
    ? `${styles.btn} ${props.classBtn}`
    : `${styles.btn}`;

  const classNameText = props.classText
    ? `${styles["btn__text"]} ${props.classText} capitalize transition--25`
    : `${styles["btn__text"]} capitalize transition--25`;

  return (
    <Button tabIndex={props.tabIndex} type="button" className={classNameBtn}>
      <div
        tabIndex="0"
        onClick={props.onClick}
        data-id={props.dataID}
        className={styles.cover}
      ></div>
      {props.children}
      <span className={classNameText}>{props.text}</span>
    </Button>
  );
}

export default BtnIcon;
