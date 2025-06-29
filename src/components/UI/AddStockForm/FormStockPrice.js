import Warning from "../Warning/Warning";
import styles from "./AddStockForm.module.css";

function FormStockPrice(props) {
  const invalid = props.price <= 0 && props.priceTouch;

  return (
    <div className={styles["form__field"]}>
      <label htmlFor="price" className={`${styles["form__label"]} capitalize`}>
        price
      </label>
      <input
        id="price"
        type="number"
        value={props.price}
        onChange={props.priceChangeHandler}
        onBlur={props.inputPriceTouchHandler}
        disabled={props.disabled}
        placeholder="Enter price"
        min="0"
        step="0.01"
        className={`${styles["form__input"]} input`}
      />
      <Warning index={invalid} className={styles.warning}>
        price must be positive number
      </Warning>
    </div>
  );
}

export default FormStockPrice; 