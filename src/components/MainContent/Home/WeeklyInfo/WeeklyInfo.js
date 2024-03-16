import { useContext, useMemo, useState, useEffect } from "react";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import CategoryContext from "../../../../store/category/category--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import createSmallChartData from "../../../../Others/CreateAccountCardData/createSmallChartData";
import styles from "./WeeklyInfo.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";

function WeeklyInfo(props) {
  const [accInfo, setAccInfo ] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
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

  async function fetchTransactionInfo(startDate, endDate){
    try {
      const data = await fetcher(`v1/transaction/info?start_date=${startDate}&end_date=${endDate}`, "GET");
      return data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchTransactionInfo(startingDateString, endingDateString)
    .then((data) => {
      setAccInfo({
        income: data.total_income,
        expense: data.total_expense,
        balance: data.total_balance
      })
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [startingDateString, endingDateString, props.changeData])

  if (configBar && configBar.data) configBar.data.labels = labels;

  return (
    <div className={styles.weekly}>
      <CardChartSection
        title="Weekly Overview"
        income={accInfo.income}
        expense={accInfo.expense}
        netIncome={accInfo.balance}
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
