import createDateStringFormat from "../CreateDateStringFormat/CreateDateStringFormat";
/*
the main purpose of this function (standard labels)(2021-11-08)
is for adding(accumulating) the total amount within valid range 
*/
function createStandardLabelsArr(duration, startingDate) {
  // the value will be mutated by helper function
  const startingDateLocal = new Date(startingDate);

  switch (duration) {
    case "7":
      return createStandardLabelsArrHelper(7, 1, "day", startingDateLocal);
    case "14":
      return createStandardLabelsArrHelper(14, 1, "day", startingDateLocal);
    case "30":
      return createStandardLabelsArrHelper(30, 1, "day", startingDateLocal);
    case "90":
      return createStandardLabelsArrHelper(30, 3, "day", startingDateLocal);
    case "6":
      return createStandardLabelsArrHelper(6, 1, "month", startingDateLocal);
    case "12":
      return createStandardLabelsArrHelper(12, 1, "month", startingDateLocal);
  }
}

export default createStandardLabelsArr;

function createStandardLabelsArrHelper(
  duration,
  incrementAmount,
  dayMonth,
  today
) {
  const labels = [];

  /*
  note that it will immediately increment the number of day
  in the first for-loop
  so have to add the very first day
  for example, today is 2021-11-21, and time duration is 7
  what we want is an array [21, 22, 23, 24, 25, 26, 27]
  which means 21 is inclusive
  */
  labels.push(createDateStringFormat(today));

  for (let i = 0; i < duration - 1; i++) {
    // incremenet by month
    if (dayMonth === "month")
      today.setMonth(today.getMonth() + incrementAmount);

    // increment by day
    if (dayMonth === "day") {
      today.setDate(today.getDate() + incrementAmount);
    }

    labels.push(createDateStringFormat(today));
  }

  return labels;
}
