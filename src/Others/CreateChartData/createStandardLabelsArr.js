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
    default:
      return;
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

  // Reference 1
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

  // Reference 2
  if (dayMonth === "month") {
    today.setMonth(today.getMonth() + incrementAmount);
    labels.push(createDateStringFormat(today));
  }

  return labels;
}
/*
Reference 1

note that it will immediately increment the number of day
in the first for-loop
so have to add the very first day
for example, today is 2021-11-21, and time duration is 7
what we want is an array [21, 22, 23, 24, 25, 26, 27]
which means 21 is inclusive
*/

/*
Reference 2

This is important
When type is "day"
use compareTime helper function
When type is "month"
use compareTimeWithRange helper function
  
compareTimeWithRange needs two arguments (firstDate, endDate)
which means when type is "month"
for each part of accumulated data, we need two different date
for example, when user want to filter 6 months data, and startingDate is "2022-01-02"
standardLabels =
["2022-01-02", "2022-02-02", "2022-03-02", "2022-04-02", "2022-05-02", "2022-06-02", "2022-07-02"]
Finally, we only want 6 length data
In order to get that 6 data, we need 7 length standardLabels
"2022-01-02", "2022-02-02" -> create first part data
"2022-02-02", "2022-03-02" -> create second part data
"2022-03-02", "2022-04-02" -> create third part data
....
"2022-06-02", "2022-07-02" -> create final part data

as we could see, that's the reason to have one more data when type is "month"
*/
