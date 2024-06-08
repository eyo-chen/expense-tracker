import Button from "../Button/Button";
import styles from "./AddDataForm.module.css";

function FormBtn(props) {
  const isDisabled = !props.isValid || props.isTooLarge || !props.isCategValid;

  const classAddBtn = `${styles.btn} uppercase transition--25 ${
    isDisabled ? `btn--invalid` : `btn--valid`
  }`;

  return (
    <div className={styles["btn__container"]}>
      <Button
        type="button"
        className={`${styles.btn} uppercase transition--25 btn--valid`}
        onClick={props.addDataFormModalToggler}
      >
        cancel
      </Button>
      <Button
        type="submit"
        className={classAddBtn}
        disabled={isDisabled}
      >
        {props.editDataInfo ? "edit" : "add"}
      </Button>
    </div>
  );
}

export default FormBtn;
