import { useContext, useState, useEffect, useMemo } from "react";
import CardChartSection from "../../../UI/CardChartSection/CardChartSection";
import UpdateStateContext from "../../../../store/updateState/updateState--context";
import styles from "./MonthlyInfo.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";
import createYearMonthDay from "../../../../Others/CreateYearMonthDay/createYearMonthDay";
import createDateStringFormat from "../../../../Others/CreateDateStringFormat/CreateDateStringFormat";

const cache = {
  transactionInfo: new Map(),
};

function MonthlyInfo(props) {
  const [accInfo, setAccInfo ] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const { updateState } = useContext(UpdateStateContext);
  const [startingDateString, endingDateString] = createStartAndEndDate(props.month);

  // Clear cache when updateState changes
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
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [startingDateString, endingDateString, cachedFetchTransactionInfo]);

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

function createStartAndEndDate(date) {
  const [year, month] = createYearMonthDay(date);
  const startingDateOfMonth = new Date(year, month - 1, 1);
  const endingDateOfMonth = new Date(year, month, 0);

  const startingDateOfMonthStr = createDateStringFormat(startingDateOfMonth);
  const endingDateOfMonthStr = createDateStringFormat(endingDateOfMonth);

  return [startingDateOfMonthStr, endingDateOfMonthStr]
}