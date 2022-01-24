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
import { TiPlus } from "react-icons/ti";

const currentDate = new Date();
const { TODAY } = timeObj;

let weekArr = createWeeklyData(currentDate);

function DailyInfo() {
  const [weeklyData, setWeeklyData] = useState(weekArr);
  const [selectedDate, setSelectedDate] = useState();
  const [addDataFormModal, setAddDataFormModal] = useState({
    show: false,
    date: undefined,
  });
  const [modalCard, setModalCard] = useState(false);
  const [dailyExpenseData, setDailyExpenseData] = useDailyExpenseData(TODAY);
  const [accIncome, accExpense] = createAccAmount(
    dailyExpenseData,
    ...Array(3), // skip three arguments
    true
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

  function addDataFormToggler() {
    if (addDataFormModal.show)
      setAddDataFormModal({ show: false, date: undefined });
    else setAddDataFormModal({ show: true, date: selectedDate });
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
  const weeklyCalendarList = weeklyData.map((time) => {
    // check if it's "current" today
    if (
      time.year === TODAY.getFullYear() &&
      time.month === TODAY.getMonth() &&
      time.monthDay === TODAY.getDate()
    )
      active = true;
    else active = false;

    // check if it's selected day
    if (
      time.year === new Date(selectedDate).getFullYear() &&
      time.month === new Date(selectedDate).getMonth() &&
      time.monthDay === new Date(selectedDate).getDate() &&
      !active
    )
      selected = true;
    else selected = false;

    return (
      <CalendarList
        key={time.weekDay}
        weekDay={time.weekDay}
        monthDay={time.monthDay}
        dateObj={time.dateObj}
        active={active}
        selected={selected}
        setDailyExpenseData={setDailyExpenseData}
        setSelectedDate={setSelectedDate}
      />
    );
  });

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
      {addDataFormModal.show && (
        <AddDataForm
          closeFormHandlerFromHome={addDataFormToggler}
          date={addDataFormModal.date}
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
            onClick={addDataFormToggler}
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
        <DailyDataCard text="expense" value={accExpense} />
        <DailyDataCard text="income" value={accIncome} />
        <DailyDataCard text="net income" value={accIncome - accExpense} />
      </div>
      {listContent}
    </div>
  );
}

export default DailyInfo;
