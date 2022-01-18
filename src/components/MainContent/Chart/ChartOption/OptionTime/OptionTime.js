import { Fragment } from "react";
import { AiFillWarning } from "react-icons/ai";
import SubTitle from "../../../../UI/SubTitle/SubTitle";
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

  let startingDate = (
    <div className={style["time__container"]}>
      <label>starting date</label>
      <input
        className={style["time__input"]}
        onChange={startingDateChangeHandler}
        type="date"
        value={props.valueStarting}
      />
    </div>
  );

  let timeContent;

  // Note that only show the warning icon when
  // 1. user has already choose both starting date and ending date
  // 2. user choose the wrong order of the date
  if (props.optionMainData === "category")
    timeContent = (
      <Fragment>
        {startingDate}
        <div className={style["time__container"]}>
          <label>ending date</label>
          <div className={style["ending__container"]}>
            <input
              className={style["time__input"]}
              onChange={endingDateChangeHandler}
              type="date"
              value={props.valueEnding}
            />
            {props.timeValidIndex && !props.timeOrderValidIndex && (
              <div className={style.btn}>
                <AiFillWarning title="warning" className={style.warning} />
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  else
    timeContent = (
      <Fragment>
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
      </Fragment>
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
