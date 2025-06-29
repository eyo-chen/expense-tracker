import Button from "../Button/Button";
import styles from "./AddStockForm.module.css";

function FormStockBtn(props) {
  const isDisabled = !props.isValid || props.isTooLarge || !props.isCategValid;

  const classAddBtn = `${styles.btn} uppercase transition--25 ${
    isDisabled ? `btn--invalid` : `btn--valid`
  }`;

  return (
    <div className={styles["btn__container"]}>
      <Button
        type="button"
        className={`${styles.btn} uppercase transition--25 btn--valid`}
        onClick={props.addStockFormModalToggler}
      >
        cancel
      </Button>
      <Button
        type="submit"
        className={classAddBtn}
        disabled={isDisabled}
      >
        {props.btnText || "add"}
      </Button>
    </div>
  );
}

export default FormStockBtn; 