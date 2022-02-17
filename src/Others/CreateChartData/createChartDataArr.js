import createStandardLabelsArr from "./createStandardLabelsArr";
import createLineLabels from "./createLineLabels";
import createLabelsArr from "./createLabelsArr";
import createBarDataArr from "./createBarDataArr";
import createPieDataArr from "./createPieDataArr";
import createLineDataArr from "./createLineDataArr";
import createFilteredData from "./createFilteredData";

// Reference 1
function createChartDataArr(
  mainType,
  timeDuration,
  startingDate,
  endingDate,
  expenseData,
  mainCategory,
  subCategory,
  showLabel = false,
  mainCategoryData = [],
  subCategoryData = [],
  displayTheme
) {
  // both line-chart and bar-chart need this value
  const standardLabels = createStandardLabelsArr(timeDuration, startingDate);
  let labels, data;

  // line-chart
  if (mainType === "time" && mainCategory === "net") {
    labels = createLineLabels(
      new Date(standardLabels[0]),
      new Date(standardLabels[standardLabels.length - 1])
    );

    data = createLineDataArr(
      labels,
      createFilteredData(standardLabels, expenseData)
    );
  }
  // bar chart
  else if (mainType === "time") {
    labels = createLabelsArr(standardLabels, timeDuration);

    data = createBarDataArr(
      standardLabels,
      createFilteredData(standardLabels, expenseData),
      timeDuration,
      mainCategory,
      subCategory,
      showLabel,
      mainCategoryData,
      subCategoryData
    );
  }
  // pie chart
  else
    [labels, data] = createPieDataArr(
      createFilteredData(null, expenseData, startingDate, endingDate),
      mainCategory
    );

  return [
    labels,
    data,
    displayTheme,
    mainType,
    mainCategory,
    timeDuration,
    showLabel,
  ];
}

export default createChartDataArr;
/*
Reference 1
the main purpose of this function is to create 
different type of date based on different type of chart
We have three different type of charts
1. line
2. bar
3. pie

at first, it may seem that line and bar should have same labels and data
BUT, it's not
imagine when user choose 90 days, 
we know that there are a lot of labels
it's okay to have many labels when chart is bar
BUT, it's not good when chart is line
the chart is just not look good
we'll always fix the labels at 7 length for line-chart
So line-chart will have different labels and data
*/
