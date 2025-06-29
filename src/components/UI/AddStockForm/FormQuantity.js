import Warning from "../Warning/Warning";
import styles from "./AddStockForm.module.css";

function FormQuantity(props) {
  const invalid = props.quantity <= 0 && props.quantityTouch;

  return (
    <div className={styles["form__field"]}>
      <label htmlFor="quantity" className={`${styles["form__label"]} capitalize`}>
        quantity
      </label>
      <input
        id="quantity"
        type="number"
        value={props.quantity}
        onChange={props.quantityChangeHandler}
        onBlur={props.inputQuantityTouchHandler}
        disabled={props.disabled}
        placeholder="Enter quantity"
        min="0"
        step="1"
        className={`${styles["form__input"]} input`}
      />
      <Warning index={invalid} className={styles.warning}>
        quantity must be positive number
      </Warning>
    </div>
  );
}

export default FormQuantity; 