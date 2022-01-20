import style from "./ExpenseListModal.module.css";
import ExpenseList from "../ExpenseList/ExpenseList";
import SubTitle from "../SubTitle/SubTitle";
import Button from "../Button/Button";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Modal from "../Modal/Modal";

function ExpenseListModal(props) {
  let time;
  let noData = false;

  // if expenseListCalendar is string, it means there's no data
  // and expenseListCalendar will be the right time
  if (typeof props.expenseListCalendar === "string") {
    time = props.expenseListCalendar;
    noData = true;
  } else time = props.expenseListCalendar[0].time;

  let scrollClassName = null;
  if (props.expenseListCalendar.length > 6) scrollClassName = "scroll";

  function backClickHandler() {
    props.closeModalHandler();
  }

  function addClickHandler() {
    props.closeModalHandler();
    props.showAddDataFormHandler(time);
  }

  let mainContent = noData ? (
    <SubTitle className={style.noData}>no data</SubTitle>
  ) : (
    <ExpenseList
      classItem={
        scrollClassName
          ? `${style.expenseList} ${style[scrollClassName]}`
          : `${style.expenseList}`
      }
      data={props.expenseListCalendar}
      modal={true}
      expenseListCalendar={props.expenseListCalendar}
      setExpenseListCalendar={props.setExpenseListCalendar}
    />
  );

  return (
    <Modal classModal={style.modal}>
      <SubTitle className={style.title}>{time}</SubTitle>
      <HorizontalLine />
      <div className={style["expenseList__container"]}>{mainContent}</div>

      <div className={style["btn__container"]}>
        <Button onClick={backClickHandler} type="button" className={style.btn}>
          back
        </Button>

        <Button onClick={addClickHandler} type="button" className={style.btn}>
          add data
        </Button>
      </div>
    </Modal>
  );
}

export default ExpenseListModal;

/* <ExpenseList data={expenseDataCtx.EXPENSE_DATA} /> */
