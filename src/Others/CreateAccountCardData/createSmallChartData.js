import createWeeklyData from "../createWeeklyData";
import createDateStringFormat from "../CreateDateStringFormat/CreateDateStringFormat";
import createConfigObj from "../CreateChartData/createConfigObj";

function createSmallChartData(
  expenseData,
  duration,
  startingDate,
  endingDate,
  categoryExpense,
  displayTheme
) {
  const configBar = createConfigObj(
    "time",
    duration,
    startingDate,
    endingDate,
    expenseData,
    "expense",
    Object.keys(categoryExpense),
    displayTheme
  );

  const configPie = createConfigObj(
    "",
    duration,
    startingDate,
    endingDate,
    expenseData,
    "expense",
    Object.keys(categoryExpense),
    displayTheme
  );

  return [configBar, configPie];
}

export default createSmallChartData;
