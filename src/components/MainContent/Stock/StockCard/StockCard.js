import { useState, useEffect, useContext } from "react";
import StockSmallCard from "./StockSmallCard";
import formatMoney from "../../../../Others/FormatMoney/formatMoney";
import styles from "./StockCard.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";
import UpdateStateContext from "../../../../store/updateState/updateState--context";

function StockCard() {
  const [portfolioInfo, setPortfolioInfo] = useState({
    totalPortfolioValue: 0,
    totalGain: 0,
    roi: 0,
  });
  const [loading, setLoading] = useState(false);
  const { updateState } = useContext(UpdateStateContext);

  useEffect(() => {
    setLoading(true);

    fetchStockPortfolio()
    .then((data) => {
      setPortfolioInfo({
        totalPortfolioValue: data.total_portfolio_value,
        totalGain: data.total_gain,
        roi: data.roi
      });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    }).finally(() => setLoading(false));
  }, [updateState]);

  return (
    <div className={styles["card__container"]}>
      <StockSmallCard title="Total Portfolio Value" price={formatMoney(portfolioInfo.totalPortfolioValue)} loading={loading}/>
      <StockSmallCard title="Total Gain" price={formatMoney(portfolioInfo.totalGain)} loading={loading}/>
      <StockSmallCard title="Return On Investment" price={formatMoney(portfolioInfo.roi)} isPercent={true} loading={loading}/>  
    </div>
  );
}

export default StockCard;

async function fetchStockPortfolio(){
  try {
    const resp = await fetcher(`v1/stock/portfolio`, "GET");
    return resp
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

