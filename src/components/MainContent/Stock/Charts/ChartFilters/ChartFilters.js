import styles from "./ChartFilters.module.css";

const TIME_PERIODS = [
  { id: "6M", label: "6 Months" },
  { id: "9M", label: "9 Months" },
  { id: "12M", label: "12 Months" },
  { id: "1Y", label: "1 Year" },
  { id: "2Y", label: "2 Years" },
  { id: "3Y", label: "3 Years" },
  { id: "ALL", label: "All Time" }
];

function ChartFilters(props) {
  function timePeriodClickHandler(e) {
    props.setTimePeriod(e.target.dataset.id);
  }

  const timePeriods = TIME_PERIODS.map((period) => (
    <button
      key={period.id}
      onClick={timePeriodClickHandler}
      data-id={period.id}
      className={`${styles.filterButton} ${props.timePeriod === period.id
          ? `${styles.active}`
          : ""
        } transition--25`}
    >
      {period.label}
    </button>
  ));

  return (
    <div className={styles.chartFilters}>
      <div className={styles.filterGroup}>
        <div className={styles.filterButtons}>
          {timePeriods}
        </div>
      </div>
    </div>
  );
}

export default ChartFilters;