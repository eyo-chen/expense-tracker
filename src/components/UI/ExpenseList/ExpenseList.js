import { Fragment } from "react";
import style from "./ExpenseList.module.css";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

import { v4 as uuidv4 } from "uuid";

function ExpenseList(props) {
  const expenseItem = props.data.map((expense, i) => (
    <Fragment key={uuidv4()}>
      <ExpenseItem
        category={expense.category}
        mainCate={expense.mainCate}
        subCate={expense.subCate}
        time={expense.time}
        description={expense.description}
        price={expense.price}
        newDescription={props.description || undefined}
        modal={props.modal}
        id={expense.id}
        // expenseDataModal={props.expenseDataModal} (not sure what this is about)
        expenseListCalendar={props.expenseListCalendar}
        setExpenseListCalendar={props.setExpenseListCalendar}
        inDeleteSection={props.inDeleteSection}
      />
      {i === props.data.length - 1 || <hr className={style["item__line"]} />}
    </Fragment>
  ));

  return (
    <div className={`${style.item} ${props.classItem}`}>
      <ul className={style["item__container"]}>{expenseItem}</ul>
    </div>
  );
}

export default ExpenseList;
