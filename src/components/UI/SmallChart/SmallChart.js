import { useRef, useEffect, useState, useContext } from "react";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import EditModalContext from "../../../store/editModal/editModal--context";
import Card from "../Card/Card";
import Title from "../Title/Title";
import Select from "../Select/Select";
import style from "./SmallChart.module.css";
import Chart from "chart.js/auto";

function SmallChart(props) {
  const { expenseData } = useContext(ExpenseDataContext);
  const [editModal] = useContext(EditModalContext);
  const [chartState, setChartState] = useState(0);
  const chartRef = useRef(null);
  const configArr = [props.configBar, props.configPie];

  function selectChangeHandler(e) {
    setChartState(e.target.value);
  }

  /*
  we want to re-create the chart when
  1. user choose different kind of chart (bar or pie)
  2. user add or remove the (new) data
  3. user edit the existing data
  */
  useEffect(() => {
    const chart = new Chart(chartRef.current, configArr[chartState]);

    return function cleanUp() {
      chart.destroy();
    };
  }, [chartState, expenseData, editModal]);

  return (
    <Card className={style["chart__section"]}>
      <div className={style["title__section"]}>
        <Title className={style.title}>Chart</Title>
        <Select onChange={selectChangeHandler} className={style.select}>
          <option value="0">bar chart</option>
          <option value="1">pie chart</option>
        </Select>
      </div>
      <div className={style["chart__container"]}>
        <canvas
          ref={chartRef}
          className={
            chartState === "1" ? `${style["chart--pie"]}` : `${style["chart"]}`
          }
          height="200"
          width="auto"
        ></canvas>
      </div>
    </Card>
  );
}

export default SmallChart;
