import InputRadio from "../InputRadio/InputRadio";
import styles from "./AddStockForm.module.css";

function FormStockTitle(props) {
  const stockTitle = (
    <InputRadio
      classInput={styles["form__input"]}
      classCheck={`${styles.stock} ${styles.check}`}
      classLabel={`${styles.title} uppercase transition--25`}
      label="stock/ETF"
      name="actionType"
      value="BUY"
      id="stock"
      onChange={props.actionTypeChangeHandler}
      checked={props.actionType === "BUY" || props.actionType === "SELL"}
      disabled={props.disabled}
    />
  );

  const transferTitle = (
    <InputRadio
      classInput={styles["form__input"]}
      classCheck={`${styles.transfer} ${styles.check}`}
      classLabel={`${styles.title} uppercase transition--25`}
      label="transfer"
      name="actionType"
      value="TRANSFER"
      id="transfer"
      onChange={props.actionTypeChangeHandler}
      checked={props.actionType === "TRANSFER"}
      disabled={props.disabled}
    />
  );


  return (
    <div className={styles["title__container"]}>
      {stockTitle}
      {transferTitle}
    </div>
  );
}

export default FormStockTitle;
