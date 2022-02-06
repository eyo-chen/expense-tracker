import InputRadio from "../../../../UI/InputRadio/InputRadio";
import style from "./SettingCategory.module.css";

function SettingType(props) {
  // expense & income
  function typeChangeHandler(e) {
    props.categoryStateDispatch({ type: "TYPE", value: e.target.value });
  }

  return (
    <div className={style.category}>
      <InputRadio
        classContainer={style["radio__container"]}
        classInput={style.input}
        classLabel={`${style.labelBlue} ${style.label}`}
        classCheck={style.check}
        id="expense"
        name="category"
        value="expense"
        label="expense"
        checked={props.category === "expense"}
        onChange={typeChangeHandler}
      />
      <InputRadio
        classContainer={style["radio__container"]}
        classInput={style.input}
        classLabel={`${style.labelPink} ${style.label}`}
        classCheck={style.check}
        id="income"
        name="category"
        value="income"
        label="income"
        checked={props.category === "income"}
        onChange={typeChangeHandler}
      />
    </div>
  );
}

export default SettingType;
