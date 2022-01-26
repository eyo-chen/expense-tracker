import { useState } from "react";
import AddDataForm from "../../../UI/AddDataForm/AddDateForm";
import AccountInfoModal from "../../../UI/AccountInfoModal/AccountInfoModal";
import Button from "../../../UI/Button/Button";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import CalendarList from "./CalendarList";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import useDailyExpenseData from "../../../../Others/Custom/useDailyExpenseData";
import Title from "../../../UI/Title/Title";
import SmallChartModal from "../../../UI/SmallChartModal/SmallChartModal";
import DailyDataCard from "./DailyDataCard";
import style from "./DailyInfo.module.css";
import timeObj from "../../../assets/timeObj/timeObj";
import createWeeklyData from "../../../../Others/createWeeklyData";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import createYearMonthDay from "../../../../Others/CreateYearMonthDay/createYearMonthDay";
import useAddDataForm from "../../../../Others/Custom/useAddDataForm";
import formatMoney from "../../../../Others/FormatMoney/formatMoney";
import mutipleArgsHelper from "../../../../Others/MultipleArgsHelper/multipleArgsHelper";
import { TiPlus } from "react-icons/ti";

const currentDate = new Date();
const { TODAY } = timeObj;

let weekArr = createWeeklyData(currentDate);

function DailyInfo() {
  const [weeklyData, setWeeklyData] = useState(weekArr);
  const [selectedDate, setSelectedDate] = useState();
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
  const [modalCard, setModalCard] = useState(false);
  const [dailyExpenseData, setDailyExpenseData] = useDailyExpenseData(TODAY);
  const [accIncome, accExpense] = createAccAmount(
    dailyExpenseData,
    ...Array(3), // skip three arguments
    true
  );
  const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    accIncome,
    accExpense,
    accIncome - accExpense
  );

  function nextWeekClickHandler() {
    currentDate.setDate(currentDate.getDate() + 7);
    weekArr = createWeeklyData(currentDate);
    setWeeklyData(weekArr);
  }

  function lastWeekClickHandler() {
    currentDate.setDate(currentDate.getDate() - 7);
    weekArr = createWeeklyData(currentDate);
    setWeeklyData(weekArr);
  }

  function modalCardToggler(e) {
    if (modalCard) setModalCard(false);
    else {
      const id = e.target.dataset.id;

      if (id) {
        setModalCard(id);
      }
    }
  }

  let active = false;
  let selected = false;
  const weeklyCalendarList = weeklyData.map(
    ({ year, month, monthDay, weekDay, dateObj }) => {
      // check if it's "current" today
      const [todayYear, todayMonth, todayDate] = createYearMonthDay(TODAY);
      if (year === todayYear && month === todayMonth && monthDay === todayDate)
        active = true;
      else active = false;

      // check if it's selected day
      const [selectedYear, selectedMonth, selectedDateNum] = createYearMonthDay(
        new Date(selectedDate)
      );
      if (
        year === selectedYear &&
        month === selectedMonth &&
        monthDay === selectedDateNum &&
        !active
      )
        selected = true;
      else selected = false;

      return (
        <CalendarList
          key={weekDay}
          weekDay={weekDay}
          monthDay={monthDay}
          dateObj={dateObj}
          active={active}
          selected={selected}
          setDailyExpenseData={setDailyExpenseData}
          setSelectedDate={setSelectedDate}
        />
      );
    }
  );

  let listContent = (
    <div className={style.noData}>
      <p>no data</p>
      <p>click button to add data</p>
    </div>
  );

  if (dailyExpenseData.length > 0)
    listContent = (
      <ExpenseList data={dailyExpenseData} classItem={style.item} />
    );

  return (
    <div className={style.daily}>
      {addDataFormModal && (
        <AddDataForm
          addDataFormModalToggler={addDataFormModalToggler}
          date={selectedDate}
        />
      )}
      {modalCard === "chart" && (
        <SmallChartModal type="week" modalCardToggler={modalCardToggler} />
      )}
      {modalCard === "info" && (
        <AccountInfoModal type="week" modalCardToggler={modalCardToggler} />
      )}

      <div className={style["title__container"]}>
        <Title>daily transection</Title>

        <div className={style["btn__container"]}>
          <BtnIcons onClick={modalCardToggler} />
          <Button
            className={`${style["btn--main"]} uppercase`}
            onClick={addDataFormModalToggler}
          >
            <TiPlus className={style["btn--icon"]} /> <p>add data</p>
          </Button>
        </div>
      </div>

      <div className={style["calendar__container"]}>
        <BtnIcon
          text="last week"
          onClick={lastWeekClickHandler}
          classBtn={style["btn--arow"]}
          classText={style["btn__text"]}
        >
          {"<"}
        </BtnIcon>
        {weeklyCalendarList}
        <BtnIcon
          text="next week"
          onClick={nextWeekClickHandler}
          classBtn={style["btn--arow"]}
          classText={style["btn__text"]}
        >
          {">"}
        </BtnIcon>
      </div>

      <div className={`${style.card} capitalize`}>
        <DailyDataCard text="expense" value={expense} />
        <DailyDataCard text="income" value={income} />
        <DailyDataCard text="net income" value={netIncome} />
      </div>
      {listContent}
    </div>
  );
}

export default DailyInfo;
