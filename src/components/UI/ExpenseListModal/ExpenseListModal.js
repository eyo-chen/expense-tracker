import style from "./ExpenseListModal.module.css";
import ExpenseList from "../ExpenseList/ExpenseList";
import SubTitle from "../SubTitle/SubTitle";
import Button from "../Button/Button";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Modal from "../Modal/Modal";

function ExpenseListModal(props) {
  let scrollClassName = null;
  if (props.expenseDataList.length > 6) scrollClassName = "scroll";

  function backClickHandler() {
    props.expenseListModalToggler();
  }

  function addClickHandler() {
    props.expenseListModalToggler();
    props.addDataFormModalToggler();
  }

  let mainContent =
    props.expenseDataList.length === 0 ? (
      <SubTitle className={style.noData}>no data</SubTitle>
    ) : (
      <ExpenseList
        classItem={
          scrollClassName
            ? `${style.expenseList} ${style[scrollClassName]}`
            : `${style.expenseList}`
        }
        data={props.expenseDataList}
        modal={true}
        inDeleteSection={false}
      />
    );

  return (
    <Modal classModal={style.modal}>
      <SubTitle className={style.title}>{props.selectedDate}</SubTitle>
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
