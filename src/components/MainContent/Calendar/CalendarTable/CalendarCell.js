import style from "./CalendarCell.module.css";

function CalendarCell(props) {
  let classNameContainer = `${style.cell} center--flex`;
  classNameContainer += !props.curMonthIndex ? " " + style.negative : "";
  classNameContainer += props.todayIndex ? " " + style.current : "";

  return (
    <div
      onClick={props.onClick}
      className={classNameContainer}
      data-id={props.dataID}
    >
      {props.children}
      {props.curMonthIndex && (
        <div className={style["dot__container"]}>
          {props.expenseIndex && (
            <span className={`${style["dot--blue"]} ${style.dot}`}></span>
          )}
          {props.incomeIndex && (
            <span className={`${style["dot--pink"]} ${style.dot}`}></span>
          )}
          {props.bothIndex && (
            <>
              <span className={`${style["dot--blue"]} ${style.dot}`}></span>
              <span className={`${style["dot--pink"]} ${style.dot}`}></span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarCell;
