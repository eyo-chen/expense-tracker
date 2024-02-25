import { useContext, useState, useEffect } from "react";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import CategoryContext from "../../../../store/category/category--context";
import DisplayThemeContext from "../../../../store/displayTheme/displayTheme--context";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import createSmallChartData from "../../../../Others/CreateAccountCardData/createSmallChartData";
import styles from "./MonthlyInfo.module.css";
import getToken from "../../../../Others/GetToken/getToken";
import axios from "axios";

function MonthlyInfo(props) {
  const [accInfo, setAccInfo ] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const { expenseData } = useContext(ExpenseDataContext);
  const { categoryExpense } = useContext(CategoryContext);
  const { displayTheme } = useContext(DisplayThemeContext);

  const [startingDateObj, endingDateObj, startingDateString, endingDateString] =
  createAccountCardPreData("month", props.month);


  async function fetchTransactionInfo(startDate, endDate){
    try {
      const resp = await axios.get(`http://localhost:4000/v1/transaction/info?start_date=${startDate}&end_date=${endDate}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": getToken()
        },
        withCredentials: false
      });

      return resp.data
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
  }, [startingDateString, endingDateString])



  const [configBar, configPie] = createSmallChartData(
    expenseData,
    "30",
    startingDateString,
    endingDateString,
    categoryExpense,
    displayTheme
  );

  return (
    <div className={styles.monthly}>
      <CardChartSection
        title="Monthly Overview"
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

export default MonthlyInfo;
