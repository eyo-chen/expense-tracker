import { useRef, useEffect, useState, useContext } from "react";
import InputRadio from "../../../UI/InputRadio/InputRadio";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import Chart from "chart.js/auto";
import timeObj from "../../../../Others/TimeObj/timeObj";
import styles from "./AccountChart.module.css";
import formatDate from "../../../../Others/FormatDate/formatDate";
import fetcher from "../../../../Others/Fetcher/fetcher";
import Loading from "../../../UI/Loading/Loading";

const { TODAY } = timeObj;
const formattedEndDate = formatDate(TODAY);

function AccountChart() {
  const { displayTheme } = useContext(DisplayThemeContext);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState({
    start: formatDate(new Date(new Date().setDate(TODAY.getDate() - 7))),
    end: formattedEndDate,
    timeRange: "one_week",
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const chartRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    fetchChartData(date.start, date.end, date.timeRange)
      .then((data) => {
        setChartData({
          labels: data.labels,
          datasets: data.datasets,
        });
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [date]);

  useEffect(() => {
    if (loading) return;

    const config = createLineChartConfig(chartData.labels, chartData.datasets, displayTheme);
    const chart = new Chart(chartRef.current, config);

    return function cleanUp() {
      chart.destroy();
    };
  }, [chartData, displayTheme, loading]);

  // helper function for changing time range
  function chartRadioChangeHandler(e) {
    const today = new Date();
    const value = e.target.value;
    if (value === "one_week") today.setDate(new Date().getDate() - 7);
    if (value === "two_weeks") today.setDate(new Date().getDate() - 14);
    if (value === "one_month") today.setMonth(new Date().getMonth() - 1);
    if (value === "three_months") today.setMonth(new Date().getMonth() - 3);
    if (value === "six_months") today.setMonth(new Date().getMonth() - 6);
    if (value === "one_year") today.setFullYear(new Date().getFullYear() - 1);

    setDate({ start: formatDate(today), end: formattedEndDate, timeRange: e.target.id });
  }

  let mainContent = <Loading className={styles.loading} />;
  if (!loading) {
    mainContent = <canvas className={styles.chart} ref={chartRef}></canvas>;
  }

  return (
    <div className={styles.container}>
      <div
        onChange={chartRadioChangeHandler}
        className={styles["radio__container"]}
      >
        {timeRangeArr.map(({label, value}, index) => (
          <InputRadio
            key={value}
            label={label}
            id={value}
            value={value}
            name="chart__btn"
            defaultChecked={index === 0}
            classLabel={`${styles.label} transition--25`}
            classInput={styles.input}
            classCheck={styles.check}
          />
        ))}
      </div>
      <div className={styles["chart__container"]}>{mainContent}</div>
    </div>
  );
}

export default AccountChart;


async function fetchChartData(startDate, endDate, timeRange) {
  try {
    const data = await fetcher(`v1/transaction/line-chart?start_date=${startDate}&end_date=${endDate}&time_range=${timeRange}`, "GET");

    return data.chart_data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// for choosing diff time range (input radio)
const timeRangeArr = [
  {
    label: "1wk",
    value: "one_week",
  },
  {
    label: "2wk",
    value: "two_weeks",
  },
  {
    label: "1mo",
    value: "one_month",
  },
  {
    label: "3mo",
    value: "three_months",
  },
  {
    label: "6mo",
    value: "six_months",
  },
  {
    label: "1yr",
    value: "one_year",
  },
];

function createLineChartConfig(labels, data, displayTheme){
  return {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          fill: {
            target: "origin",
          },
          label: "",
          data: data,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgb(54, 162, 235)"],
          borderWidth: 1,
          pointBackgroundColor: ["rgb(54, 162, 235)"],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.5,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: `${
              displayTheme === "dark" ? "rgb(210,210,210)" : "rgb(70,70,70)"
            }`,
          },
        },
        x: {
          ticks: {
            color: `${
              displayTheme === "dark" ? "rgb(210,210,210)" : "rgb(70,70,70)"
            }`,
          },
        },
      },
    },
  };
}