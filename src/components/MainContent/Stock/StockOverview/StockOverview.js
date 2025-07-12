import StockCard from "./StockCard/StockCard";
import StockList from "./StockList/StockList";
import styles from "./StockOverview.module.css";

function StockOverview() {
  return (
    <div className={styles.stockOverview}>
      <StockCard />
      <StockList />
    </div>
  );
}

export default StockOverview;