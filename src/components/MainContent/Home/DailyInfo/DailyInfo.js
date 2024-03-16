import { useEffect, useState } from "react";
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
import useBundleData from "../../../../Others/Custom/useBundleData";
import { TiPlus } from "react-icons/ti";
import LoadingData from "../../../UI/LoadingData/LoadingData";
import styles from "./DailyInfo.module.css";
import formatDate from "../../../../Others/FormatDate/formatDate";
import fetcher from "../../../../Others/Fetcher/fetcher";

const { TODAY } = timeObj;

function DailyInfo(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate1, setSelectedDate1] = useState(formatDate(TODAY));
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
  const [accInfo, setAccInfo] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [
    weeklyCalendar,
    expenseDataList,
    selectedDate,
    setSelectedDate,
    modalCard,
    modalCardToggler,
  ] = useBundleData("daily", props.week);

  async function fetchTransactionList() {
    try {
      const data = await fetcher(`v1/transaction?start_date=${selectedDate1}&end_date=${selectedDate1}`, "GET");
      return data.transactions;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchTransactionInfo(startDate, endDate) {
    try {
      const data = await fetcher(`v1/transaction/info?start_date=${startDate}&end_date=${endDate}`, "GET");
      return data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchTransactionList().then((data) => {
      setTransactionList(data);
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [selectedDate1, props.addNewData]);

  useEffect(() => {
    fetchTransactionInfo(selectedDate1, selectedDate1).then((data) => {
      setAccInfo({
        income: data.total_income,
        expense: data.total_expense,
        balance: data.total_balance
      });
    }
    ).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [selectedDate1]);

  function arrowBtnClickHandler(e) {
    const newDate = new Date(props.week);
    const id = e.target.dataset.id;

    if (id === "next") newDate.setDate(newDate.getDate() + 7);
    else if (id === "last") newDate.setDate(newDate.getDate() - 7);
    else return;

    props.setWeek(newDate);
    setSelectedDate(newDate);
    setSelectedDate1(formatDate(newDate));
  }

  const weeklyCalendarList = weeklyCalendar.map(
    ({ year, month, monthDay, weekDay, dateObj }) => {
      let selected = false;
      let active = false;

      // check if it's "current" today
      const [todayYear, todayMonth, todayDate] = createYearMonthDay(TODAY);
      // check if it's selected day
      const [selectedYear, selectedMonth, selectedDateNum] = createYearMonthDay(
        new Date(selectedDate1)
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
          setSelectedDate={setSelectedDate1}
        />
      );
    }
  );

  let listContent = <LoadingData />;
  if (isLoading) listContent = <LoadingData />;
  else if (transactionList.length > 0) {
    listContent = (
      <ExpenseList
        key={selectedDate1}
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
          date={selectedDate1}
          addNewDataHandler={props.addNewDataHandler}
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
