import SubTitle from "../../../../UI/SubTitle/SubTitle";
import InputRadio from "../../../../UI/InputRadio/InputRadio";
import styles from "./ChartOptionMainCategory.module.css";

function ChartOptionMainCategory(props) {
  function changeRadioHandler(e) {
    props.dispatchChartData({ type: "MAIN_CATEGORY", value: e.target.value });
  }

  return (
    <div className={styles.container}>
      <SubTitle
        className={
          props.classColor === "time"
            ? `${styles["subtitle--time"]}`
            : `${styles["subtitle--category"]}`
        }
      >
        Select Data
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
          checked={props.mainCategory === "income"}
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
          checked={props.mainCategory === "expense"}
          onChange={changeRadioHandler}
        />
        {/* Reference 1 */}
        {props.mainType !== "category" && (
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
            checked={props.mainCategory === "net"}
            onChange={changeRadioHandler}
          />
        )}
      </div>
    </div>
  );
}

export default ChartOptionMainCategory;
/*
Referecne 1
When user choose use pie chart to analyze,
don't need to show net income
*/
