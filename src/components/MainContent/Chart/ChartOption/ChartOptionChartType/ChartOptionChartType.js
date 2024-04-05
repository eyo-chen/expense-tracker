import InputRadio from "../../../../UI/InputRadio/InputRadio";
import styles from "./ChartOptionChartType.module.css";

function ChartOptionChartType(props) {
  function changeRadioHandler(e) {
    props.dispatchChartData({ type: "CHART_TYPE", value: e.target.value });
  }

  return (
    <div className={styles.container}>
      <InputRadio
        classContainer={styles["radio__container"]}
        classInput={styles.input}
        classLabel={`${styles["label--time"]} ${styles.label} transition--25 uppercase`}
        classCheck={styles.check}
        classInside={styles.inside}
        onChange={changeRadioHandler}
        id="bar"
        name="chart"
        value="bar"
        label="time"
        checked={props.chartType === "bar"}
      />
      <InputRadio
        classContainer={styles["radio__container"]}
        classInput={styles.input}
        classLabel={`${styles["label--category"]} ${styles.label} transition--25 uppercase`}
        classCheck={styles.check}
        onChange={changeRadioHandler}
        id="pie"
        name="chart"
        value="pie"
        label="category"
        checked={props.chartType === "pie"}
      />
    </div>
  );
}

export default ChartOptionChartType;
