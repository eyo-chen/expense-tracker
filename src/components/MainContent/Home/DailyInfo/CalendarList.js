import style from "./CalendarList.module.css";

function CalendarList(props) {
  function clickDateHandler(e) {
    const dateID = e.target.dataset.id;

    props.setDailyExpenseData(dateID); // data list
    props.setSelectedDate(dateID); // weekly calendar
  }

  // need white space to seprate differnt className
  let className = `${style.date} center--flex `;
  className += props.active ? `${style.active} ` : `${style["date--others"]} `;
  className += props.selected ? `${style.selected} ` : "";

  return (
    <div>
      <p className={style.day}>{props.weekDay}</p>
      <div
        onClick={clickDateHandler}
        data-id={props.dateObj}
        className={className}
      >
        {props.monthDay}
      </div>
    </div>
  );
}

export default CalendarList;
