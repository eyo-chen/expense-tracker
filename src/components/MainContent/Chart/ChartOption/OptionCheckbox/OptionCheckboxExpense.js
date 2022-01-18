import SubTitle from "../../../../UI/SubTitle/SubTitle";
import InputCheckbox from "../../../../UI/InputCheckbox/InputCheckbox";
import style from "./OptionCheckbox.module.css";

function OptionCheckboxExpense(props) {
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
        {props.categoryExpense.map((expense) => (
          <InputCheckbox
            classContainer={style["input__container"]}
            classCheck={style.check}
            classInput={style.input}
            classLabel={style.label}
            key={expense}
            id={expense}
            label={`${expense.substr(0, 1).toUpperCase()}${expense.substr(
              1,
              expense.length - 1
            )}`}
            value={expense}
            defaultChecked={true}
            onChange={checkboxChangeHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default OptionCheckboxExpense;
