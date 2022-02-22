import SubTitle from "../../../../UI/SubTitle/SubTitle";
import InputCheckbox from "../../../../UI/InputCheckbox/InputCheckbox";
import styles from "./ChartOptionSubCategory.module.css";

function ChartOptionSubCategory(props) {
  function checkboxChangeHandler(e) {
    props.dispatchChartData({
      type: "SUB_CATEGORY",
      value: e.target.value,
      check: e.target.checked,
    });
  }
  return (
    <div className={styles.checkbox}>
      <SubTitle className={styles["subtitle--time"]}>Select Sub Data</SubTitle>
      <div className={styles["checkbox__container"]}>
        {props.category.map((element) => (
          <InputCheckbox
            classContainer={styles["input__container"]}
            classCheck={styles.check}
            classInput={styles.input}
            classLabel={`${styles.label} transition--25 capitalize`}
            key={element}
            id={element}
            label={element}
            value={element}
            defaultChecked={true}
            onChange={checkboxChangeHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default ChartOptionSubCategory;
