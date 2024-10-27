import { useEffect, useState, useContext, useMemo } from "react";
import UpdateStateContext from "../../../../store/updateState/updateState--context";
import AddDataForm from "../../../UI/AddDataForm/AddDateForm";
import DataCardModal from "../../../UI/DataCardModal/DataCardModal";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import WeeklyCalendarList from "./WeeklyCalendarList";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import Title from "../../../UI/Title/Title";
import SmallChartModal from "../../../UI/SmallChartModal/SmallChartModal";
import DailyDataCard from "./DailyDataCard";
import timeObj from "../../../../Others/TimeObj/timeObj";
import createYearMonthDay from "../../../../Others/CreateYearMonthDay/createYearMonthDay";
import useAddDataForm from "../../../../Others/Custom/useAddDataForm";
import { TiPlus } from "react-icons/ti";
import LoadingData from "../../../UI/LoadingData/LoadingData";
import createWeeklyData from "../../../../Others/CreateWeeklyData/createWeeklyData";
import useModalCard from "../../../../Others/Custom/useModalCard"
import styles from "./DailyInfo.module.css";
import formatDate from "../../../../Others/FormatDate/formatDate";
import fetcher from "../../../../Others/Fetcher/fetcher";

const { TODAY } = timeObj;

// Cache object to store API responses
const cache = {
  transactionList: new Map(),
  transactionInfo: new Map(),
};

function DailyInfo(props) {
  const { updateState } = useContext(UpdateStateContext);
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(formatDate(TODAY));
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
  const [accInfo, setAccInfo] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [modalCard, modalCardToggler] = useModalCard();
  const weeklyCalendar = createWeeklyData(props.week);

  // Clear cache when updateState changes
  useEffect(() => {
    cache.transactionList.clear();
    cache.transactionInfo.clear();
  }, [updateState]);

  // Memoized fetchTransactionList with caching
  const cachedFetchTransactionList = useMemo(() => {
    return async (startDate, endDate) => {
      const cacheKey = `${startDate}-${endDate}`;
      if (cache.transactionList.has(cacheKey)) {
        return cache.transactionList.get(cacheKey);
      }
      const data = await fetchTransactionList(startDate, endDate);
      cache.transactionList.set(cacheKey, data);
      return data;
    };
  }, [updateState]); // Recreate when updateState changes

  // Memoized fetchTransactionInfo with caching
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

  // Use cachedFetchTransactionList in useEffect
  useEffect(() => {
    setIsLoading(true);
    cachedFetchTransactionList(selectedDate, selectedDate)
      .then((data) => {
        setTransactionList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedDate, cachedFetchTransactionList]);

  // Use cachedFetchTransactionInfo in useEffect
  useEffect(() => {
    cachedFetchTransactionInfo(selectedDate, selectedDate)
      .then((data) => {
        setAccInfo({
          income: data.total_income,
          expense: data.total_expense,
          balance: data.total_balance,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedDate, cachedFetchTransactionInfo]);

  function arrowBtnClickHandler(e) {
    const newDate = new Date(props.week);
    const id = e.target.dataset.id;

    if (id === "next") newDate.setDate(newDate.getDate() + 7);
    else if (id === "last") newDate.setDate(newDate.getDate() - 7);
    else return;

    props.setWeek(newDate);
    setSelectedDate(newDate);
    setSelectedDate(formatDate(newDate));
  }

  const weeklyCalendarList = weeklyCalendar.map(
    ({ year, month, monthDay, weekDay, dateObj }) => {
      let selected = false;
      let active = false;

      // check if it's "current" today
      const [todayYear, todayMonth, todayDate] = createYearMonthDay(TODAY);
      // check if it's selected day
      const [selectedYear, selectedMonth, selectedDateNum] = createYearMonthDay(
        new Date(selectedDate)
      );

      if (year === todayYear && month === todayMonth && monthDay === todayDate)
        active = true;
      else active = false;

      if (
        year === selectedYear &&
        month === selectedMonth &&
        monthDay === selectedDateNum &&
        !active
      )
        selected = true;
      else selected = false;

      return (
        <WeeklyCalendarList
          key={weekDay}
          weekDay={weekDay}
          monthDay={monthDay}
          dateObj={dateObj}
          active={active}
          selected={selected}
          setSelectedDate={setSelectedDate}
        />
      );
    }
  );

  let listContent = <LoadingData />;
  if (isLoading) listContent = <LoadingData />;
  else if (transactionList.length > 0) {
    listContent = (
      <ExpenseList
        key={selectedDate}
        dataList={transactionList}
        classItem={styles.item}
      />
    );
  } else {
    listContent = (
      <div className={`${styles.noData} center--flex capitalize`}>
        <p>no data</p>
        <p>click button to add data</p>
      </div>
    );
  }

  return (
    <div className={styles.daily}>
      {addDataFormModal && (
        <AddDataForm
          addDataFormModalToggler={addDataFormModalToggler}
          date={selectedDate}
        />
      )}
      {modalCard === "chart" && (
        <SmallChartModal
          type="week"
          modalCardToggler={modalCardToggler}
          date={props.week}
        />
      )}
      {modalCard === "info" && (
        <DataCardModal
          type="week"
          modalCardToggler={modalCardToggler}
          date={props.week}
        />
      )}

      <div className={styles["title__container"]}>
        <Title>daily transection</Title>

        <div className={`${styles["btn__container"]} center--flex`}>
          <BtnIcons onClick={modalCardToggler} />
          <BtnIcon
            onClick={addDataFormModalToggler}
            text="click to add data"
            classBtn={`${styles["btn--main"]} uppercase`}
            classText={styles["btn__text--main"]}
          >
            <TiPlus aria-label="add data" className={styles["btn--icon"]} />
            <p>add data</p>
          </BtnIcon>
        </div>
      </div>

      <div className={styles["calendar__container"]}>
        <BtnIcon
          text="last week"
          dataID="last"
          onClick={arrowBtnClickHandler}
          classBtn={`${styles["btn--arow"]} center--flex`}
          classText={styles["btn__text"]}
        >
          {"<"}
        </BtnIcon>
        {weeklyCalendarList}
        <BtnIcon
          text="next week"
          dataID="next"
          onClick={arrowBtnClickHandler}
          classBtn={`${styles["btn--arow"]} center--flex`}
          classText={styles["btn__text"]}
        >
          {">"}
        </BtnIcon>
      </div>

      <div className={`${styles.card} capitalize`}>
        <DailyDataCard text="expense" value={accInfo.expense} />
        <DailyDataCard text="income" value={accInfo.income} />
        <DailyDataCard text="balance" value={accInfo.balance} />
      </div>
      {listContent}
    </div>
  );
}

export default DailyInfo;

async function fetchTransactionList(startDate, endDate) {
  try {
    const data = await fetcher(`v1/transaction?start_date=${startDate}&end_date=${endDate}`, "GET");
    return data.transactions;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function fetchTransactionInfo(startDate, endDate) {
  try {
    const data = await fetcher(`v1/transaction/info?start_date=${startDate}&end_date=${endDate}`, "GET");
    return data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}