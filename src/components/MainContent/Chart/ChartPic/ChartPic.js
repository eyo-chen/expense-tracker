import React from "react";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import styles from "./ChartPic.module.css";

function ChartPic(props) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, props.chartConfig);

    return function cleanUp() {
      chart.destroy();
    };
  }, [props.chartConfig]);

  let chartClassName = styles["chart--bar"];
  if (props.chartType === "category")
    chartClassName = styles["chart--pie"];

  return (
    <div className={`${styles.chart} ${chartClassName}`}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

// Reference 1
export default React.memo(ChartPic);