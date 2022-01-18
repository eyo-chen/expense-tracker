import { useContext } from "react";
import AccountSection from "../../../UI/AccountSection/AccountSection";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import createSmallChartData from "../../../../Others/CreateAccountCardData/createSmallChartData";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import style from "./WeeklyInfo.module.css";

function WeeklyInfo() {
  const { expenseData, categoryExpense } = useContext(ExpenseDataContext);
  const { displayTheme } = useContext(DisplayThemeContext);

  const [
    startingDateObj,
    endingDateObj,
    startingDateString,
    endingDateString,
    labels,
  ] = createAccountCardPreData("week");

  const [configBar, configPie] = createSmallChartData(
    expenseData,
    "7",
    startingDateString,
    endingDateString,
    categoryExpense,
    displayTheme
  );

  const [accIncome, accExpense] = createAccAmount(
    expenseData,
    true,
    startingDateObj,
    endingDateObj
  );

  configBar.data.labels = labels;

  return (
    <div className={style.weekly}>
      <AccountSection
        title="Weekly Overview"
        income={accIncome}
        expense={accExpense}
        configBar={configBar}
        configPie={configPie}
      />
    </div>
  );
}

export default WeeklyInfo;

/*
  const accIncome = expenseData
    .filter((expenseData) => {
      const dataTime = Number(new Date(expenseData.time));
      const firstDayTime = Number(new Date(first.string));
      const lastDayTime = Number(new Date(last.string));

      return (
        dataTime <= lastDayTime &&
        dataTime >= firstDayTime &&
        expenseData.category === "income"
      );
    })
    .reduce((acc, cur) => acc + Number(cur.price), 0);

  const accExpense = expenseData
    .filter((expenseData) => {
      const dataTime = Number(new Date(expenseData.time));
      const firstDayTime = Number(new Date(first.string));
      const lastDayTime = Number(new Date(last.string));

      return (
        dataTime <= lastDayTime &&
        dataTime >= firstDayTime &&
        expenseData.category === "expense"
      );
    })
    .reduce((acc, cur) => acc + Number(cur.price), 0);
*/
