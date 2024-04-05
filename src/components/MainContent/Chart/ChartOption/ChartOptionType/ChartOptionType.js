import SubTitle from "../../../../UI/SubTitle/SubTitle";
import InputRadio from "../../../../UI/InputRadio/InputRadio";
import styles from "./ChartOptionType.module.css";

function ChartOptionType(props) {
  function changeRadioHandler(e) {
    props.dispatchChartData({ type: "TYPE", value: e.target.value });
  }

  return (
    <div className={styles.container}>
      <SubTitle
        className={
          props.chartType === "bar"
            ? `${styles["subtitle--time"]}`
            : `${styles["subtitle--category"]}`
        }
      >
        select type
      </SubTitle>
      <div className={styles["input__container"]}>
        <InputRadio
          classContainer={styles["radio__container"]}
          classCheck={`${styles.check} center--flex`}
          classLabel={`${styles.label} capitalize`}
          classInput={styles.input}
          classInside={styles.inside}
          value="income"
          id="income"
          name="data"
          label="income"
          checked={props.type === "income"}
          onChange={changeRadioHandler}
        />
        <InputRadio
          classContainer={styles["radio__container"]}
          classCheck={`${styles.check} center--flex`}
          classLabel={`${styles.label} capitalize`}
          classInput={styles.input}
          classInside={styles.inside}
          value="expense"
          id="expense"
          name="data"
          label="expense"
          checked={props.type === "expense"}
          onChange={changeRadioHandler}
        />
        {/* Reference 1 */}
        {props.chartType !== "pie" && (
          <InputRadio
            classContainer={styles["radio__container"]}
            classCheck={`${styles.check} center--flex`}
            classLabel={`${styles.label} capitalize`}
            classInput={styles.input}
            classInside={styles.inside}
            value="net"
            id="net"
            name="data"
            label="net income"
            checked={props.type === "net"}
            onChange={changeRadioHandler}
          />
        )}
      </div>
    </div>
  );
}

export default ChartOptionType;
/*
Referecne 1
When user choose use pie chart to analyze,
don't need to show net income
*/
