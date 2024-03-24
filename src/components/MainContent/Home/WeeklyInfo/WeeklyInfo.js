import {  useState, useEffect } from "react";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import styles from "./WeeklyInfo.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";

function WeeklyInfo(props) {
  const [accInfo, setAccInfo ] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [
    startingDateObj,
    endingDateObj,
    startingDateString,
    endingDateString,
    labels,
  ] = createAccountCardPreData("week", props.week);

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

  return (
    <div className={styles.weekly}>
      <CardChartSection
        title="Weekly Overview"
        income={accInfo.income}
        expense={accInfo.expense}
        netIncome={accInfo.balance}
        startingDateString={startingDateString}
        endingDateString={endingDateString}
        changeData={props.changeData}
      />
    </div>
  );
}

export default WeeklyInfo;