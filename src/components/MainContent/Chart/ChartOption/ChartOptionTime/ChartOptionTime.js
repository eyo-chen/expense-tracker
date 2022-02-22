import SubTitle from "../../../../UI/SubTitle/SubTitle";
import InputDate from "../../../../UI/InputDate/InputDate";
import Select from "../../../../UI/Select/Select";
import createDateStringFormat from "../../../../../Others/CreateDateStringFormat/CreateDateStringFormat";
import styles from "./ChartOptionTime.module.css";

function ChartOptionTime(props) {
  function startingDateChangeHandler(e) {
    props.dispatchChartData({ type: "STARTING_DATE", value: e.target.value });
  }

  function endingDateChangeHandler(e) {
    props.dispatchChartData({ type: "ENDING_DATE", value: e.target.value });
  }

  function timeDurationChangeHandler(e) {
    props.dispatchChartData({ type: "TIME_DURATION", value: e.target.value });
  }

  const minDate =
    props.mainType === "category" && props.valueStarting.length > 1
      ? changeDate(props.valueStarting, "next")
      : "";

  const maxDate =
    props.mainType === "category" && props.valueEnding.length > 1
      ? changeDate(props.valueEnding, "last")
      : "";

  const startingDate = (
    <div className={styles["time__container"]}>
      <InputDate
        label="starting date"
        name="starting date"
        id="starting date"
        max={maxDate}
        value={props.valueStarting}
        onChange={startingDateChangeHandler}
        classInput={styles["time__input"]}
      />
    </div>
  );

  let timeContent;
  if (props.optionMainType === "category")
    timeContent = (
      <>
        {startingDate}
        <div className={styles["time__container"]}>
          <InputDate
            label="ending date"
            name="ending date"
            id="ending date"
            min={minDate}
            value={props.valueEnding}
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
            <option value="7">one week(7days)</option>
            <option value="14">two weeks(14days)</option>
            <option value="30">one month(30days)</option>
            <option value="90">three months(90days)</option>
            <option value="6">six months(6months)</option>
            <option value="12">one year(12months)</option>
          </Select>
        </div>
      </>
    );

  return (
    <div>
      <SubTitle
        className={
          props.classColor === "time"
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
