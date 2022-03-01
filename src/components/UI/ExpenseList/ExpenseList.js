import { Fragment, useState } from "react";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

function ExpenseList(props) {
  const [btnMore, setBtnMore] = useState(
    new Array(props.data.length).fill(false)
  );

  function btnMoreToggler(e) {
    if (!e) {
      setBtnMore(btnMore.map((_) => false));
      return;
    }
    const id = Number(e.target.dataset.id);

    if (props.data.length > btnMore.length) {
      setBtnMore(props.data.map((_, index) => (index === id ? true : false)));
      return;
    }

    const clickingBtnMore = btnMore.find((_, index) => index === id);

    if (clickingBtnMore) {
      setBtnMore(btnMore.map((_) => false));
    } else {
      setBtnMore(btnMore.map((_, index) => (index === id ? true : false)));
    }
  }

  // function
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
        index={i}
        btnMoreToggler={btnMoreToggler}
        btnMoreIndex={btnMore[i]}
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
