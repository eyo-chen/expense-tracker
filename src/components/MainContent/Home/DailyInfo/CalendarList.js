import style from "./CalendarList.module.css";

function CalendarList(props) {
  function clickDateHandler(e) {
    props.setDailyExpenseListState(e.target.dataset.id);

    props.setSelectDate(e.target.dataset.id);
  }

  return (
    <div>
      <p className={style["calendar__day--text"]}>{props.weekDay}</p>
      <div
        onClick={clickDateHandler}
        data-id={props.dateObj}
        className={`${style["calendar__day--number"]} ${
          props.animation ? `${style.bump}` : ""
        }  ${props.active ? `${style.active}` : ""} ${
          props.selected ? `${style.selected}` : ""
        }`}
      >
        {props.monthDay}
      </div>
    </div>
  );
}

export default CalendarList;
