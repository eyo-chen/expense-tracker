import InputRadio from "../../../../UI/InputRadio/InputRadio";
import style from "./SettingCategory.module.css";

function SettingType(props) {
  function typeChangeHandler(e) {
    props.categoryStateDispatch({ type: "TYPE", value: e.target.value });
  }

  return (
    <div className={style.type}>
      <InputRadio
        classContainer={style["radio__container"]}
        classInput={style.input}
        classLabel={`${style["label--blue"]} ${style.label} uppercase transition--25`}
        classCheck={style.check}
        id="expense"
        name="type"
        value="expense"
        label="expense"
        checked={props.type === "expense"}
        onChange={typeChangeHandler}
      />
      <InputRadio
        classContainer={style["radio__container"]}
        classInput={style.input}
        classLabel={`${style["label--pink"]} ${style.label} uppercase transition--25`}
        classCheck={style.check}
        id="income"
        name="type"
        value="income"
        label="income"
        checked={props.type === "income"}
        onChange={typeChangeHandler}
      />
    </div>
  );
}

export default SettingType;
