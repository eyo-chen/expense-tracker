import InputRadio from "../InputRadio/InputRadio";
import styles from "./AddDataForm.module.css";

function FormTitle(props) {
  return (
    <div className={styles["title__container"]}>
      <InputRadio
        classInput={styles.input}
        classCheck={`${styles.expense} ${styles.check}`}
        classLabel={`${styles.title} uppercase transition--25`}
        label="expense"
        name="title"
        value="expense"
        id="expense"
        onChange={props.categoryChangeHandler}
        checked={props.type === "expense"}
      />
      <InputRadio
        classInput={styles.input}
        classCheck={`${styles.income} ${styles.check}`}
        classLabel={`${styles.title} uppercase transition--25`}
        label="income"
        name="title"
        value="income"
        id="income"
        onChange={props.categoryChangeHandler}
        checked={props.type === "income"}
      />
    </div>
  );
}

export default FormTitle;
