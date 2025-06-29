import InputRadio from "../InputRadio/InputRadio";
import styles from "./AddStockForm.module.css";

function FormStockTitle(props) {
  const stockTitle = (
    <InputRadio
      classInput={styles["form__input"]}
      classCheck={`${styles.stock} ${styles.check}`}
      classLabel={`${styles.title} uppercase transition--25`}
      label="stock/ETF"
      name="stockType"
      value="STOCKS"
      id="stock"
      onChange={props.stockTypeChangeHandler}
      checked={props.stockType === "STOCKS" || props.stockType === "ETF"}
      disabled={props.disabled}
    />
  );

  const transferTitle = (
    <InputRadio
      classInput={styles["form__input"]}
      classCheck={`${styles.transfer} ${styles.check}`}
      classLabel={`${styles.title} uppercase transition--25`}
      label="transfer"
      name="stockType"
      value="TRANSFER"
      id="transfer"
      onChange={props.stockTypeChangeHandler}
      checked={props.stockType === "TRANSFER"}
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
