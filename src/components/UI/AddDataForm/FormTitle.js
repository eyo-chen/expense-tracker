import InputRadio from "../InputRadio/InputRadio";

function FormTitle(props) {
  return (
    <div className={props.classContainer}>
      <InputRadio
        classInput={props.classInput}
        classCheck={`${props.classExpense} ${props.classCheck}`}
        classLabel={props.classTitle}
        label="expense"
        name="title"
        value="expense"
        id="expense"
        onChange={props.categoryChangeHandler}
        checked={props.category === "expense"}
      />
      <InputRadio
        classInput={props.classInput}
        classCheck={`${props.classIncome} ${props.classCheck}`}
        classLabel={props.classTitle}
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
