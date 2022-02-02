import { React } from "react";
import timeObj from "../../../assets/timeObj/timeObj";
import createYearMonthDay from "../../../../Others/CreateYearMonthDay/createYearMonthDay";
import coerceNumber from "../../../../Others/CoerceNumber/coerceNumber";
import CalendarCell from "./CalendarCell";
import { v4 as uuidv4 } from "uuid";

const { YEAR: year, MONTH: month, DAY: today } = timeObj;
const [YEAR, MONTH, TODAY] = coerceNumber(year, month, today);

function CreateCalendarTable(date, showExpenseListModalHandler, expenseData) {
  const [dataYear, dataMonth] = createYearMonthDay(date);
  let key = String(dataYear);
  if (dataMonth >= 10) key += `-${String(dataMonth)}`;
  else key += `-0${String(dataMonth)}`;

  const [
    lastOfCurMonthDate,
    lastOfPrevMonthDate,
    firstOfCurMonthDay,
    daysOfNextMonth,
  ] = createCalendarPreData(date);

  const curMonthData = createMonthData(date, expenseData, lastOfPrevMonthDate);

  const res = [];

  // day of previous month
  for (let i = firstOfCurMonthDay; i > 0; i--) {
    res.push(
      <CalendarCell key={uuidv4()} curMonthIndex={false}>
        {lastOfPrevMonthDate - i + 1}
      </CalendarCell>
    );
  }

  // put this outside, so that don't need to keep calling the same method along with the iteration
  const curretYearMonth =
    date.getFullYear() === YEAR && date.getMonth() + 1 === MONTH;
  // day of current month
  for (let i = 1; i <= lastOfCurMonthDate; i++) {
    const todayIndex = curretYearMonth && i === TODAY;
    const indexID = i >= 10 ? i + "" : "0" + i;

    res.push(
      <CalendarCell
        key={uuidv4()}
        dataID={key + "-" + indexID}
        curMonthIndex={true}
        onClick={showExpenseListModalHandler}
        todayIndex={todayIndex}
        expenseIndex={curMonthData[i - 1] === "expense"}
        incomeIndex={curMonthData[i - 1] === "income"}
        bothIndex={curMonthData[i - 1] === "both"}
      >
        {i}
      </CalendarCell>
    );
  }

  // day of next month
  for (let i = 1; i <= daysOfNextMonth; i++) {
    res.push(
      <CalendarCell key={uuidv4()} curMonthIndex={false}>
        {i}
      </CalendarCell>
    );
  }

  return res;
}

export default CreateCalendarTable;

function createCalendarPreData(date) {
  const lastDayOfCurMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  );
  const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);

  const firstDayOfCurMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const lastOfCurMonthDate = lastDayOfCurMonth.getDate();
  const lastOfCurMonthDay = lastDayOfCurMonth.getDay();
  const lastOfPrevMonthDate = lastDayOfPrevMonth.getDate();
  const firstOfCurMonthDay = firstDayOfCurMonth.getDay();
  const daysOfNextMonth = 7 - lastOfCurMonthDay - 1;

  return [
    lastOfCurMonthDate,
    lastOfPrevMonthDate,
    firstOfCurMonthDay,
    daysOfNextMonth,
  ];
}

function createMonthData(date, expenseData, lastOfCurMonthDate) {
  const [curYear, curMonth] = createYearMonthDay(date);

  /*
  use Set to avoid duplicate value(date)
  both separately store the day of having expense and income
  */
  const expenseDaySet = new Set();
  const incomeDaySet = new Set();

  expenseData.forEach((data) => {
    const [dataYear, dataMonth, dataDay] = coerceNumber(
      data.year,
      data.month,
      data.day
    );

    // only store the data of current month
    if (curYear === dataYear && curMonth === dataMonth) {
      if (data.category === "expense") expenseDaySet.add(dataDay);
      else if (data.category === "income") incomeDaySet.add(dataDay);
    }
  });

  // sort to descending order, later need to remove the element from small value
  const expenseDayArr = Array.from(expenseDaySet).sort((a, b) => b - a);
  const incomeDayArr = Array.from(incomeDaySet).sort((a, b) => b - a);

  const curMonthData = [];

  /*
  iterate through from 1 ~ 30 or 31
  for example
  if day 5 in the expenseDayArr, add "expense" to curMonthData
  then remove 5 from the expenseDayArr
  we sort the array first above, so that now we can use .pop() here
  */
  for (let i = 1; i <= lastOfCurMonthDate; i++) {
    const expenseIndex = i === expenseDayArr[expenseDayArr.length - 1];
    const incomeIndex = i === incomeDayArr[incomeDayArr.length - 1];

    if (expenseIndex && incomeIndex) {
      curMonthData.push("both");
      expenseDayArr.pop();
      incomeDayArr.pop();
    } else if (expenseIndex && !incomeIndex) {
      curMonthData.push("expense");
      expenseDayArr.pop();
    } else if (incomeIndex && !expenseIndex) {
      curMonthData.push("income");
      incomeDayArr.pop();
    } else curMonthData.push(null);
  }

  return curMonthData;
}

/*
1. get the date having expense and income in current month (array)
2. get the last date of current month (30 or 31)
3. get the last date of previous month (30 or 31)
4. get the last day of current month (1 ~ 7)
5. get the first day of curret month (1 ~ 7)
6. create the last couple days of previous month
   => How to know exactly number of days?
   => first day of current month
   => For example, the first day of current month is friday(5)
   => then the calendar of this month can show 5 days of previous month
   => sun ~ thu shows the previous month, and fri and sat shows the curret month

7. create the all of days in current month
   => simply iterate through from 1 to last date of current month(2.)

8. create the next couple days of next month
   => How to know exactly number of days?
   => 7 - last day of current month - 1
   => For example, the last day of current month is MON
   => then the calendar of this month can show 5 days of next month
   => Sun and Mon is current month, Tue ~ Sat is next month
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// const DATE = new Date();
// const MONTH = DATE.getMonth();
// const TODAY = DATE.getDate();
// const YEAR = DATE.getFullYear();

// const cacheObj = {};

// function CreateCalendarTable(date, showModalHandler, expenseData) {
//   let key = date.getFullYear() + "" + (date.getMonth() + 1);
//   if (key.length < 6) {
//     key = date.getFullYear() + "0" + (date.getMonth() + 1);
//   }

//   // if (!cacheObj[key]) {
//   //   addCacheData(cacheObj, date, key, expenseData);
//   // }

//   const res = [];

//   const dayExpense = expenseData
//     .filter(
//       (element) =>
//         Number(element.time.slice(0, 4)) === date.getFullYear() &&
//         Number(element.time.slice(5, 7)) === date.getMonth() + 1 &&
//         element.category === "expense"
//     )
//     .map((element) => Number(element.time.slice(8)));

//   const dayIncome = expenseData
//     .filter(
//       (element) =>
//         Number(element.time.slice(0, 4)) === date.getFullYear() &&
//         Number(element.time.slice(5, 7)) === date.getMonth() + 1 &&
//         element.category === "income"
//     )
//     .map((element) => Number(element.time.slice(8)));

//   /*
//   last day of current month
//   0 gives us the last day of previous month
//   + 1 makes to be last day fo current month
//   getDate gives us the number type
//   */
//   const lastDay = new Date(
//     date.getFullYear(),
//     date.getMonth() + 1,
//     0
//   ).getDate();

//   // last day of previous month
//   const prevLastDay = new Date(
//     date.getFullYear(),
//     date.getMonth(),
//     0
//   ).getDate();

//   // last day of the week (current month)
//   const lastDayIndex = new Date(
//     date.getFullYear(),
//     date.getMonth() + 1,
//     0
//   ).getDay();

//   // first day of the week (current month)
//   const firstDayIndex = new Date(
//     date.getFullYear(),
//     date.getMonth(),
//     1
//   ).getDay();

//   const nextDays = 7 - lastDayIndex - 1;

//   // day of previous month
//   for (let i = firstDayIndex; i > 0; i--) {
//     res.push(
//       <div className={style.negative} key={uuidv4()}>
//         {prevLastDay - i + 1}
//       </div>
//     );
//   }

//   // day of current month
//   for (let i = 1; i <= lastDay; i++) {
//     // TODAY
//     if (
//       date.getFullYear() === YEAR &&
//       date.getMonth() === MONTH &&
//       i === TODAY
//     ) {
//       res.push(
//         checkDot(
//           i >= 10 ? i + "" : "0" + i,
//           true,
//           dayExpense,
//           dayIncome,
//           showModalHandler,
//           key
//         )
//       );
//     }
//     // other days
//     else
//       res.push(
//         checkDot(
//           i >= 10 ? i + "" : "0" + i,
//           false,
//           dayExpense,
//           dayIncome,
//           showModalHandler,
//           key
//         )
//       );
//   }

//   // day of next month
//   for (let i = 1; i <= nextDays; i++) {
//     res.push(
//       <div className={style.negative} key={uuidv4()}>
//         {i}
//       </div>
//     );
//   }

//   return res;
// }

// export default CreateCalendarTable;

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// function checkDot(i, current, dayExpense, dayIncome, showModalHandler, key) {
//   const numberI = Number(i);
//   const noDots = !(dayExpense.includes(numberI) || dayIncome.includes(numberI));

//   return (
//     <div
//       onClick={showModalHandler}
//       className={current ? style.current : ""}
//       key={uuidv4()}
//       data-id={key + i}
//     >
//       {i}
//       {noDots || (
//         <div className={style["dot__container"]}>
//           {dayExpense.includes(numberI) && (
//             <span className={`${style["dot--blue"]} ${style.dot}`}></span>
//           )}
//           {dayIncome.includes(numberI) && (
//             <span className={`${style["dot--pink"]} ${style.dot}`}></span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

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
