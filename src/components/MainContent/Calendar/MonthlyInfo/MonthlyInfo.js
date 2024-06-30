import { useContext, useState, useEffect } from "react";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import UpdateStateContext from "../../../../store/updateState/updateState--context";
import createAccountCardPreData from "../../../../Others/CreateAccountCardData/createAccountCardPreData";
import styles from "./MonthlyInfo.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";

function MonthlyInfo(props) {
  const [accInfo, setAccInfo ] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const { updateState } = useContext(UpdateStateContext);

  const [startingDateObj, endingDateObj, startingDateString, endingDateString] = createAccountCardPreData("month", props.month);

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
    <div className={styles.monthly}>
      <CardChartSection
        title="Monthly Overview"
        income={accInfo.income}
        expense={accInfo.expense}
        netIncome={accInfo.balance}
        startingDateString={startingDateString}
        endingDateString={endingDateString}
        barChartTimeRange="one_month"
      />
    </div>
  );
}

export default MonthlyInfo;


async function fetchTransactionInfo(startDate, endDate){
  try {
    const resp = await fetcher(`v1/transaction/info?start_date=${startDate}&end_date=${endDate}`, "GET");

    return resp
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}