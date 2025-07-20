import { useState } from "react";
import ChartTypeSelector from "./ChartTypeSelector/ChartTypeSelector";
import ChartFilters from "./ChartFilters/ChartFilters";
import StockChart from "./StockChart/StockChart";
import styles from "./Charts.module.css";

function Charts() {
  const [activeChartType, setActiveChartType] = useState("portfolio");
  const [timePeriod, setTimePeriod] = useState("6M");

  return (
    <div className={styles.charts}>
      <ChartTypeSelector
        activeChartType={activeChartType}
        setActiveChartType={setActiveChartType}
      />

      <ChartFilters
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />

      <StockChart
        activeChartType={activeChartType}
        timePeriod={timePeriod}
      />
    </div>
  );
}

export default Charts;