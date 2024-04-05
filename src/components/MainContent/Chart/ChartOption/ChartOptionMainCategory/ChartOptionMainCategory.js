import SubTitle from "../../../../UI/SubTitle/SubTitle";
import InputCheckbox from "../../../../UI/InputCheckbox/InputCheckbox";
import styles from "./ChartOptionMainCategory.module.css";

function ChartOptionMainCategory(props) {
  function checkboxChangeHandler(e) {
    props.dispatchChartData({
      type: "SELECTED_MAIN_CATEGORY_IDS",
      value: Number(e.target.value),
      checked: e.target.checked,
    });
  }
  return (
    <div className={styles.checkbox}>
      <SubTitle className={styles["subtitle--time"]}>
        select main category
      </SubTitle>
      <div className={styles["checkbox__container"]}>
        {props.mainCategoryList.map(({id, name}) => (
          <InputCheckbox
            classContainer={styles["input__container"]}
            classCheck={styles.check}
            classInput={styles.input}
            classLabel={`${styles.label} transition--25 capitalize`}
            key={id} // Reference 1
            id={id}
            label={name}
            value={id}
            defaultChecked={true}
            onChange={checkboxChangeHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default ChartOptionMainCategory;
