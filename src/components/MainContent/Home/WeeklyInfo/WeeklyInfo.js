import {  useState, useEffect, useContext } from "react";
import UpdateStateContext from "../../../../store/updateState/updateState--context";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import styles from "./WeeklyInfo.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";

function WeeklyInfo(props) {
  const { updateState } = useContext(UpdateStateContext);
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
  }, [startingDateString, endingDateString, updateState])

  return (
    <div className={styles.weekly}>
      <CardChartSection
        title="Weekly Overview"
        income={accInfo.income}
        expense={accInfo.expense}
        netIncome={accInfo.balance}
        startingDateString={startingDateString}
        endingDateString={endingDateString}
        barChartTimeRange="one_week_day"
      />
    </div>
  );
}

export default WeeklyInfo;