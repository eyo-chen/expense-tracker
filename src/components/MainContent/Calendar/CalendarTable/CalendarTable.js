import { useState, useEffect, useContext, useRef } from "react";
import Button from "../../../UI/Button/Button";
import CreateCalendarTable from "./CreateCalendarTable";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import ExpenseListModal from "../../../UI/ExpenseListModal/ExpenseListModal";
import AddDataForm from "../../../UI/AddDataForm/AddDateForm";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import SmallChartModal from "../../../UI/SmallChartModal/SmallChartModal";
import DataCardModal from "../../../UI/DataCardModal/DataCardModal";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import useAddDataForm from "../../../../Others/Custom/useAddDataForm";
import timeObj from "../../../assets/timeObj/timeObj";
import useExpenseDataList from "../../../../Others/Custom/useExpenseDataList";
import style from "./CalendarTable.module.css";

const dateOptObj = { month: "long" };
const { TODAY } = timeObj;

function CalendarTable(prop) {
  const { expenseData } = useContext(ExpenseDataContext);
  const [calendarState, setcalendarState] = useState(
    CreateCalendarTable(TODAY, expenseListModalToggler, expenseData)
  );
  const [date, setDate] = useState(new Date());
  const [expenseListModal, setExpenseListModal] = useState(false);
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
  const [modalCard, setModalCard] = useState(false);
  const [expenseDataList, selectedDate, setExpenseDataList] =
    useExpenseDataList(date, "monthly");
  // useRef can be used to store data that should be persisted across re-renders
  const skipInitialRender = useRef(false);

  useEffect(() => {
    // skip first render
    if (skipInitialRender.current) {
      const calendar = CreateCalendarTable(
        date,
        expenseListModalToggler,
        expenseData
      );
      setcalendarState(calendar);
    } else skipInitialRender.current = true;
  }, [expenseData]);

  function arrowBtnClickHandler(e) {
    const newDate = new Date(date);
    if (e.target.dataset.id === "increase") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    const calendar = CreateCalendarTable(
      newDate,
      expenseListModalToggler,
      expenseData
    );
    setcalendarState(calendar);
    setDate(newDate);
  }

  function expenseListModalToggler(e) {
    if (expenseListModal) {
      setExpenseListModal(false);
    } else {
      const date = e.target.dataset.id;

      if (!date) return;
      setExpenseDataList(date);
      setExpenseListModal(true);
    }
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

  return (
    <>
      {expenseListModal && (
        <ExpenseListModal
          selectedDate={selectedDate}
          expenseDataList={expenseDataList}
          expenseListModalToggler={expenseListModalToggler}
          addDataFormModalToggler={addDataFormModalToggler}
        />
      )}
      {addDataFormModal && (
        <AddDataForm
          date={selectedDate}
          addDataFormModalToggler={addDataFormModalToggler}
        />
      )}
      {modalCard === "chart" && (
        <SmallChartModal type="month" modalCardToggler={modalCardToggler} />
      )}
      {modalCard === "info" && (
        <DataCardModal type="month" modalCardToggler={modalCardToggler} />
      )}

      <div className={style["icon__container"]}>
        <BtnIcons onClick={modalCardToggler} />
      </div>
      <div className={style["monthly__container"]}>
        <div className={style["monthly__month"]}>
          <BtnIcon
            text="last month"
            onClick={arrowBtnClickHandler}
            classBtn={style.btn}
            classText={style["btn__text"]}
            dataID="decrease"
          >
            {"<"}
          </BtnIcon>

          <div className={style["monthly__title"]}>
            <h6>{new Intl.DateTimeFormat("en-US", dateOptObj).format(date)}</h6>
            <h6>{date.getFullYear()}</h6>
          </div>
          <BtnIcon
            text="next month"
            onClick={arrowBtnClickHandler}
            classBtn={style.btn}
            classText={style["btn__text"]}
            dataID="increase"
          >
            {">"}
          </BtnIcon>
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
//   calendar: createCalendarTable(date),
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

//       const calendar = createCalendarTable(date);
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
