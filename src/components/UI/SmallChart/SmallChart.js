import React from "react";
import { useRef, useEffect, useState, useContext, useMemo } from "react";
import UpdateStateContext from "../../../store/updateState/updateState--context";
import Card from "../Card/Card";
import Select from "../Select/Select";
import Chart from "chart.js/auto";
import styles from "./SmallChart.module.css";
import fetcher from "../../../Others/Fetcher/fetcher";

const cache = {
  chartData: new Map(),
};

function SmallChart(props) {
  const { updateState } = useContext(UpdateStateContext);
  const [chartState, setChartState] = useState("bar");
  const chartRef = useRef(null);

  // Clear cache when updateState changes
  useEffect(() => {
    cache.chartData.clear();
  }, [updateState]);


  function selectChangeHandler(e) {
    setChartState(e.target.value);
  }

  const cachedFetchChartData = useMemo(() => {
    return async (startDate, endDate, state, timeRange) => {
      const cacheKey = `${startDate}-${endDate}-${state}-${timeRange}`;
      if (cache.chartData.has(cacheKey)) {
        return cache.chartData.get(cacheKey);
      }

      const data = await fetchChartData(startDate, endDate, state, timeRange);
      cache.chartData.set(cacheKey, data);
      return data;
    };
  }, [updateState]); // Recreate when updateState changes

  useEffect(() => {
    let chart;

    cachedFetchChartData(props.startingDateString, props.endingDateString, chartState, props.barChartTimeRange)
      .then((data) => {
        const config = createChartConfig(data.labels, data.datasets, "dark", chartState);

        chart = new Chart(chartRef.current, config);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    return function cleanUp() {
      chart?.destroy();
    }
  }, [props.startingDateString, props.endingDateString, chartState, props.barChartTimeRange, cachedFetchChartData]);

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
          <option value="bar">bar chart</option>
          <option value="pie">pie chart</option>
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

export default React.memo(SmallChart);

async function fetchChartData(startDate, endDate, state, timeRange) {
  try {
    const data = await fetcher(
      `v1/transaction/${state}-chart?start_date=${startDate}&end_date=${endDate}&type=expense&time_range=${timeRange}`,
      "GET"
    );

    return data.chart_data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}


function createChartConfig(labels, data, displayTheme, type) {
  if (type === "pie") {
    return createPieChartConfig(labels, data, displayTheme);
  }

  return createBarChartConfig(labels, data, displayTheme);
}

function createPieChartConfig(labels, data, displayTheme) {
  return {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: data,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14,
            },
            color: `${
              displayTheme === "dark" ? "rgb(190,190,190)" : "rgb(70,70,70)"
            }`,
          },
        },
      },
    },
    plugins: [100],
  };
}

function createBarChartConfig(labels, data, displayTheme) {
  return {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          yAlign: "bottom",
          displayColors: false,
          backgroundColor: (tooltipItem) => {
            return tooltipItem.tooltip.labelColors[0].borderColor;
          },
        },
        // legend,
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: `${
              displayTheme === "dark" ? "rgb(190,190,190)" : "rgb(70,70,70)"
            }`,
          },
        },
        x: {
          ticks: {
            color: `${
              displayTheme === "dark" ? "rgb(190,190,190)" : "rgb(70,70,70)"
            }`,
          },
        },
      },
    },
  };
}