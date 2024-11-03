import { useEffect, useState, useContext, useMemo } from "react";
import UpdateStateContext from "../../../../store/updateState/updateState--context";
import timeObj from "../../../../Others/TimeObj/timeObj";
import createYearMonthDay from "../../../../Others/CreateYearMonthDay/createYearMonthDay";
import coerceNumber from "../../../../Others/CoerceNumber/coerceNumber";
import CalendarCell from "./CalendarCell";
import fetcher from "../../../../Others/Fetcher/fetcher";
import formatDate from "../../../../Others/FormatDate/formatDate";
import Loading from "../../../UI/Loading/Loading";  
import styles from "./CalendarTable.module.css";

const { YEAR: year, MONTH: month, DAY: today } = timeObj;
const [YEAR, MONTH, TODAY] = coerceNumber(year, month, today);

const cache = {
  monthlyData: new Map(),
};

function CreateCalendarTable(date, showExpenseListModalHandler) {
  const { updateState } = useContext(UpdateStateContext);
  const [dataYear, dataMonth] = createYearMonthDay(date);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  let key = String(dataYear);
  if (dataMonth >= 10) key += `-${String(dataMonth)}`;
  else key += `-0${String(dataMonth)}`;

  // Clear cache when updateState changes
  useEffect(() => {
    cache.monthlyData.clear();
  }, [updateState]);

  const [
    lastOfCurMonthDate,
    lastOfPrevMonthDate,
    firstOfCurMonthDay,
    daysOfNextMonth,
    firstDayOfCurMonth,
    lastDayOfCurMonth,
  ] = createCalendarPreData(date);


  // Create a memoized cachedFetchMonthlyData function
  const cachedFetchMonthlyData = useMemo(() => {
    return async (startDate, endDate, year, month) => {
      const cacheKey = `${year}-${month}`;
      if (cache.monthlyData.has(cacheKey)) {
        return cache.monthlyData.get(cacheKey);
      }
      const data = await fetchMonthlyData(startDate, endDate);
      cache.monthlyData.set(cacheKey, data);
      return data;
    };
  }, [updateState]); // Recreate when updateState changes

  useEffect(() => {
    setLoading(true);

    cachedFetchMonthlyData(firstDayOfCurMonth, lastDayOfCurMonth, date.getFullYear(), date.getMonth() + 1)
      .then((res) => {
        setMonthlyData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [firstDayOfCurMonth, lastDayOfCurMonth, date, cachedFetchMonthlyData]);

  if (loading) {
    return <Loading className={styles["loading"]} />;
  }

  const res = [];

  // day of previous month
  for (let i = firstOfCurMonthDay; i > 0; i--) {
    res.push(
      <CalendarCell key={key + i + "pre"} curMonthIndex={false}>
        {lastOfPrevMonthDate - i + 1}
      </CalendarCell>
    );
  }

  // put this outside, so that don't need to keep calling the same method along with the iteration
  const curretYearMonth =
    date.getFullYear() === YEAR && date.getMonth() + 1 === MONTH;
  // day of current month
  for (let i = 1; i <= lastOfCurMonthDate; i++) {
    const todayIndex = curretYearMonth && i === TODAY;
    const indexID = i >= 10 ? i + "" : "0" + i;

    res.push(
      <CalendarCell
        key={key + "-" + indexID}
        dataID={key + "-" + indexID}
        curMonthIndex={true}
        onClick={showExpenseListModalHandler}
        todayIndex={todayIndex}
        expenseIndex={monthlyData[i - 1] === "expense"}
        incomeIndex={monthlyData[i - 1] === "income"}
        bothIndex={monthlyData[i - 1] === "both"}
      >
        {i}
      </CalendarCell>
    );
  }

  // day of next month
  for (let i = 1; i <= daysOfNextMonth; i++) {
    res.push(
      <CalendarCell key={key + i + "next"} curMonthIndex={false}>
        {i}
      </CalendarCell>
    );
  }

  return res;
}

export default CreateCalendarTable;

function createCalendarPreData(date) {
  const lastDayOfCurMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  const firstDayOfCurMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const lastOfCurMonthDate = lastDayOfCurMonth.getDate();
  const lastOfCurMonthDay = lastDayOfCurMonth.getDay();
  const lastOfPrevMonthDate = lastDayOfPrevMonth.getDate();
  const firstOfCurMonthDay = firstDayOfCurMonth.getDay();
  const daysOfNextMonth = 7 - lastOfCurMonthDay - 1;

  return [
    lastOfCurMonthDate,
    lastOfPrevMonthDate,
    firstOfCurMonthDay,
    daysOfNextMonth,
    formatDate(firstDayOfCurMonth),
    formatDate(lastDayOfCurMonth),
  ];
}

async function fetchMonthlyData(startDate, endDate) {
  try {
    const res = await fetcher(
      `v1/transaction/monthly-data?start_date=${startDate}&end_date=${endDate}`,
      "GET",
    );

    return res.monthly_data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}