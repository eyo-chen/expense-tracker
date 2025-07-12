import styles from "./StockListItem.module.css";

function StockListItem({ symbol, price, quantity, avgCost, percentage, isLast }) {
  const formattedPrice = `$${price?.toFixed(2)}`;
  const formattedAvgCost = `$${avgCost?.toFixed(2)}`;
  const formattedPercentage = `${percentage?.toFixed(1)}%`;

  return (
    <>
      <li className={styles.item}>
        <div className={styles["item__info"]}>
          <div className={styles["item__symbol"]}>
            <p>{symbol}</p>
          </div>
          <div className={styles["item__details"]}>
            <p className={styles["item__price"]}>{formattedPrice}</p>
            <p className={styles["item__quantity"]}>{quantity}</p>
            <p className={styles["item__avgCost"]}>{formattedAvgCost}</p>
            <p className={styles["item__percentage"]}>{formattedPercentage}</p>
          </div>
        </div>
      </li>
      {!isLast && <hr className={styles["item__divider"]} />}
    </>
  );
}

export default StockListItem; 