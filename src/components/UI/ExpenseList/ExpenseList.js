import { Fragment } from "react";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

function ExpenseList(props) {
  const expenseItem = props.data.map((expense, i) => (
    <Fragment key={expense.id}>
      <ExpenseItem
        type={expense.type}
        mainCategory={expense.mainCategory}
        subCategory={expense.subCategory}
        time={expense.time}
        year={expense.year}
        month={expense.month}
        day={expense.day}
        description={expense.description}
        price={expense.price}
        id={expense.id}
        modal={props.modal}
        inDeleteSection={props.inDeleteSection}
        classItem={props.classItemSearch}
      />
      {i === props.data.length - 1 || (
        <hr
          className={
            props.classItemSearch
              ? `${styles["item__line"]} ${styles["item__line--long"]}`
              : `${styles["item__line"]}`
          }
        />
      )}
    </Fragment>
  ));

  return (
    <div className={`${styles.item} ${props.classItem}`}>
      <ul className={styles["item__container"]}>{expenseItem}</ul>
    </div>
  );
}

export default ExpenseList;
