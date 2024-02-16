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
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import createYearMonthDay from "../../../../Others/CreateYearMonthDay/createYearMonthDay";
import useAddDataForm from "../../../../Others/Custom/useAddDataForm";
import formatMoney from "../../../../Others/FormatMoney/formatMoney";
import mutipleArgsHelper from "../../../../Others/MultipleArgsHelper/multipleArgsHelper";
import useBundleData from "../../../../Others/Custom/useBundleData";
import { TiPlus } from "react-icons/ti";
import LoadingData from "../../../UI/LoadingData/LoadingData";
import styles from "./DailyInfo.module.css";
import axios from "axios";
import getToken from "../../../../Others/GetToken/getToken";
import formatDate from "../../../../Others/FormatDate/formatDate";

const { TODAY } = timeObj;

function DailyInfo(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate1, setSelectedDate1] = useState(formatDate(TODAY));
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
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
      const resp = await axios.get(`http://localhost:4000/v1/transaction?start_date=${selectedDate1}&end_date=${selectedDate1}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": getToken()
        },
        withCredentials: false
      });

      return resp.data.transactions
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addDataHandler() {
    try {
      const updatedList = await fetchTransactionList();
      setTransactionList(updatedList);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  }

  useEffect(() => {
    fetchTransactionList().then((data) => {
      setTransactionList(data);
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [selectedDate1]);

  const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    ...createAccAmount(
      expenseDataList,
      ...Array(3), // skip three arguments
      true
    )
  );

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
          addDataHandler={addDataHandler}
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
        <DailyDataCard text="expense" value={expense} />
        <DailyDataCard text="income" value={income} />
        <DailyDataCard text="net income" value={netIncome} />
      </div>
      {listContent}
    </div>
  );
}

export default DailyInfo;
