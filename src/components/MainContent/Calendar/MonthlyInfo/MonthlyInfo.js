import { useContext } from "react";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import createSmallChartData from "../../../../Others/CreateAccountCardData/createSmallChartData";
import style from "./MonthlyInfo.module.css";

function CalendarInfo(props) {
  const { expenseData, categoryExpense } = useContext(ExpenseDataContext);
  const { displayTheme } = useContext(DisplayThemeContext);

  const [startingDateObj, endingDateObj, startingDateString, endingDateString] =
    createAccountCardPreData("month");

  const [configBar, configPie] = createSmallChartData(
    expenseData,
    "30",
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

  return (
    <div className={style.monthly}>
      <CardChartSection
        title="Monthly Overview"
        income={accIncome}
        expense={accExpense}
        configBar={configBar}
        configPie={configPie}
      />
    </div>
  );
}

export default CalendarInfo;

/*
  const accIncome = expenseData
    .filter((expenseData) => {
      const timeNumber = Number(new Date(expenseData.time));

      return (
        timeNumber >= Number(firstDayStringFormat) &&
        timeNumber <= Number(lastDayStringFormat) &&
        expenseData.category === "income"
      );
    })
    .reduce((acc, cur) => acc + Number(cur.price), 0);

  const accExpense = expenseData
    .filter((expenseData) => {
      const timeNumber = Number(new Date(expenseData.time));

      return (
        timeNumber >= Number(firstDayStringFormat) &&
        timeNumber <= Number(lastDayStringFormat) &&
        expenseData.category === "expense"
      );
    })
    .reduce((acc, cur) => acc + Number(cur.price), 0);
*/
