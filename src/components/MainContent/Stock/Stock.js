import styles from "./Stock.module.css";
import StockCard from "./StockCard/StockCard";
import StockList from "./StockList/StockList";
import StockTitle from "./StockTitle/StockTitle";

function Stock() {
  return (
    <div className={styles.stock}>
      <StockTitle />
      <StockCard />
      <StockList />
    </div>
  );
}

export default Stock;
