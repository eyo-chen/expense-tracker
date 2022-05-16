import { useContext, useMemo } from "react";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import CategoryContext from "../../../../store/category/category--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import createSmallChartData from "../../../../Others/CreateAccountCardData/createSmallChartData";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import styles from "./WeeklyInfo.module.css";

function WeeklyInfo(props) {
  const { expenseData } = useContext(ExpenseDataContext);
  const { categoryExpense } = useContext(CategoryContext);
  const { displayTheme } = useContext(DisplayThemeContext);

  const [
    startingDateObj,
    endingDateObj,
    startingDateString,
    endingDateString,
    labels,
  ] = createAccountCardPreData("week", props.week);

  // Reference 1
  const [configBar, configPie] = useMemo(
    () =>
      createSmallChartData(
        expenseData,
        "7",
        startingDateString,
        endingDateString,
        categoryExpense,
        displayTheme
      ),
    [expenseData, startingDateString]
  );

  const [accIncome, accExpense, accNetIncome] =
    expenseData.length === 0
      ? [0, 0, 0]
      : createAccAmount(expenseData, true, startingDateObj, endingDateObj);

  if (configBar && configBar.data) configBar.data.labels = labels;

  return (
    <div className={styles.weekly}>
      <CardChartSection
        title="Weekly Overview"
        income={accIncome}
        expense={accExpense}
        netIncome={accNetIncome}
        configBar={configBar}
        configPie={configPie}
        startingDateString={startingDateString}
      />
    </div>
  );
}

export default WeeklyInfo;

/*
Reference 1

use UseMemo to avoid re-render
For the purpose of UI
*/
