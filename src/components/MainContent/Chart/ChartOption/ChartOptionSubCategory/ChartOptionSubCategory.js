import SubTitle from "../../../../UI/SubTitle/SubTitle";
import InputCheckbox from "../../../../UI/InputCheckbox/InputCheckbox";
import style from "./ChartOptionSubCategory.module.css";

function ChartOptionSubCategory(props) {
  function checkboxChangeHandler(e) {
    props.dispatchChartData({
      type: "SUB_CATEGORY",
      value: e.target.value,
      check: e.target.checked,
    });
  }
  return (
    <div className={style.checkbox}>
      <SubTitle className={style["subtitle--time"]}>Select Sub Data</SubTitle>
      <div className={style["checkbox__container"]}>
        {props.category.map((element) => (
          <InputCheckbox
            classContainer={style["input__container"]}
            classCheck={style.check}
            classInput={style.input}
            classLabel={`${style.label} transition--25 capitalize`}
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
