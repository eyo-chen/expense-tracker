import createConfigObj from "../CreateChartData/createConfigObj";
import createChartDataArr from "../CreateChartData/createChartDataArr";

function createSmallChartData(
  expenseData,
  duration,
  startingDate,
  endingDate,
  categoryExpense,
  displayTheme
) {
  const configBar = createConfigObj(
    ...createChartDataArr(
      "time",
      duration,
      startingDate,
      endingDate,
      expenseData,
      "expense",
      Object.keys(categoryExpense),
      ...new Array(3).fill(undefined), // skip three arguments
      displayTheme
    )
  );

  const configPie = createConfigObj(
    ...createChartDataArr(
      "category",
      duration,
      startingDate,
      endingDate,
      expenseData,
      "expense",
      Object.keys(categoryExpense),
      ...new Array(3).fill(undefined),
      displayTheme
    )
  );

  return [configBar, configPie];
}

export default createSmallChartData;
