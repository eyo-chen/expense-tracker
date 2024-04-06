import { useReducer, useEffect } from "react";
import Title from "../../../UI/Title/Title";
import Button from "../../../UI/Button/Button";
import Card from "../../../UI/Card/Card";
import ChartOptionChartType from "./ChartOptionChartType/ChartOptionChartType";
import ChartOptionType from "./ChartOptionType/ChartOptionType";
import ChartOptionMainCategory from "./ChartOptionMainCategory/ChartOptionMainCategory";
import ChartOptionTime from "./ChartOptionTime/ChartOptionTime";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import { RiCloseCircleFill } from "react-icons/ri";
import styles from "./ChartOption.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";

function ChartOption(props) {
  const initialObj = {
    chartType: "bar",
    startingDate: "",
    endingDate: "",
    timeDuration: "one_week",
    type: "",
    mainCategoryList: [],
    selectedMainCategoryIDs: [],
  };

  const [chartData, dispatchChartData] = useReducer(reducer, initialObj);

  useEffect(() => {
    if (chartData.type === "") return;

    fetchMainCategory(chartData.type).then((data) => {
      dispatchChartData({
        type: "MAIN_CATEGORY_LIST",
        value: data,
      });

      // set default selected main category
      const defaultSelectedMainCategoryIDs = data.map((category) => category.id);
      dispatchChartData({
        type: "DEFAULT_SELECTED_MAIN_CATEGORY_IDS",
        value: defaultSelectedMainCategoryIDs,
      });
    }).catch((err) => {
      console.log(err);
    });
  }, [chartData.type]);

  async function submitFormHandler(e) {
    e.preventDefault();
    try {
      const data = await fetchChartData(
        chartData.startingDate,
        chartData.endingDate,
        chartData.chartType,
        chartData.timeDuration,
        chartData.selectedMainCategoryIDs
      );

      const config = createChartConfig(data.labels, data.datasets, "dark", chartData.chartType);
      props.setChartConfig(config);
    } catch {
      console.log("error");
    } finally {
      // When chartOptionModal is opening, close it after submitting
      if (props.closeChartOptionModalHandler)
        props.closeChartOptionModalHandler();
    }
  }

  const isValid = checkIsValid(
    chartData.chartType,
    chartData.startingDate,
    chartData.endingDate,
    chartData.type,
    chartData.selectedMainCategoryIDs
  );

  // only show main category list when it's bar chart and type is either expense or income
  const isShowingMainCategoryList = chartData.chartType === "bar" && chartData.type !== "net";

  return (
    <Card className={styles.card}>
      <BtnIcon
        classText={styles["btn__text"]}
        classBtn={styles.close}
        onClick={props.closeChartOptionModalHandler}
        text="close"
      >
        <RiCloseCircleFill />
      </BtnIcon>

      <form onSubmit={submitFormHandler} className={styles.form}>
        <div>
          <Title className={styles["form__title"]}>Analyize By</Title>

          <ChartOptionChartType
            chartType={chartData.chartType}
            dispatchChartData={dispatchChartData}
            setChartType={props.setChartType}
          />

          <div className={styles.scroll}>
            <ChartOptionTime
              chartType={chartData.chartType}
              startingDate={chartData.startingDate}
              endingDate={chartData.endingDate}
              timeDuration={chartData.timeDuration}
              dispatchChartData={dispatchChartData}
            />
            <ChartOptionType
              chartType={chartData.chartType}
              type={chartData.type}
              dispatchChartData={dispatchChartData}
            />
            {isShowingMainCategoryList &&
              <ChartOptionMainCategory
                mainCategoryList={chartData.mainCategoryList}
                dispatchChartData={dispatchChartData}
              />
            }
          </div>
        </div>

        <Button
          disabled={!isValid}
          className={`${styles.btn} transition--25 ${
            !isValid ? `btn--invalid` : `btn--valid`
          }`}
        >
          Show Chart
        </Button>
      </form>
    </Card>
  );
}

export default ChartOption;

async function fetchMainCategory(type) {
  try {
    const data = await fetcher(`v1/main-category?type=${type}`, "GET");
    return data.categories;
  } catch (err) {
    throw err;
  }
}

async function fetchChartData(startDate, endDate, chartType, timeRange, selectedMainCategoryIDs) {
  let url = `v1/transaction/${chartType}-chart?start_date=${startDate}&end_date=${endDate}&type=expense`

  // only for bar chart
  if (timeRange) url += `&time_range=${timeRange}`

  if (selectedMainCategoryIDs.length > 0)
    url += `&main_category_ids=${selectedMainCategoryIDs}`

  try {
    const data = await fetcher(url, "GET");

    return data.chart_data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "CHART_TYPE": {
      return { ...state, chartType: action.value };
    }

    case "STARTING_DATE": {
      return { ...state, startingDate: action.value };
    }

    case "ENDING_DATE": {
      return { ...state, endingDate: action.value };
    }

    case "TIME_DURATION": {
      return { ...state, timeDuration: action.value };
    }

    case "TYPE": {
      return { ...state, type: action.value };
    }

    case "MAIN_CATEGORY_LIST": {
      return { ...state, mainCategoryList: action.value };
    }

    case "DEFAULT_SELECTED_MAIN_CATEGORY_IDS": {
      return { ...state, selectedMainCategoryIDs: action.value };
    }

    case "SELECTED_MAIN_CATEGORY_IDS": {
      let selectedMainCategoryIDs;

      if (action.checked) {
        selectedMainCategoryIDs = [...state.selectedMainCategoryIDs, action.value];
      } else {
        selectedMainCategoryIDs = state.selectedMainCategoryIDs.filter(
          (id) => id !== action.value
        );
      }

      return { ...state, selectedMainCategoryIDs: selectedMainCategoryIDs };
    }

    default:
      return state;
  }
}

function checkIsValid(mainType, startingDate, endingDate, type, selectedMainCategoryIDs) {
  // bar chart
  if (mainType === "bar") {
    return (
      mainType &&
      startingDate &&
      type &&
      // if type is net, selectedMainCategoryIDs is not required
      (type === "net" || selectedMainCategoryIDs.length > 0)
    );
  } 
  
  // pie chart
  return mainType && startingDate && endingDate && type;
}

// TODO: Refactor this function with src/components/UI/SmallChart/SmallChart.js
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
        legend,
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

const legend = {
  onClick: (e, legendItem, legend) => {
    const index = legend.chart.data.labels.indexOf(legendItem.text);
    legend.chart.toggleDataVisibility(index);
    legend.chart.update();
  },
  labels: {
    generateLabels: (chart) => {
      const colorLength = chart.data.datasets[0].borderColor.length;
      const visibility = [];
      for (let i = 0; i < chart.data.labels.length; i++) {
        if (chart.getDataVisibility(i)) visibility.push(false);
        else visibility.push(true);
      }
      return chart.data.labels.map((label, index) => {
        const newIndex = index % colorLength;
        return {
          text: label,
          strokeStyle: chart.data.datasets[0].borderColor[newIndex],
          fillStyle: chart.data.datasets[0].backgroundColor[newIndex],
          hidden: visibility[index],
        };
      });
    },
  },
};