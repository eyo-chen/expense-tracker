import createDateStringFormat from "../CreateDateStringFormat/CreateDateStringFormat";

/*
the main purpose of this function (standard labels)(2021-11-08)
is for adding(accumulating) the total amount within valid range 
*/
function createStandardLabelsArr(duration, startingDate) {
  const startDay = new Date(startingDate);
  const labels = [];

  // one week
  if (duration === "7") {
    createStandardLabelsArrHelper(labels, 7, 1, "day", startDay);
  }

  if (duration === "14") {
    createStandardLabelsArrHelper(labels, 14, 1, "day", startDay);
  }

  if (duration === "30") {
    createStandardLabelsArrHelper(labels, 30, 1, "day", startDay);
  }

  if (duration === "90") {
    createStandardLabelsArrHelper(labels, 30, 3, "day", startDay);
  }

  if (duration === "6") {
    createStandardLabelsArrHelper(labels, 6, 1, "month", startDay);
  }

  if (duration === "12") {
    createStandardLabelsArrHelper(labels, 12, 1, "month", startDay);
  }

  return labels;
}

export default createStandardLabelsArr;

function createStandardLabelsArrHelper(
  labels,
  duration,
  incrementAmount,
  dayMonth,
  today
) {
  let tmpDay = today;
  let day;
  let month;
  let year = today.getFullYear();
  let changeYear = false;

  /*
  note that it will immediately increment the number of day
  in the first for-loop
  so have to add the very first day
  for example, today is 2021-11-21, and time duration is 7
  what we want is an array [21, 22, 23, 24, 25, 26, 27]
  which means 21 is inclusive
  */
  labels.push(createDateStringFormat(tmpDay));

  /*
  if it's increment by month, the day is never change
  we could put it outisde for-loop
  */
  if (dayMonth === "month") {
    const date = tmpDay.getDate();

    if (date < 10) day = `0${date}`;
    else day = date;
  }

  for (let i = 0; i < duration - 1; i++) {
    // incremenet by month
    if (dayMonth === "month")
      tmpDay.setMonth(tmpDay.getMonth() + incrementAmount);

    // increment by day
    if (dayMonth === "day") {
      tmpDay.setDate(tmpDay.getDate() + incrementAmount);

      // day will change, so put this inside for-loop
      if (tmpDay.getDate() < 10) day = `0${tmpDay.getDate()}`;
      else day = tmpDay.getDate();
    }

    if (tmpDay.getMonth() + 1 < 10) month = `0${tmpDay.getMonth() + 1}`;
    else month = tmpDay.getMonth() + 1;

    // increment by year
    if (changeYear) {
      year++;
      changeYear = false;
    }

    // next year(only change next year when it's 12-31)
    if (tmpDay.getMonth() === 11 && tmpDay.getDate() === 31) changeYear = true;

    labels.push(`${year}-${month}-${day}`);
  }
}
