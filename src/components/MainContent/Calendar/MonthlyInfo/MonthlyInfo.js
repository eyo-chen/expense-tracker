import { useContext } from "react";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import CategoryContext from "../../../../store/category/category--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import createSmallChartData from "../../../../Others/CreateAccountCardData/createSmallChartData";
import style from "./MonthlyInfo.module.css";

function MonthlyInfo(props) {
  const { expenseData } = useContext(ExpenseDataContext);
  const { categoryExpense } = useContext(CategoryContext);
  const { displayTheme } = useContext(DisplayThemeContext);

  const [startingDateObj, endingDateObj, startingDateString, endingDateString] =
    createAccountCardPreData("month", props.month);

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
        startingDateString={startingDateString}
      />
    </div>
  );
}

export default MonthlyInfo;
