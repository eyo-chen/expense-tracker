import createWeeklyData from "../createWeeklyData";
import createDateStringFormat from "../CreateDateStringFormat/CreateDateStringFormat";
import timeObj from "../../components/assets/timeObj/timeObj";

function createAccountCardPreData(type) {
  const { TODAY } = timeObj;

  if (type === "week") {
    const labels = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];

    const weeklyDataArr = createWeeklyData(TODAY);
    const startingDate = weeklyDataArr[0];
    const endingDate = weeklyDataArr[weeklyDataArr.length - 1];

    const startingDateString = createDateStringFormat(startingDate.dateObj);
    const endingDateString = createDateStringFormat(endingDate.dateObj);

    return [
      startingDate.dateObj,
      endingDate.dateObj,
      startingDateString,
      endingDateString,
      labels,
    ];
  } else {
    const startingDateObj = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    const endingDateObj = new Date(
      TODAY.getFullYear(),
      TODAY.getMonth() + 1,
      0
    );

    const startingDateString = createDateStringFormat(startingDateObj);
    const endingDateString = createDateStringFormat(endingDateObj);

    return [
      startingDateObj,
      endingDateObj,
      startingDateString,
      endingDateString,
    ];
  }
}

export default createAccountCardPreData;
