import { useState, useEffect, useContext, useRef } from "react";
import Title from "../../../UI/Title/Title";
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
  const [calendarTable, setcalendarTable] = useState(
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
      setcalendarTable(calendar);
    } else skipInitialRender.current = true;
  }, [expenseData]);

  function arrowBtnClickHandler(e) {
    // Reference 1
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
    setcalendarTable(calendar);
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

          <div className={`${style["monthly__title"]} center--flex`}>
            <Title className={style.title}>
              {new Intl.DateTimeFormat("en-US", dateOptObj).format(date)}
            </Title>
            <Title className={style.title}>{date.getFullYear()}</Title>
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
        <div className={style["monthly__days"]}>{calendarTable}</div>
      </div>
    </>
  );
}
export default CalendarTable;

/*
  Reference 1

  Copying the new date object is vary important
  Imagine without this
  We set a variable called date outside the component function
  And user modify the value whenever click the arrow btn

  The weird thing's gonna happen after user exit the calendar page and come back again
  the value of variable won't change back to initial value because it's outside the componentfunction
  For example, initial value is February, and user keep click next month arrow btn
  So now the value is June
  Once user click next month arrow btn again, 
  User expect it should be March since that's the next month of initial value
  But not the value is July (old mutated value + one month)

  Now, whenever user come back this page, our initial value is always current month
  because that's how we set in here const [date, setDate] = useState(new Date());
  Then user click the arrow btn, we 
  1. copy the value
  2. mutate tha value
  3. set this new mutated value to the new state value

  So next time user clcik the btn again
  the date in const newDate = new Date(date); is the value we mutated in the last state
*/

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
    //   return;Ad
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
