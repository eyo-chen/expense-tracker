import { Fragment, useState } from "react";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

function ExpenseList(props) {
  const [btnMore, setBtnMore] = useState(
    new Array(props.dataList.length).fill(false)
  );

  function btnMoreToggler(e) {
    // e is undefined -> edit or delete the data
    if (!e) {
      if (props.dataList.length !== btnMore.length)
        setBtnMore(props.data.map((_) => false));
      else setBtnMore(btnMore.map((_) => false));
      return;
    }

    // the data is clicking the more btn
    const id = Number(e.target.dataset.id);

    // the case when after adding the new data
    // make sure updating the length of btnMore at the same time
    if (props.dataList.length > btnMore.length) {
      setBtnMore(props.dataList.map((_, index) => (index === id ? true : false)));
      return;
    }

    // find the current state of the clicking data of more button
    // for example, now the state of click button is ture or false(open or not open)
    const clickingBtnMore = btnMore.find((_, index) => index === id);

    // it's open, close all the more button
    if (clickingBtnMore) {
      setBtnMore(btnMore.map((_) => false));
    }
    // it's close, open this more button, but close all other more buttons at the same time
    else {
      setBtnMore(btnMore.map((_, index) => (index === id ? true : false)));
    }
  }

  console.log("props.modal", props.modal);

  // function
  const expenseItem = props.dataList.map((e, i) => (
    <Fragment key={e.id}>
      <ExpenseItem
        id={e.id}
        type={e.main_category.type}
        mainCategory={e.main_category}
        subCategory={e.sub_category}
        date={e.date}
        price={e.price}
        note={e.note}
        modal={props.modal}
        inDeleteSection={props.inDeleteSection}
        classItem={props.classItemSearch}
        index={i}
        btnMoreToggler={btnMoreToggler}
        btnMoreIndex={btnMore[i]}
      />
      {i === props.dataList.length - 1 || (
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
