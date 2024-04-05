import SubTitle from "../../../../UI/SubTitle/SubTitle";
import InputDate from "../../../../UI/InputDate/InputDate";
import Select from "../../../../UI/Select/Select";
import createDateStringFormat from "../../../../../Others/CreateDateStringFormat/CreateDateStringFormat";
import styles from "./ChartOptionTime.module.css";

function ChartOptionTime(props) {
  function startingDateChangeHandler(e) {
    const endDate = getEndDateByStartAndDuration(props.startingDate, e.target.value);
    props.dispatchChartData({ type: "STARTING_DATE", value: e.target.value });
    props.dispatchChartData({ type: "ENDING_DATE", value: endDate });
  }

  function endingDateChangeHandler(e) {
    props.dispatchChartData({ type: "ENDING_DATE", value: e.target.value });
  }

  function timeDurationChangeHandler(e) {
    const endDate = getEndDateByStartAndDuration(props.startingDate, e.target.value);
    props.dispatchChartData({ type: "TIME_DURATION", value: e.target.value });
    props.dispatchChartData({ type: "ENDING_DATE", value: endDate });
  }

  const minDate =
    props.chartType === "pie" && props.startingDate.length > 1
      ? changeDate(props.startingDate, "next")
      : "";

  const maxDate =
    props.chartType === "pie" && props.endingDate.length > 1
      ? changeDate(props.endingDate, "last")
      : "";

  const startingDate = (
    <div className={styles["time__container"]}>
      <InputDate
        label="starting date"
        name="starting date"
        id="starting date"
        max={maxDate}
        value={props.startingDate}
        onChange={startingDateChangeHandler}
        classInput={styles["time__input"]}
      />
    </div>
  );

  let timeContent;
  if (props.chartType === "pie")
    timeContent = (
      <>
        {startingDate}
        <div className={styles["time__container"]}>
          <InputDate
            label="ending date"
            name="ending date"
            id="ending date"
            min={minDate}
            value={props.endingDate}
            onChange={endingDateChangeHandler}
            classInput={styles["time__input"]}
          />
        </div>
      </>
    );
  else
    timeContent = (
      <>
        {startingDate}
        <div className={styles["time__container"]}>
          <label htmlFor="duration">time duration</label>
          <Select
            id="duration"
            name="duration"
            onChange={timeDurationChangeHandler}
            className={`${styles["time__input"]} ${styles.duration}`}
          >
            <option value="one_week">one week(7days)</option>
            <option value="two_weeks">two weeks(14days)</option>
            <option value="one_month">one month(30days)</option>
            <option value="three_months">three months(90days)</option>
            <option value="six_months">six months(6months)</option>
            <option value="one_year">one year(12months)</option>
          </Select>
        </div>
      </>
    );

  return (
    <div>
      <SubTitle
        className={
          props.chartType === "bar"
            ? `${styles["subtitle--time"]}`
            : `${styles["subtitle--category"]}`
        }
      >
        Select Time
      </SubTitle>
      {timeContent}
    </div>
  );
}

export default ChartOptionTime;

function changeDate(dateStr, type) {
  const date = new Date(dateStr);

  if (type === "next") date.setDate(date.getDate() + 1);
  else date.setDate(date.getDate() - 1);

  return createDateStringFormat(date);
}

function getEndDateByStartAndDuration(startDate, duration) {
  const start = new Date(startDate);

  console.log("sss", start)
  console.log("start", startDate);
  console.log("duration", duration);

  switch (duration) {
    case "one_week":
      start.setDate(start.getDate() + 6);
      break;
    case "two_weeks":
      start.setDate(start.getDate() + 13);
      break;
    case "one_month":
      start.setDate(start.getDate() + 29);
      break;
    case "three_months":
      start.setDate(start.getDate() + 89);
      break;
    case "six_months":
      start.setMonth(start.getMonth() + 5);
      break;
    case "one_year":
      start.setFullYear(start.getFullYear() + 1);
      break;
    default:
  }

  console.log("start", start);

  return createDateStringFormat(start);
}
