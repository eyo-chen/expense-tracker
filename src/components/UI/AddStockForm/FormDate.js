import InputDate from "../InputDate/InputDate";
import styles from "./AddStockForm.module.css";

function FormDate(props) {
  return (
    <div className={`${styles["form__field"]} ${styles["form__date"]}`}>
      <InputDate
        name="date"
        id="date"
        label="date"
        value={props.date}
        onChange={props.dateChangeHandler}
        classInput={styles["form__input"]}
        classLabel={`${styles["form__label"]} capitalize`}
        disabled={props.disabled}
      />
    </div>
  );
}

export default FormDate;
