import Select from "../Select/Select";
import styles from "./AddStockForm.module.css";

function FormActionType(props) {
  const actionTypeOptions = [
    { value: "BUY", label: "Buy" },
    { value: "SELL", label: "Sell" },
  ];

  return (
    <div className={`${styles["form__field"]} ${styles["form__action_type"]}`}>
      <label htmlFor="actionType" className={styles["form__label"]}>
        Action Type
      </label>
      <Select
        id="actionType"
        value={props.actionType}
        onChange={props.actionTypeChangeHandler}
        disabled={props.disabled}
        className={styles["form__select"]}
      >
        {actionTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default FormActionType; 