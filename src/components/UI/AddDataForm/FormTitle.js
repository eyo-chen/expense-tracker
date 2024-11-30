import InputRadio from "../InputRadio/InputRadio";
import styles from "./AddDataForm.module.css";

function FormTitle(props) {
  const expenseTitle = (
    <InputRadio
      classInput={styles.input}
      classCheck={`${styles.expense} ${styles.check}`}
      classLabel={`${styles.title} uppercase transition--25`}
      label="expense"
      name="title"
      value="expense"
      id="expense"
      onChange={props.categoryChangeHandler}
      checked={props.type === "expense"}
      disabled={props.disabled}
    />
  );

  const incomeTitle = (
    <InputRadio
      classInput={styles.input}
      classCheck={`${styles.income} ${styles.check}`}
      classLabel={`${styles.title} uppercase transition--25`}
      label="income"
      name="title"
      value="income"
      id="income"
      onChange={props.categoryChangeHandler}
      checked={props.type === "income"}
      disabled={props.disabled}
    />
  );

  // when it's adding new data, we show both expense and income title
  let titleContent = (
    <>
      {expenseTitle}
      {incomeTitle}
    </>
  )

  // when it's editing data, we show only the title of the data type
  if (props.isEditing && props.type === "expense") {
    titleContent = (
      <>
        {expenseTitle}
      </>
    )
  }

  // when it's editing data, we show only the title of the data type
  if (props.isEditing && props.type === "income") {
    titleContent = (
      <>
        {incomeTitle}
      </>
    )
  }


  return (
    <div className={styles["title__container"]}>{titleContent}</div>
  );
}

export default FormTitle;
