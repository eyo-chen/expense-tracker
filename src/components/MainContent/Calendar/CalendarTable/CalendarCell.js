import styles from "./CalendarCell.module.css";

function CalendarCell(props) {
  let classNameContainer = `${styles.cell} center--flex`;
  classNameContainer += !props.curMonthIndex ? " " + styles.negative : "";
  classNameContainer += props.todayIndex ? " " + styles.current : "";

  return (
    <div
      aria-label={props.children}
      tabIndex="0"
      onClick={props.onClick}
      className={classNameContainer}
      data-id={props.dataID}
    >
      {props.children}
      {props.curMonthIndex && (
        <div className={styles["dot__container"]}>
          {props.expenseIndex && (
            <span className={`${styles["dot--blue"]} ${styles.dot}`}></span>
          )}
          {props.incomeIndex && (
            <span className={`${styles["dot--pink"]} ${styles.dot}`}></span>
          )}
          {props.bothIndex && (
            <>
              <span className={`${styles["dot--blue"]} ${styles.dot}`}></span>
              <span className={`${styles["dot--pink"]} ${styles.dot}`}></span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarCell;
