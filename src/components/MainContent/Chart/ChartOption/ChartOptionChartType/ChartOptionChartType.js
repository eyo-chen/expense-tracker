import InputRadio from "../../../../UI/InputRadio/InputRadio";
import styles from "./ChartOptionChartType.module.css";

function ChartOptionChartType(props) {
  function changeRadioHandler(e) {
    props.dispatchChartData({ type: "MAIN_TYPE", value: e.target.value });
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
        id="time"
        name="chart"
        value="time"
        label="time"
        checked={props.mainType === "time"}
      />
      <InputRadio
        classContainer={styles["radio__container"]}
        classInput={styles.input}
        classLabel={`${styles["label--category"]} ${styles.label} transition--25 uppercase`}
        classCheck={styles.check}
        onChange={changeRadioHandler}
        id="category"
        name="chart"
        value="category"
        label="category"
        checked={props.mainType === "category"}
      />
    </div>
  );
}

export default ChartOptionChartType;
