import { useState, useEffect, useContext } from "react";
import Button from "../../../UI/Button";
import CreateCalendar from "./CreateCalendarTable";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import ExpenseListModal from "../../../UI/ExpenseListModal/ExpenseListModal";
import AddDataForm from "../../../UI/AddDataForm/AddDateForm";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import SmallChartModal from "../../../UI/SmallChartModal/SmallChartModal";
import AccountInfoModal from "../../../UI/AccountInfoModal/AccountInfoModal";
import style from "./CalendarTable.module.css";

const dateOptObj = { month: "long" };

const date = new Date();

const DATE = new Date();
const MONTH = new Intl.DateTimeFormat("en-US", dateOptObj).format(new Date());

function CalendarTable(prop) {
  const { expenseData } = useContext(ExpenseDataContext);
  const [calendarState, setcalendarState] = useState(
    CreateCalendar(DATE, showModalHandler, expenseData)
  );
  const [month, setMonth] = useState(MONTH);
  const [year, SetYear] = useState(date.getFullYear());
  const [animationMonth, setAnimationMonth] = useState(false);
  const [animationYear, setAnimationMonthYear] = useState(false);
  const [expenseListModal, setExpenseListModal] = useState(false);
  const [expenseListCalendar, setExpenseListCalendar] = useState([]);
  const [addDataFormModal, setAddDataFormModal] = useState({
    show: false,
    date: "",
  });
  const [modalCard, setModalCard] = useState(false);

  useEffect(() => {
    const calendar = CreateCalendar(date, showModalHandler, expenseData);

    setcalendarState(calendar);
  }, [expenseData]);

  function changeMonth(change) {
    if (change === "increase") date.setMonth(date.getMonth() + 1);
    else date.setMonth(date.getMonth() - 1);

    const calendar = CreateCalendar(date, showModalHandler, expenseData);

    setcalendarState(calendar);
    setMonth(new Intl.DateTimeFormat("en-US", dateOptObj).format(date));
    SetYear(date.getFullYear());
  }

  function showModalHandler(e) {
    const rawData = e.target.dataset.id;

    if (!rawData) return;
    const data = `${rawData.slice(0, 4)}-${rawData.slice(4, 6)}-${rawData.slice(
      6
    )}`;

    const allDataArr = expenseData.filter((element) => {
      return element.time === data;
    });

    setExpenseListModal(true);
    if (allDataArr.length === 0) setExpenseListCalendar(data);
    else setExpenseListCalendar(allDataArr);
  }

  function closeModalHandler() {
    setExpenseListModal(false);
  }

  function showAddDataFormHandler(time) {
    setAddDataFormModal({ show: true, date: time });
  }

  function closeAddDataFormHandler() {
    setAddDataFormModal({ show: false, date: "" });
  }

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
    <>
      {expenseListModal && (
        <ExpenseListModal
          expenseListCalendar={expenseListCalendar}
          setExpenseListCalendar={setExpenseListCalendar}
          closeModalHandler={closeModalHandler}
          showAddDataFormHandler={showAddDataFormHandler}
        />
      )}
      {addDataFormModal.show && (
        <AddDataForm
          date={addDataFormModal.date}
          closeAddDataFormHandlerFromCalendar={closeAddDataFormHandler}
        />
      )}
      {modalCard === "chart" && (
        <SmallChartModal type="month" closeModalCard={closeModalCard} />
      )}
      {modalCard === "info" && (
        <AccountInfoModal type="month" closeModalCard={closeModalCard} />
      )}

      <div className={style["icon__container"]}>
        <BtnIcons onClick={showModalCard} />
      </div>
      <div className={style["monthly__container"]}>
        <div className={style["monthly__month"]}>
          <Button
            className={style.btn}
            onClick={() => changeMonth("decrease")}
            type="button"
          >{`${"<"}`}</Button>
          <div className={style["monthly__title"]}>
            <h6 className={animationMonth ? `${style.bump}` : ""}>{month}</h6>
            <h6 className={animationYear ? `${style.bump}` : ""}>{year}</h6>
          </div>
          <Button
            className={style.btn}
            onClick={() => changeMonth("increase")}
            type="button"
          >{`${">"}`}</Button>
        </div>
        <div className={style["monthly__week"]}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={style["monthly__days"]}>{calendarState}</div>
      </div>
    </>
  );
}
export default CalendarTable;

/*
  // animation for month
  useEffect(() => {
    // if (index === 0) {
    //   index++;
    //   return;
    // }

    setAnimationMonth(true);

    const time = setTimeout(() => {
      setAnimationMonth(false);
    }, 300);

    return function cleanUp() {
      clearTimeout(time);
    };
  }, [month]);

  // animation for year
  useEffect(() => {
    // if (index1 === 0) {
    //   index1++;
    //   return;
    // }

    setAnimationMonthYear(true);

    const time = setTimeout(() => {
      setAnimationMonthYear(false);
    }, 300);

    return function cleanUp() {
      clearTimeout(time);
    };
  }, [year]);


  */

// const test = new Date();
// test.setFullYear(date.getFullYear() - 1);
// test.setMonth(11);
// // test.setMonth(0);

// console.log(test);

// const initialObj = {
//   calendar: createCalendar(date),
//   month: new Intl.DateTimeFormat("en-US", dateOptObj).format(date),
//   year: date.getFullYear(),
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "INCREMENT": {
//       //   if (state.month === "December") {
//       //     date.setFullYear(date.getFullYear() + 1);
//       //     date.setMonth(0);
//       //   } else {
//       date.setMonth(date.getMonth() + 1);
//       //   }

//       const month = new Intl.DateTimeFormat("en-US", dateOptObj).format(date);
//       //   console.log(month);
//       const calendar = [];
//       const year = date.getFullYear();

//       //   console.log(month, year);

//       return {
//         calendar,
//         month,
//         year,
//       };
//     }

//     case "DECREMENT": {
//       if (state.month === "January") {
//         date.setFullYear(date.getFullYear() - 1);
//         date.setMonth(11);
//       } else date.setMonth(date.getMonth() - 1);

//       const calendar = createCalendar(date);
//       const month = new Intl.DateTimeFormat("en-US", dateOptObj).format(date);
//       const year = date.getFullYear();

//       return {
//         calendar,
//         month,
//         year,
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }
