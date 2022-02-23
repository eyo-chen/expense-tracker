import Button from "../Button/Button";
import styles from "./AddDataForm.module.css";

function FormBtn(props) {
  const classAddBtn = `${styles.btn} uppercase transition--25 ${
    !props.isValid || props.isTooLarge ? `btn--invalid` : `btn--valid`
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
        disabled={!props.isValid || props.isTooLarge}
      >
        {props.oldExpenseData ? "edit" : "add"}
      </Button>
    </div>
  );
}

export default FormBtn;
