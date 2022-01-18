import { React } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./CreateCalendarTable.module.css";

const DATE = new Date();
const MONTH = DATE.getMonth();
const TODAY = DATE.getDate();
const YEAR = DATE.getFullYear();

const cacheObj = {};

function CreateCalendarTable(date, showModalHandler, expenseData) {
  let key = date.getFullYear() + "" + (date.getMonth() + 1);
  if (key.length < 6) {
    key = date.getFullYear() + "0" + (date.getMonth() + 1);
  }

  // if (!cacheObj[key]) {
  //   addCacheData(cacheObj, date, key, expenseData);
  // }

  const res = [];

  const dayExpense = expenseData
    .filter(
      (element) =>
        Number(element.time.slice(0, 4)) === date.getFullYear() &&
        Number(element.time.slice(5, 7)) === date.getMonth() + 1 &&
        element.category === "expense"
    )
    .map((element) => Number(element.time.slice(8)));

  const dayIncome = expenseData
    .filter(
      (element) =>
        Number(element.time.slice(0, 4)) === date.getFullYear() &&
        Number(element.time.slice(5, 7)) === date.getMonth() + 1 &&
        element.category === "income"
    )
    .map((element) => Number(element.time.slice(8)));

  /*
  last day of current month
  0 gives us the last day of previous month
  + 1 makes to be last day fo current month
  getDate gives us the number type
  */
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  // last day of previous month
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  // last day of the week (current month)
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  // first day of the week (current month)
  const firstDayIndex = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  // day of previous month
  for (let i = firstDayIndex; i > 0; i--) {
    res.push(
      <div className={style.negative} key={uuidv4()}>
        {prevLastDay - i + 1}
      </div>
    );
  }

  // day of current month
  for (let i = 1; i <= lastDay; i++) {
    // TODAY
    if (
      date.getFullYear() === YEAR &&
      date.getMonth() === MONTH &&
      i === TODAY
    ) {
      res.push(
        checkDot(
          i >= 10 ? i + "" : "0" + i,
          true,
          dayExpense,
          dayIncome,
          showModalHandler,
          key
        )
      );
    }
    // other days
    else
      res.push(
        checkDot(
          i >= 10 ? i + "" : "0" + i,
          false,
          dayExpense,
          dayIncome,
          showModalHandler,
          key
        )
      );
  }

  // day of next month
  for (let i = 1; i <= nextDays; i++) {
    res.push(
      <div className={style.negative} key={uuidv4()}>
        {i}
      </div>
    );
  }

  return res;
}

export default CreateCalendarTable;

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
function checkDot(i, current, dayExpense, dayIncome, showModalHandler, key) {
  const numberI = Number(i);
  const noDots = !(dayExpense.includes(numberI) || dayIncome.includes(numberI));

  return (
    <div
      onClick={showModalHandler}
      className={current ? style.current : ""}
      key={uuidv4()}
      data-id={key + i}
    >
      {i}
      {noDots || (
        <div className={style["dot__container"]}>
          {dayExpense.includes(numberI) && (
            <span className={`${style["dot--blue"]} ${style.dot}`}></span>
          )}
          {dayIncome.includes(numberI) && (
            <span className={`${style["dot--pink"]} ${style.dot}`}></span>
          )}
        </div>
      )}
    </div>
  );
}

/*
function addCacheData(cacheObj, date, key, expenseData) {
  // each value in cache object is an array containing two arrays(day of expense and income)
  cacheObj[key] = [];

  const dayExpense = expenseData
    .filter(
      (element) =>
        Number(element.time.slice(0, 4)) === date.getFullYear() &&
        Number(element.time.slice(5, 7)) === date.getMonth() + 1 &&
        element.category === "expense"
    )
    .map((element) => Number(element.time.slice(8)));

  const dayIncome = expenseData
    .filter(
      (element) =>
        Number(element.time.slice(0, 4)) === date.getFullYear() &&
        Number(element.time.slice(5, 7)) === date.getMonth() + 1 &&
        element.category === "income"
    )
    .map((element) => Number(element.time.slice(8)));

  cacheObj[key].push(dayExpense);
  cacheObj[key].push(dayIncome);
}
*/
