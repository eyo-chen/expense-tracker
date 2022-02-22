import React from "react";
import { useRef, useEffect, useContext } from "react";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import CategoryContext from "../../../../store/category/category--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import Chart from "chart.js/auto";
import createConfigObj from "../../../../Others/CreateChartData/createConfigObj";
import createChartDataArr from "../../../../Others/CreateChartData/createChartDataArr";
import styles from "./ChartPic.module.css";

function ChartPic(props) {
  const chartRef = useRef(null);
  const { expenseData } = useContext(ExpenseDataContext);
  const { categoryExpense, categoryIncome } = useContext(CategoryContext);
  const { displayTheme } = useContext(DisplayThemeContext);

  // note that createChartDataArr will return an array
  const config = createConfigObj(
    ...createChartDataArr(
      props.chartData.mainType,
      props.chartData.timeDuration,
      props.chartData.startingDate,
      props.chartData.endingDate,
      expenseData,
      props.chartData.mainCategory,
      props.chartData.subCategory,
      true, // show the label
      Object.keys(categoryExpense),
      Object.keys(categoryIncome),
      displayTheme
    )
  );

  useEffect(() => {
    const chart = new Chart(chartRef.current, config);

    return function cleanUp() {
      chart.destroy();
    };
  }, [props.chartData, config]);

  let chartClassName = styles["chart--bar"];
  if (props.chartData.mainType === "category")
    chartClassName = styles["chart--pie"];

  return (
    <div className={`${styles.chart} ${chartClassName}`}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

// Reference 1
export default React.memo(ChartPic);

/*
Reference 1
In the parent function (Chart)
The component will re-render when the size is changing
Avoid multiple and meaningless re-render, use React.memo()
*/
