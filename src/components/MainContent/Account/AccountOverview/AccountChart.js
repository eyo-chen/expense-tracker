import { useRef, useEffect, useState, useContext } from "react";
import InputRadio from "../../../UI/InputRadio/InputRadio";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import createLineDataArr from "../../../../Others/CreateChartData/createLineDataArr";
import createLineLabels from "../../../../Others/CreateChartData/createLineLabels";
import Chart from "chart.js/auto";
import createConfigObj from "../../../../Others/CreateChartData/createConfigObj";
import timeObj from "../../../assets/timeObj/timeObj";
import styles from "./AccountChart.module.css";

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
    <div className={styles.container}>
      <div
        onChange={chartRadioChangeHandler}
        className={styles["radio__container"]}
      >
        {timeRangeArr.map((element, index) => (
          <InputRadio
            key={element}
            label={element}
            id={element}
            value={element}
            name="chart__btn"
            defaultChecked={index === 0}
            classLabel={`${styles.label} transition--25`}
            classInput={styles.input}
            classCheck={styles.check}
          />
        ))}
      </div>
      <div className={styles["chart__container"]}>
        <canvas className={styles.chart} ref={chartRef}></canvas>
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
const config = createConfigObj(...chartData, displayTheme, "account");
I can use ... to spread out the element, and pass in as argument

Note
Initially, i put line-config-object inside the this component
but we later decide use line chart for net income
So now it's not reasonable to have two exact same line-config-object in two diff components
that's the one of main reason to seperate createChartDataArr and createConfigArr
*/

/*
Reference 2
createLineDataArr.bind(initialLabels, expenseData)
vs.
createLineDataArr(initialLabels, expenseData)

pass a function as initial value is better than passing the result of a function
This make sure createLineDataArr will only run once in initial render

Try to use createLineDataArr(initialLabels, expenseData),
and the function will run twice each time user click the button
which is very unefficient

See detail in https://beta.reactjs.org/apis/usestate
*/
