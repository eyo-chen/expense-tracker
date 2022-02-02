import SearchOptionUI from "./SearchOptionUI";
import createDateStringFormat from "../../../../Others/CreateDateStringFormat/CreateDateStringFormat";
/*
setDate(), setMonth(), setYear() will mutate the date object
so we need many different date objects

for each option, we need two different dates
one is starting date, the other one is ending date
*/

const dateToday = new Date(),
  dateYesterDay = new Date(),
  dateThreeDays = new Date(),
  dateLastWeek = new Date(),
  dateMonthFirst = new Date(),
  dateMonthLast = new Date(),
  dateLastMonthFirst = new Date(),
  dateLastMonthLast = new Date(),
  dateThreeMonthsFirst = new Date(),
  dateThreeMonthsLast = new Date(),
  dateYearFirst = new Date(),
  dateYearLast = new Date(),
  dateLastYearFirst = new Date(),
  dateLastYearLast = new Date();

dateYesterDay.setDate(dateYesterDay.getDate() - 1);
dateThreeDays.setDate(dateThreeDays.getDate() - 3);
dateLastWeek.setDate(dateLastWeek.getDate() - 7);
dateMonthFirst.setDate(1);
dateMonthLast.setMonth(dateMonthLast.getMonth() + 1, 0);
dateLastMonthFirst.setMonth(dateLastMonthFirst.getMonth() - 1, 1);
dateLastMonthLast.setMonth(dateLastMonthLast.getMonth(), 0);
dateThreeMonthsFirst.setMonth(dateThreeMonthsFirst.getMonth() - 3, 1);
dateThreeMonthsLast.setMonth(dateThreeMonthsLast.getMonth(), 0);
dateYearFirst.setFullYear(dateYearFirst.getFullYear(), 0, 1);
dateYearLast.setFullYear(dateYearLast.getFullYear(), 12, 0);
dateLastYearFirst.setFullYear(dateLastYearFirst.getFullYear() - 1, 0, 1);
dateLastYearLast.setFullYear(dateLastYearLast.getFullYear() - 1, 12, 0);

const dateTodayString = createDateStringFormat(dateToday);

const checkboxTime = [
  {
    text: "today",
    value: [dateTodayString, dateTodayString],
  },
  {
    text: "yesterady",
    value: [createDateStringFormat(dateYesterDay), dateTodayString],
  },
  {
    text: "three days ago",
    value: [createDateStringFormat(dateThreeDays), dateTodayString],
  },
  {
    text: "last week",
    value: [createDateStringFormat(dateLastWeek), dateTodayString],
  },
  {
    text: "this month",
    value: [
      createDateStringFormat(dateMonthFirst),
      createDateStringFormat(dateMonthLast),
    ],
  },
  {
    text: "last month",
    value: [
      createDateStringFormat(dateLastMonthFirst),
      createDateStringFormat(dateLastMonthLast),
    ],
  },
  {
    text: "three months ago",
    value: [
      createDateStringFormat(dateThreeMonthsFirst),
      createDateStringFormat(dateThreeMonthsLast),
    ],
  },
  {
    text: "this year",
    value: [
      createDateStringFormat(dateYearFirst),
      createDateStringFormat(dateYearLast),
    ],
  },
  {
    text: "last year",
    value: [
      createDateStringFormat(dateLastYearFirst),
      createDateStringFormat(dateLastYearLast),
    ],
  },
];

function SearchOptionTime() {
  return (
    <SearchOptionUI dataID="time" label="time" checkboxItem={checkboxTime} />
  );
}

export default SearchOptionTime;
