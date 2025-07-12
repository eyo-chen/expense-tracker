import React from "react";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import styles from "./StockChartPic.module.css";

function StockChartPic(props) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, props.chartConfig);

    return function cleanUp() {
      chart.destroy();
    };
  }, [props.chartConfig]);

  return (
    <div className={styles.stockChart}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default React.memo(StockChartPic);