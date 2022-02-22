import InputRadio from "../../../../UI/InputRadio/InputRadio";
import styles from "./SettingCategory.module.css";

function SettingType(props) {
  function typeChangeHandler(e) {
    props.categoryStateDispatch({ type: "TYPE", value: e.target.value });
  }

  return (
    <div className={styles.type}>
      <InputRadio
        classContainer={styles["radio__container"]}
        classInput={styles.input}
        classLabel={`${styles["label--blue"]} ${styles.label} uppercase transition--25`}
        classCheck={styles.check}
        id="expense"
        name="type"
        value="expense"
        label="expense"
        checked={props.type === "expense"}
        onChange={typeChangeHandler}
      />
      <InputRadio
        classContainer={styles["radio__container"]}
        classInput={styles.input}
        classLabel={`${styles["label--pink"]} ${styles.label} uppercase transition--25`}
        classCheck={styles.check}
        id="income"
        name="type"
        value="income"
        label="income"
        checked={props.type === "income"}
        onChange={typeChangeHandler}
      />
    </div>
  );
}

export default SettingType;
