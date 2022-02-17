import { Fragment } from "react";
import style from "./ExpenseList.module.css";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

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
              ? `${style["item__line"]} ${style["item__line--long"]}`
              : `${style["item__line"]}`
          }
        />
      )}
    </Fragment>
  ));

  return (
    <div className={`${style.item} ${props.classItem}`}>
      <ul className={style["item__container"]}>{expenseItem}</ul>
    </div>
  );
}

export default ExpenseList;
