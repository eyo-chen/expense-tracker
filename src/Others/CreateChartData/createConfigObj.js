import createStandardLabelsArr from "./createStandardLabelsArr";
import createLabelsArr from "./createLabelsArr";
import createDataArr from "./createDataArr";
import createFilteredData from "./createFilteredData";

function createConfigObj(
  mainType,
  timeDuration,
  startingDate,
  endingDate,
  expenseData,
  mainCategory,
  subCategory,
  theme,
  showLabel
) {
  if (mainType === "time") {
    const standardLabels = createStandardLabelsArr(timeDuration, startingDate);
    const labels = createLabelsArr(standardLabels, timeDuration);
    const data = createDataArr(
      standardLabels,
      createFilteredData(standardLabels, expenseData),
      timeDuration,
      mainCategory,
      subCategory
    );

    let legend = null;

    /*
    Only show chart label above when 
    1. In the big chart section
    2. Chart is one week, six month or twelve month
    Too many labels is messy
    */
    if (
      showLabel &&
      (timeDuration === "7" || timeDuration === "6" || timeDuration === "12")
    ) {
      legend = {
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
    }

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
        plugins: {
          // title: {
          //   display: true,
          //   text: "Custom Chart Title",
          // },
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
            // title: {
            //   display: true,
            //   text: "Money",
            //   color: "white",
            //   padding: { top: 0, left: 0, right: 0, bottom: 20 },
            // },
            beginAtZero: true,
            ticks: {
              color: `${
                theme === "dark" ? "rgb(190,190,190)" : "rgb(70,70,70)"
              }`,
            },
          },
          x: {
            // title: {
            //   display: true,
            //   text: "Time",
            //   color: "white",
            //   padding: { top: 20, left: 0, right: 0, bottom: 0 },
            // },
            ticks: {
              color: `${
                theme === "dark" ? "rgb(190,190,190)" : "rgb(70,70,70)"
              }`,
            },
          },
        },
      },
    };
  } else {
    const filteredData = expenseData.filter(
      (element) =>
        Number(new Date(element.time)) >= Number(new Date(startingDate)) &&
        Number(new Date(element.time)) <= Number(new Date(endingDate)) &&
        element.category === mainCategory
    );

    // const labels = subCategory;
    let labels = [];
    filteredData.forEach((element) => {
      if (!labels.includes(element.mainCate)) labels.push(element.mainCate);
    });

    let newFilteredData = [];
    labels.forEach((label) => {
      newFilteredData.push(
        filteredData.filter((data) => data.mainCate === label)
      );
    });

    // const totalAmount = newFilteredData
    //   .flat()
    //   .reduce((acc, cur) => (acc += Number(cur.price)), 0);

    const dataArr = [];

    newFilteredData.forEach((data) => {
      let dataTmp;

      if (data.length > 0) {
        dataTmp = data.reduce((acc, cur) => (acc += Number(cur.price)), 0);
      } else dataTmp = 0;

      dataArr.push(dataTmp);
    });

    return {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "My First Dataset",
            data: dataArr,
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
        plugins: {
          // labels: {
          //   render: "percentage",
          // },
          legend: {
            labels: {
              // This is more specific font property overrides the global property
              font: {
                size: 14,
              },
              color: `${
                theme === "dark" ? "rgb(190,190,190)" : "rgb(70,70,70)"
              }`,
            },
          },
        },
      },
      plugins: [100],
    };
  }
}

export default createConfigObj;
