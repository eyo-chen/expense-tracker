import InputText from "../InputText/InputText";
import Warning from "../Warning/Warning";
import styles from "./AddStockForm.module.css";

function FormSymbol(props) {
  console.log("props.symbol.trim().length", props.symbol.trim().length)
  const invalid = props.symbolTouch && props.symbol.trim().length === 0;

  return (
    <div className={styles["form__field"]}>
      <InputText
        value={props.symbol}
        name="symbol"
        id="symbol"
        label="symbol"
        onChange={props.symbolChangeHandler}
        onBlur={props.inputSymbolTouchHandler}
        disabled={props.disabled}
        placeholder="Enter stock symbol"
        classInput={`${styles["form__input"]} input`}
        classLabel={`${styles["form__label"]} capitalize`}
      />
      <Warning index={invalid} className={styles.warning}>
        symbol is required
      </Warning>
    </div>
  );
}

export default FormSymbol; 