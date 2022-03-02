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
      <SubTitle className={styles["subtitle--time"]}>
        select main category
      </SubTitle>
      <div className={styles["checkbox__container"]}>
        {props.category.map((element) => (
          <InputCheckbox
            classContainer={styles["input__container"]}
            classCheck={styles.check}
            classInput={styles.input}
            classLabel={`${styles.label} transition--25 capitalize`}
            key={element + props.type} // Reference 1
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
/*
Reference 1
This is important
Because both income and expense may have same categoryName
For example, "others"
If we simply use categoryName as key
Now both income and expense both have same state(checked or unchecked)

For example,
user first uncheked the "others" in expense, and move on to income
Now user should expect "others" in income is checked
However,
"others" in income is unchecked
because both "others" of income and expense share the same state

In order to avoid that, we use element + props.type as key
make sure every key is unique
*/
