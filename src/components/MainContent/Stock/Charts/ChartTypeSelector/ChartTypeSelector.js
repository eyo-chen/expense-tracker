import styles from "./ChartTypeSelector.module.css";

const STOCK_CHART_TYPES = [
  { id: "portfolio", label: "Portfolio Value" },
  { id: "performance", label: "Performance" },
  { id: "allocation", label: "Allocation" },
  { id: "gainloss", label: "Gain/Loss" }
];

function ChartTypeSelector(props) {
  function chartTypeClickHandler(e) {
    props.setActiveChartType(e.target.dataset.id);
  }

  const chartTypes = STOCK_CHART_TYPES.map((type) => (
    <button
      key={type.id}
      onClick={chartTypeClickHandler}
      data-id={type.id}
      className={`${styles.chartType} ${
        props.activeChartType === type.id
          ? `${styles.active}`
          : ""
      } transition--25`}
    >
      {type.label}
    </button>
  ));

  return (
    <div className={styles.chartTypeSelector}>
      <div className={styles.chartTypes}>
        {chartTypes}
      </div>
    </div>
  );
}

export default ChartTypeSelector;