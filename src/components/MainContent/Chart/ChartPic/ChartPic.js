import { useRef, useEffect, useContext } from "react";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import style from "./ChartPic.module.css";
import Chart from "chart.js/auto";
import createConfigObj from "../../../../Others/CreateChartData/createConfigObj";

function ChartPic(props) {
  const chartRef = useRef(null);
  const { expenseData } = useContext(ExpenseDataContext);
  const { displayTheme } = useContext(DisplayThemeContext);

  const config = createConfigObj(
    props.chartData.mainType,
    props.chartData.timeDuration,
    props.chartData.startingDate,
    props.chartData.endingDate,
    expenseData,
    props.chartData.mainCategory,
    props.chartData.subCategory,
    displayTheme
  );

  useEffect(() => {
    const chart = new Chart(chartRef.current, config);

    return function cleanUp() {
      chart.destroy();
    };
  }, [props.chartData, config]);

  let charClassName = "chart--bar";
  if (props.chartData.mainType === "category") charClassName = "chart--circle";

  return (
    <div className={style.chartMain}>
      <canvas className={style[charClassName]} ref={chartRef}></canvas>
    </div>
  );
}

export default ChartPic;

/*
 if (timeDuration === "6" || timeDuration === "12") {
    if (mainCategory === "income" && subCategory.length === 3) {
      const labelsLength = labels.length;
      let indexLabel = 0;
      let indexData = 0;
      let indexCurrentDate = true;
      let currentMonth;
      let currentAmount = 0;

      while (indexLabel < labelsLength) {
        // keep adding if it's still at current date(time)
        while (indexCurrentDate) {
          currentMonth = new Intl.DateTimeFormat("en-US", dateOptObj).format(
            new Date(filteredData[indexData]?.time)
          );
          // check date(time)
          if (currentMonth === labels1[indexLabel]) {
            // check main category
            if (filteredData[indexData].category === "income") {
              currentAmount += Number(filteredData[indexData].price);
            }

            indexData++;
          } else indexCurrentDate = false;
        }

        data.push(currentAmount);

        currentAmount = 0;
        indexCurrentDate = true;
        indexLabel++;
      }
    }

    if (mainCategory === "expense" && subCategory.length === 6) {
      const labelsLength = labels.length;
      let indexLabel = 0;
      let indexData = 0;
      let indexCurrentDate = true;
      let currentMonth;
      let currentAmount = 0;

      while (indexLabel < labelsLength) {
        // keep adding if it's still at current date(time)
        while (indexCurrentDate) {
          console.log(filteredData);
          if (!filteredData[indexData]?.time)
            currentMonth = new Intl.DateTimeFormat("en-US", dateOptObj).format(
              new Date(filteredData[indexData]?.time)
            );
          console.log(currentMonth);

          if (currentMonth === labels1[indexLabel]) {
            // check main category
            if (filteredData[indexData].category === "income") {
              currentAmount += Number(filteredData[indexData].price);
            }

            indexData++;
          } else indexCurrentDate = false;
        }

        data.push(currentAmount);

        currentAmount = 0;
        indexCurrentDate = true;
        indexLabel++;
      }
    }
  }
  // day base
  else {
    if (mainCategory === "income" && subCategory.length === 3) {
      const labelsLength = labels.length;
      let indexLabel = 0;
      let indexData = 0;
      let indexCurrentDate = true;
      let currentDate;
      let currentAmount = 0;

      while (indexLabel < labelsLength) {
        currentDate = `${year}-${labels[indexLabel].slice(0, 2)}-${labels[
          indexLabel
        ].slice(2)}`;

        // keep adding if it's still at current date(time)
        if (indexData < filteredData.length - 1) {
          while (indexCurrentDate) {
            // check date(time)
            if (filteredData[indexData].time === currentDate) {
              // check main category
              if (filteredData[indexData].category === "income") {
                currentAmount += Number(filteredData[indexData].price);
              }

              indexData++;
            } else indexCurrentDate = false;
          }
        }

        data.push(currentAmount);

        currentAmount = 0;
        indexCurrentDate = true;
        indexLabel++;
      }
    }

    if (mainCategory === "expense" && subCategory.length === 6) {
      const labelsLength = labels.length;
      let indexLabel = 0;
      let indexData = 0;
      let indexCurrentDate = true;
      let currentDate;
      let currentAmount = 0;

      while (indexLabel < labelsLength) {
        currentDate = `${year}-${labels[indexLabel].slice(0, 2)}-${labels[
          indexLabel
        ].slice(2)}`;

        // keep adding if it's still at current date(time)

        while (indexCurrentDate) {
          // check date(time)
          if (filteredData[indexData]?.time === currentDate) {
            // check main category
            if (filteredData[indexData].category === "expense") {
              currentAmount += Number(filteredData[indexData].price);
            }

            indexData++;
          } else indexCurrentDate = false;
        }

        data.push(currentAmount);

        currentAmount = 0;
        indexCurrentDate = true;
        indexLabel++;
      }
    }
  }
*/
/*
  // let configPPP;
  // if (props.chartData.mainType === "time") {
  //   let labels = [],
  //     data = [];

  //   const standardLabels = createStandardLabelsArr(
  //     props.chartData.timeDuration,
  //     props.chartData.startingDate
  //   );

  //   labels = createLabelsArr(standardLabels, props.chartData.timeDuration);

  //   data = createDataArr(
  //     standardLabels,
  //     createFilteredData(standardLabels, EXPENSE_DATA),
  //     props.chartData.timeDuration,
  //     props.chartData.mainCategory,
  //     props.chartData.subCategory
  //   );

  //   const dataObj = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "",
  //         data: data,
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(255, 159, 64, 0.2)",
  //           "rgba(255, 205, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(201, 203, 207, 0.2)",
  //         ],
  //         borderColor: [
  //           "rgb(255, 99, 132)",
  //           "rgb(255, 159, 64)",
  //           "rgb(255, 205, 86)",
  //           "rgb(75, 192, 192)",
  //           "rgb(54, 162, 235)",
  //           "rgb(153, 102, 255)",
  //           "rgb(201, 203, 207)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };

  //   const config = {
  //     type: "bar",
  //     data: dataObj,
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   };

  //   configPPP = config;
  // } else {
  //   const filteredData = EXPENSE_DATA.filter(
  //     (element) =>
  //       Number(new Date(element.time)) >=
  //         Number(new Date(props.chartData.startingDate)) &&
  //       Number(new Date(element.time)) <=
  //         Number(new Date(props.chartData.endingDate)) &&
  //       element.category === props.chartData.mainCategory
  //   );

  //   const labels = props.chartData.subCategory;
  //   let newFilteredData = [];
  //   labels.forEach((label) => {
  //     newFilteredData.push(
  //       filteredData.filter((data) => data.mainCate === label)
  //     );
  //   });

  //   let dataArr = [];
  //   newFilteredData.forEach((data) => {
  //     let dataTmp;

  //     if (data.length > 0) {
  //       dataTmp = data.reduce((acc, cur) => (acc += Number(cur.price)), 0);
  //     } else dataTmp = 0;

  //     dataArr.push(dataTmp);
  //   });

  //   const data1 = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "My First Dataset",
  //         data: dataArr,
  //         backgroundColor: [
  //           "rgb(255, 99, 132)",
  //           "rgb(255, 159, 64)",
  //           "rgb(255, 205, 86)",
  //           "rgb(75, 192, 192)",
  //           "rgb(54, 162, 235)",
  //           "rgb(153, 102, 255)",
  //           "rgb(201, 203, 207)",
  //         ],
  //         hoverOffset: 4,
  //       },
  //     ],
  //   };

  //   const config1 = {
  //     type: "doughnut",
  //     data: data1,
  //   };

  //   configPPP = config1;

  //   // console.log(da);

  //   // console.log(labels);
  // }

*/
