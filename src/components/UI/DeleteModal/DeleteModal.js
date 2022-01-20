import { useContext } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import Button from "../Button/Button";
import style from "./DeleteModal.module.css";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import SearchListDataContext from "../../../store/searchListData/searchListData--context";

/*
There are three different places need DeleteModal component
1. Home
2. Calendar List Modal
3. Search List
So we need different function to handle the data once user delete the data

Note that DeleteModal only from "DeleteModal" because there's only way to show this modal
*/
function DeleteModal(props) {
  const { removeExpenseData } = useContext(ExpenseDataContext);
  const { setFilteredData } = useContext(SearchListDataContext);

  function closeDeleteModal() {
    props.setDeleteModal(false);
  }

  function removeExpenseItemHandler() {
    props.setDeleteModal(false);

    // remove from expense data provider
    removeExpenseData(props.id);

    // remove from Search List
    if (setFilteredData) setFilteredData({ type: "DELETE", id: props.id });

    // remove from Calendar List Modal
    if (props.expenseListCalendar) {
      const newDataForCalendarModal = props.expenseListCalendar.filter(
        (element) => element.id !== props.id
      );

      // If there's no data after deleting, only pass the time
      props.setExpenseListCalendar(
        newDataForCalendarModal.length === 0
          ? props.expenseListCalendar[0].time
          : newDataForCalendarModal
      );
    }
  }

  return (
    <Modal classModal={style.modal}>
      <Title className={style.title}>are you sure to delete?</Title>
      <p className={style.description}>
        there is no way getting back this data <br /> once you delete it
      </p>
      <div className={style["btn__container"]}>
        <Button
          onClick={closeDeleteModal}
          className={`${style.btn} ${style["btn--no"]}`}
        >
          no
        </Button>
        <Button
          onClick={removeExpenseItemHandler}
          className={`${style.btn} ${style["btn--yes"]}`}
        >
          yes
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
