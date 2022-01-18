import InputCheckbox from "../../../../UI/InputCheckbox/InputCheckbox";
import style from "./OptionCheckbox.module.css";
import SubTitle from "../../../../UI/SubTitle/SubTitle";

function OptionCheckboxIncome(props) {
  function checkboxChangeHandler(e) {
    props.dispatchChartData({
      type: "SUB_CATEGORY",
      value: e.target.value,
      check: e.target.checked,
    });
  }

  return (
    <div className={style.checkbox}>
      <SubTitle className={style["subTitle--blue"]}>Select Sub Data</SubTitle>

      <div className={style["checkbox__container"]}>
        {props.categoryIncome.map((income) => (
          <InputCheckbox
            classContainer={style["input__container"]}
            classCheck={style.check}
            classInput={style.input}
            classLabel={style.label}
            id={income}
            key={income}
            label={`${income.substr(0, 1).toUpperCase()}${income.substr(
              1,
              income.length - 1
            )}`}
            value={income}
            defaultChecked={true}
            onChange={checkboxChangeHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default OptionCheckboxIncome;
