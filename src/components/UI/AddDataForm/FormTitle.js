import InputRadio from "../InputRadio/InputRadio";
import style from "./AddDataForm.module.css";

function FormTitle(props) {
  return (
    <div className={style["title__container"]}>
      <InputRadio
        classInput={style.input}
        classCheck={`${style.expense} ${style.check}`}
        classLabel={`${style.title} uppercase transition--25`}
        label="expense"
        name="title"
        value="expense"
        id="expense"
        onChange={props.categoryChangeHandler}
        checked={props.type === "expense"}
      />
      <InputRadio
        classInput={style.input}
        classCheck={`${style.income} ${style.check}`}
        classLabel={`${style.title} uppercase transition--25`}
        label="income"
        name="title"
        value="income"
        id="income"
        onChange={props.categoryChangeHandler}
        checked={props.type === "income"}
      />
    </div>
  );
}

export default FormTitle;
