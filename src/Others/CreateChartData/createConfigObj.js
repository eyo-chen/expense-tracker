import createStandardLabelsArr from "./createStandardLabelsArr";
import createLabelsArr from "./createLabelsArr";
import createBarDataArr from "./createBarDataArr";
import createPieDataArr from "./createPieDataArr";
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
  showLabel = false,
  mainCategoryData = [],
  subCategoryData = []
) {
  if (mainType === "time") {
    const standardLabels = createStandardLabelsArr(timeDuration, startingDate);
    const labels = createLabelsArr(standardLabels, timeDuration);
    const data = createBarDataArr(
      standardLabels,
      createFilteredData(standardLabels, expenseData),
      timeDuration,
      mainCategory,
      subCategory,
      showLabel,
      mainCategoryData,
      subCategoryData
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
                theme === "dark" ? "rgb(190,190,190)" : "rgb(70,70,70)"
              }`,
            },
          },
          x: {
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
    const [labels, data] = createPieDataArr(
      startingDate,
      endingDate,
      expenseData,
      mainCategory
    );

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
