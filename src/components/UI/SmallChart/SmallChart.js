import { useRef, useEffect, useState, useContext } from "react";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import Card from "../Card/Card";
import Select from "../Select/Select";
import Chart from "chart.js/auto";
import styles from "./SmallChart.module.css";

function SmallChart(props) {
  const { expenseData } = useContext(ExpenseDataContext);
  const [chartState, setChartState] = useState(0);
  const chartRef = useRef(null);
  const configArr = [props.configBar, props.configPie];

  function selectChangeHandler(e) {
    setChartState(e.target.value);
  }

  // Reference 1
  useEffect(() => {
    const chart = new Chart(chartRef.current, configArr[chartState]);

    return function cleanUp() {
      chart.destroy();
    };
  }, [
    chartState,
    expenseData.length,
    props.startingDateString,
    props.configBar,
    props.configPie,
  ]);

  // pie chart need more height
  const classNameChart =
    chartState === "1"
      ? `${styles["chart__container"]} ${styles["chart--pie"]} `
      : `${styles["chart__container"]} `;

  return (
    <Card className={styles["chart__section"]}>
      <div className={styles["title__section"]}>
        <label htmlFor="chart" className={styles.label}>
          Chart
        </label>
        <Select
          name="chart"
          id="chart"
          onChange={selectChangeHandler}
          className={styles.select}
        >
          <option value="0">bar chart</option>
          <option value="1">pie chart</option>
        </Select>
      </div>

      <div className={classNameChart}>
        <canvas
          tabIndex="0"
          aria-label="chart"
          ref={chartRef}
          height="200"
          width="auto"
        ></canvas>
      </div>
    </Card>
  );
}

export default SmallChart;
/*
Reference 1
we want to re-create the chart when
1. user choose different kind of chart (bar or pie)
2. user add or remove the (new) data
3. user click the next or last month arrow button in Calendar Section
=> we use props.startingDateString as index
=> because startingDateString change if month change
=> aka, user click next or last month arrow button
4. user edit the existing data
=> the config object will change if the data is edited
*/
