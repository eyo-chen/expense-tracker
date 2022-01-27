import SubTitle from "../../../../UI/SubTitle/SubTitle";
import Warning from "../../../../UI/Warning/Warning";
import InputDate from "../../../../UI/InputDate/InputDate";
import Select from "../../../../UI/Select/Select";
import createDateStringFormat from "../../../../../Others/CreateDateStringFormat/CreateDateStringFormat";
import style from "./OptionTime.module.css";

function OptionTime(props) {
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
    <div className={style["time__container"]}>
      <InputDate
        label="starting date"
        name="starting date"
        id="starting date"
        max={maxDate}
        value={props.valueStarting}
        onChange={startingDateChangeHandler}
        classNameInput={style["time__input"]}
      />
    </div>
  );

  // Note that only show the warning icon when
  // 1. user has already choose both starting date and ending date
  // 2. user choose the wrong order of the date
  const invalidIndex = props.timeValidIndex && !props.timeOrderValidIndex;

  let timeContent;
  if (props.optionMainData === "category")
    timeContent = (
      <>
        {startingDate}
        <div
          className={
            invalidIndex
              ? `${style["time__container"]} ${style["time__container--ending"]}`
              : `${style["time__container"]}`
          }
        >
          <InputDate
            label="ending date"
            name="ending date"
            id="ending date"
            min={minDate}
            value={props.valueEnding}
            onChange={endingDateChangeHandler}
            classInput={
              invalidIndex
                ? `${style["time__input"]} ${style["time__input--invalid"]}`
                : `${style["time__input"]}`
            }
          />
          <Warning className={style.warning} index={invalidIndex}>
            ending date should be greater than starting date
          </Warning>
        </div>
      </>
    );
  else
    timeContent = (
      <>
        <div className={style["time__container"]}>
          <label>time duration</label>
          <select
            onChange={timeDurationChangeHandler}
            className={style["time__input"]}
          >
            <option value="7">one week(7days)</option>
            <option value="14">two weeks(14days)</option>
            <option value="30">one month(30days)</option>
            <option value="90">three months(90days)</option>
            <option value="6">six months(6months)</option>
            <option value="12">one year(12months)</option>
          </select>
        </div>
        {startingDate}
      </>
    );

  return (
    <div className={style.time}>
      <SubTitle
        className={
          props.classColor === "time"
            ? `${style["subTitle--blue"]}`
            : `${style["subTitle--green"]}`
        }
      >
        Select Time
      </SubTitle>
      {timeContent}
    </div>
  );
}

export default OptionTime;

function changeDate(dateStr, type) {
  const date = new Date(dateStr);

  if (type === "next") date.setDate(date.getDate() + 1);
  else date.setDate(date.getDate() - 1);

  return createDateStringFormat(date);
}
