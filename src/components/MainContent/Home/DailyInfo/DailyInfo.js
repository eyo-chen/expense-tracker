import { useState, useEffect, useContext } from "react";
import useDailyExpenseList from "../../../../Others/Custom/useDailyExpenseList";
import Title from "../../../UI/Title/Title";
import CalendarList from "./CalendarList";
import Button from "../../../UI/Button/Button";
import createWeeklyData from "../../../../Others/createWeeklyData";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import AddDataForm from "../../../UI/AddDataForm/AddDateForm";
import AccountInfoModal from "../../../UI/AccountInfoModal/AccountInfoModal";
import SmallChartModal from "../../../UI/SmallChartModal/SmallChartModal";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import { TiPlus } from "react-icons/ti";
import style from "./DailyInfo.module.css";
import { v4 as uuidv4 } from "uuid";

const currentDate = new Date();
const CURRENT_DATE = new Date();

let weekArr = createWeeklyData(currentDate);

let index = 0;

function DailyInfo() {
  const [calendarDate, setCalendatDate] = useState(weekArr);
  const [animation, setAnimation] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [addDataFormModal, setAddDataFormModal] = useState({
    show: false,
    date: undefined,
  });
  const [modalCard, setModalCard] = useState(false);

  // custom hook1
  // first returned value is the expense & income data of current date
  const [dailyExpenseListState, setDailyExpenseListState] =
    useDailyExpenseList(CURRENT_DATE);

  // useEffect(() => {
  //   if (index === 0) {
  //     index++;
  //     return;
  //   }

  //   setAnimation(true);

  //   const time = setTimeout(() => {
  //     setAnimation(false);
  //   }, 300);

  //   return function cleanUp() {
  //     clearTimeout(time);
  //   };
  // }, [calendarDate]);

  function incrementDateHandler() {
    currentDate.setDate(currentDate.getDate() + 7);
    weekArr = createWeeklyData(currentDate);
    setCalendatDate(weekArr);
  }

  function decrementDateHandler() {
    currentDate.setDate(currentDate.getDate() - 7);
    weekArr = createWeeklyData(currentDate);
    setCalendatDate(weekArr);
  }

  function showFormHandler() {
    setAddDataFormModal({ show: true, date: selectDate });
  }

  function closeFormHandler(edit) {
    setAddDataFormModal({ show: false, date: undefined });
  }

  let active = false;
  let selected = false;

  const calendarList = calendarDate.map((time) => {
    // check if it's "current" today
    if (
      time.month === CURRENT_DATE.getMonth() &&
      time.monthDay === CURRENT_DATE.getDate() &&
      time.year === CURRENT_DATE.getFullYear()
    )
      active = true;
    else active = false;

    // check if it's selected day
    if (
      time.monthDay === new Date(selectDate).getDate() &&
      time.month === new Date(selectDate).getMonth() &&
      time.year === new Date(selectDate).getFullYear() &&
      !active
    )
      selected = true;
    else selected = false;

    return (
      <CalendarList
        key={uuidv4()}
        weekDay={time.weekDay}
        monthDay={time.monthDay}
        dateObj={time.dateObj}
        active={active}
        selected={selected}
        animation={animation}
        setDailyExpenseListState={setDailyExpenseListState}
        setSelectDate={setSelectDate}
      />
    );
  });

  let listContent = (
    <div className={style.noData}>
      <p>no data</p>
      <p>click button to add data</p>
    </div>
  );
  if (dailyExpenseListState.length > 0)
    listContent = (
      <ExpenseList data={dailyExpenseListState} classItem={style.item} />
    );

  const accExpense = dailyExpenseListState
    .filter((data) => data.category === "expense")
    .reduce((acc, cur) => (acc += Number(cur.price)), 0);

  const accIncome = dailyExpenseListState
    .filter((data) => data.category === "income")
    .reduce((acc, cur) => (acc += Number(cur.price)), 0);

  function showModalCard(e) {
    const id = e.target.dataset.id;

    if (id) {
      setModalCard(id);
    }
  }

  function closeModalCard() {
    setModalCard(false);
  }

  return (
    <div className={style.daily}>
      {addDataFormModal.show && (
        <AddDataForm
          closeFormHandlerFromHome={closeFormHandler}
          date={addDataFormModal.date}
        />
      )}
      {modalCard === "chart" && (
        <SmallChartModal type="week" closeModalCard={closeModalCard} />
      )}
      {modalCard === "info" && (
        <AccountInfoModal type="week" closeModalCard={closeModalCard} />
      )}

      <div className={style["daily__first"]}>
        <Title>daily transection</Title>

        <div className={style["btn__container"]}>
          <BtnIcons onClick={showModalCard} />
          <BtnIcon
            text="add data"
            onClick={showFormHandler}
            classText={style["btn__text"]}
            classBtn={style.btn}
          >
            <TiPlus />
          </BtnIcon>
        </div>
      </div>

      <div className={style["calendar__container"]}>
        <BtnIcon
          text="last week"
          onClick={decrementDateHandler}
          classBtn={style["btn--arow"]}
          classText={style["btn__text--arrow"]}
        >
          {"<"}
        </BtnIcon>
        {calendarList}
        <BtnIcon
          text="next week"
          onClick={incrementDateHandler}
          classBtn={style["btn--arow"]}
          classText={style["btn__text--arrow"]}
        >
          {">"}
        </BtnIcon>
      </div>

      <div className={style["today__account"]}>
        <div>
          <p className={style["today__account__text"]}>Total Expense</p>
          <p className={style["today__account__number"]}>{`$${accExpense}`}</p>
        </div>
        <div className={style.income}>
          <p className={style["today__account__text"]}>Total Income</p>
          <p className={style["today__account__number"]}>{`$${accIncome}`}</p>
        </div>
        <div>
          <p className={style["today__account__text"]}>Total Net</p>
          <p className={style["today__account__number"]}>{`$${
            accIncome - accExpense
          }`}</p>
        </div>
      </div>
      {listContent}
    </div>
  );
}

export default DailyInfo;
