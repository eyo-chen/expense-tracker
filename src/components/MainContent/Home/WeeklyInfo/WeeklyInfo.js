import {  useState, useEffect, useContext, useMemo } from "react";
import UpdateStateContext from "../../../../store/updateState/updateState--context";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import styles from "./WeeklyInfo.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";
import createWeeklyData from "../../../../Others/CreateWeeklyData/createWeeklyData";
import createDateStringFormat from "../../../../Others/CreateDateStringFormat/CreateDateStringFormat";
const cache = {
  transactionInfo: new Map(),
};

function WeeklyInfo(props) {
  const { updateState } = useContext(UpdateStateContext);
  const [accInfo, setAccInfo ] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [startingDateString, endingDateString] = createStartAndEndDate(props.week);

  useEffect(() => {
    cache.transactionInfo.clear();
  }, [updateState]);

  // Add cachedFetchTransactionInfo
  const cachedFetchTransactionInfo = useMemo(() => {
    return async (startDate, endDate) => {
      const cacheKey = `${startDate}-${endDate}`;

      if (cache.transactionInfo.has(cacheKey)) {
        return cache.transactionInfo.get(cacheKey);
      }

      const data = await fetchTransactionInfo(startDate, endDate);
      cache.transactionInfo.set(cacheKey, data);
      return data;
    };
  }, [updateState]); // Recreate when updateState changes

  useEffect(() => {
    cachedFetchTransactionInfo(startingDateString, endingDateString)
    .then((data) => {
      setAccInfo({
        income: data.total_income,
        expense: data.total_expense,
        balance: data.total_balance
      })
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [startingDateString, endingDateString, cachedFetchTransactionInfo])

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

async function fetchTransactionInfo(startDate, endDate){
  try {
    const data = await fetcher(`v1/transaction/info?start_date=${startDate}&end_date=${endDate}`, "GET");
    return data
  } catch (error) {
    return error
  }
}

function createStartAndEndDate(week) {
  const weeklyDataArr = createWeeklyData(week);
  const startingDateOfWeek = weeklyDataArr[0];
  const endingDateOfWeek = weeklyDataArr[weeklyDataArr.length - 1];

  const startingDateOfWeekStr = createDateStringFormat(startingDateOfWeek.dateObj);
  const endingDateOfWeekStr = createDateStringFormat(endingDateOfWeek.dateObj);

  return [startingDateOfWeekStr, endingDateOfWeekStr]
}