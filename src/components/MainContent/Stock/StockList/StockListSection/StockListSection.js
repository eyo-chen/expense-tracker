import StockListItem from "../StockListItem/StockListItem";
import styles from "./StockListSection.module.css";

function StockListSection({ title, items }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.header}>
        <div className={styles["header__symbol"]}>Symbol</div>
        <div className={styles["header__details"]}>
          <div className={styles["header__price"]}>Price</div>
          <div className={styles["header__quantity"]}>Quantity</div>
          <div className={styles["header__avgCost"]}>Avg Cost</div>
          <div className={styles["header__percentage"]}>Percentage</div>
        </div>
      </div>
      <ul className={styles.list}>
        {items?.map((item, index) => (
          <StockListItem
            key={item.symbol}
            symbol={item.symbol}
            price={item.price}
            quantity={item.quantity}
            avgCost={item.avg_cost}
            percentage={item.percentage}
            isLast={index === items.length - 1}
          />
        ))}
      </ul>
    </div>
  );
}

export default StockListSection; 