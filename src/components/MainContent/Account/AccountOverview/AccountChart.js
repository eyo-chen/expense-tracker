import { useRef, useEffect, useState, useContext } from "react";
import InputRadio from "../../../UI/InputRadio/InputRadio";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import createLabelsAccount from "../../../../Others/CreateAccountData/createLabelsAccount";
import createChartDataArr from "../../../../Others/CreateAccountData/CreateChartDataArr";
import style from "./AccountChart.module.css";
import Chart from "chart.js/auto";
import timeObj from "../../../assets/timeObj/timeObj";

// for choosing diff time range (input radio)
const timeRangeArr = ["1wk", "1mo", "3mo", "6mo", "1yr"];

const { TODAY } = timeObj;

// first day of the week
const initialDate = new Date(new Date().setDate(TODAY.getDate() - 7));

// an array of labels(string)
const initialLabels = createLabelsAccount(initialDate, TODAY);

function AccountChart() {
  const { expenseData } = useContext(ExpenseDataContext);
  const [chartData, setChartData] = useState({
    data: createChartDataArr(initialLabels, expenseData),
    labels: initialLabels,
  });
  const chartRef = useRef(null);

  const config = {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          fill: {
            target: "origin",
          },
          label: "",
          data: chartData.data,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgb(54, 162, 235)"],
          borderWidth: 1,
          pointBackgroundColor: ["rgb(54, 162, 235)"],
        },
      ],
    },
    options: {
      elements: {
        line: {
          tension: 0.5,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  useEffect(() => {
    const chart = new Chart(chartRef.current, config);

    return function cleanUp() {
      chart.destroy();
    };
  }, [chartData]);

  // helper function for changing time range
  function chartRadioChangeHandler(e) {
    const today = new Date();
    const value = e.target.value;
    if (value === "1wk") today.setDate(today.getDate() - 7);
    if (value === "1mo") today.setMonth(today.getMonth() - 1);
    if (value === "3mo") today.setMonth(today.getMonth() - 3);
    if (value === "6mo") today.setMonth(today.getMonth() - 6);
    if (value === "1yr") today.setFullYear(today.getFullYear() - 1);
    const labels = createLabelsAccount(today, TODAY);
    const chartData = createChartDataArr(labels, expenseData);
    setChartData({ data: chartData, labels });
  }

  return (
    <div className={style.container}>
      <div
        onChange={chartRadioChangeHandler}
        className={style["radio__container"]}
      >
        {timeRangeArr.map((element, index) => (
          <InputRadio
            key={element}
            label={element}
            id={element}
            value={element}
            name="chart__btn"
            defaultChecked={index === 0}
            classLabel={style.label}
            classInput={style.input}
            classCheck={style.check}
          />
        ))}
      </div>
      <div>
        <canvas className={style.chart} ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default AccountChart;
