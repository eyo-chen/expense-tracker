import style from "./WeeklyCalendarList.module.css";

function WeeklyCalendarList(props) {
  function clickDateHandler(e) {
    const dateID = e.target.dataset.id;

    props.setSelectedDate(dateID);
  }

  // NOTE: need white space to seprate differnt className
  let className = `${style.date} center--flex transition--25 `;
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

export default WeeklyCalendarList;
