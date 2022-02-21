import { useRef, useEffect, useState, useContext } from "react";
import InputRadio from "../../../UI/InputRadio/InputRadio";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import createLineDataArr from "../../../../Others/CreateChartData/createLineDataArr";
import createLineLabels from "../../../../Others/CreateChartData/createLineLabels";
import style from "./AccountChart.module.css";
import Chart from "chart.js/auto";
import createConfigObj from "../../../../Others/CreateChartData/createConfigObj";
import timeObj from "../../../assets/timeObj/timeObj";

// for choosing diff time range (input radio)
const timeRangeArr = ["1wk", "1mo", "3mo", "6mo", "1yr"];

const { TODAY } = timeObj;

// seven days ago
const initialDate = new Date(new Date().setDate(TODAY.getDate() - 7));

// an array of labels(string)
const initialLabels = createLineLabels(initialDate, TODAY);

function AccountChart() {
  const { expenseData } = useContext(ExpenseDataContext);
  const { displayTheme } = useContext(DisplayThemeContext);
  const [chartData, setChartData] = useState([
    initialLabels,
    createLineDataArr(initialLabels, expenseData),
  ]);
  const chartRef = useRef(null);

  const config = createConfigObj(...chartData, displayTheme, "account");

  useEffect(() => {
    const chart = new Chart(chartRef.current, config);

    return function cleanUp() {
      chart.destroy();
    };
  }, [config]);

  // helper function for changing time range
  function chartRadioChangeHandler(e) {
    const today = new Date();
    const value = e.target.value;
    if (value === "1wk") today.setDate(today.getDate() - 7);
    if (value === "1mo") today.setMonth(today.getMonth() - 1);
    if (value === "3mo") today.setMonth(today.getMonth() - 3);
    if (value === "6mo") today.setMonth(today.getMonth() - 6);
    if (value === "1yr") today.setFullYear(today.getFullYear() - 1);
    const labels = createLineLabels(today, TODAY);
    const data = createLineDataArr(labels, expenseData);
    setChartData([labels, data]);
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
            classLabel={`${style.label} transition--25`}
            classInput={style.input}
            classCheck={style.check}
          />
        ))}
      </div>
      <div className={style["chart__container"]}>
        <canvas className={style.chart} ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default AccountChart;
/*
Reference 1
const [chartData, setChartData] = useState([
    initialLabels,
    createLineDataArr(initialLabels, expenseData),
  ]);
the reason I choose to use array, instead of object
is because this
const config = createConfigObj(...chartData, null, "account");
I can use ... to spread out the element, and pass in as argument
(null -> skip displayTheme)

Note
Initially, i put line-config-object inside the this component
but we later decide use line chart for net income
So now it's not reasonable to have two exact same line-config-object in two diff components
that's the one of main reason to seperate createChartDataArr and createConfigArr

*/
