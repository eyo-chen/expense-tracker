import InputRadio from "../InputRadio/InputRadio";

function FormTitle(props) {
  return (
    <div className={props.classNameContainer}>
      <InputRadio
        classInput={props.classNameInput}
        classCheck={`${props.classNameExpense} ${props.classNameCheck}`}
        classLabel={props.classNameTitle}
        label="expense"
        name="title"
        value="expense"
        id="expense"
        onChange={props.categoryChangeHandler}
        checked={props.category === "expense"}
      />
      <InputRadio
        classInput={props.classNameInput}
        classCheck={`${props.classNameIncome} ${props.classNameCheck}`}
        classLabel={props.classNameTitle}
        label="income"
        name="title"
        value="income"
        id="income"
        onChange={props.categoryChangeHandler}
        checked={props.category === "income"}
      />
    </div>
  );
}

export default FormTitle;
