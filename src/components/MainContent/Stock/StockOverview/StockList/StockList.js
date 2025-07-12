import { useState, useEffect, useContext } from "react";
import StockListSection from "./StockListSection/StockListSection";
import styles from "./StockList.module.css";
import fetcher from "../../../../../Others/Fetcher/fetcher";
import UpdateStateContext from "../../../../../store/updateState/updateState--context";

function StockList() {
  const [stockList, setStockList] = useState({
    etf: [],
    stocks: [],
    cash: []
  });
  const { updateState } = useContext(UpdateStateContext);

  useEffect(() => {
    fetchStockPortfolio().then((data) => {
      setStockList({
        etf: data.etf,
        stocks: data.stocks,
        cash: data.cash
      });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [updateState]);

  return (
    <div className={styles.container}>
      <StockListSection title="ETF" items={stockList.etf} />
      <StockListSection title="Stock" items={stockList.stocks} />
      <StockListSection title="Cash" items={stockList.cash} />
    </div>
  );
}

export default StockList;

async function fetchStockPortfolio() {
  try {
    const resp = await fetcher(`v1/stock/info`, "GET");
    return resp
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

