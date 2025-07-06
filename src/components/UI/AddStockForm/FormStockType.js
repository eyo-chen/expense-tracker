import Select from "../Select/Select";
import styles from "./AddStockForm.module.css";

function FormStockType(props) {
  const stockTypeOptions = [
    { value: "STOCKS", label: "Stocks" },
    { value: "ETF", label: "ETF" },
  ];

  return (
    <div className={`${styles["form__field"]} ${styles["form__action_type"]}`}>
      <label htmlFor="stockType" className={styles["form__label"]}>
        Stock Type
      </label>
      <Select
        id="stockType"
        value={props.stockType}
        onChange={props.stockTypeChangeHandler}
        disabled={props.disabled}
        className={styles["form__select"]}
      >
        {stockTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default FormStockType; 