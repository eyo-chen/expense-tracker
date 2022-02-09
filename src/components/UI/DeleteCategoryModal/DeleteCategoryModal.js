import { useContext } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Button from "../Button/Button";
import ExpenseList from "../ExpenseList/ExpenseList";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import EditModalContext from "../../../store/editModal/editModal--context";
import style from "./DeleteCategoryModal.module.css";

function DeleteCategoryModal(props) {
  const { expenseData, removeExpenseDataByCategory } =
    useContext(ExpenseDataContext);
  const [, setEditModal] = useContext(EditModalContext);

  let expenseItem;
  // main category
  if (props.deleteMainOrSub === "main") {
    expenseItem = expenseData.filter(
      (element) => element.mainCate === props.clickingCategoryForDelete
    );
  }
  // sub category
  else if (props.deleteMainOrSub === "sub") {
    expenseItem = expenseData.filter(
      (element) => element.subCate === props.clickingCategoryForDelete
    );
  }

  let subtitleContent;
  if (expenseItem.length > 0)
    subtitleContent = `there ${expenseItem.length === 1 ? "is" : "are"} still ${
      expenseItem.length
    } data of ${props.clickingCategoryForDelete} in your expense history`;
  else
    subtitleContent = `there's no data of ${props.clickingCategoryForDelete} in your expense history`;

  function btnDeleteClickHandler(e) {
    props.clickDeleteBtnHandler(e);
    props.deleteModalToggler(e);
    removeExpenseDataByCategory(
      props.deleteMainOrSub,
      props.clickingCategoryForDelete
    );
    setEditModal({
      show: true,
      type: props.type,
      value: "delete",
    });
  }

  return (
    <Modal classModal={style.modal}>
      <div className={style["title__container"]}>
        <Title className={style.title}>are you sure to delete</Title>
        <Title className={style.title}>
          {props.clickingCategoryForDelete} category?
        </Title>
      </div>
      <HorizontalLine />
      <SubTitle className={style.subtitle}>{subtitleContent}</SubTitle>
      {expenseItem.length > 0 && (
        <p className={`${style.description} capitalize`}>
          all of these data will be deleted if the category is deleted
        </p>
      )}
      {
        /*
        use inDeleteSection to hide "more" button and functionality
        */
        <ExpenseList
          modal={true}
          classItem={style.expenseList}
          data={expenseItem}
          inDeleteSection={true}
        />
      }
      <div className={style["btn__container"]}>
        <Button
          type="button"
          onClick={props.deleteModalToggler}
          className={style.btn}
        >
          cancel
        </Button>
        <Button
          dataID={props.deleteMainOrSub}
          onClick={btnDeleteClickHandler}
          className={style.btn}
        >
          delete
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteCategoryModal;
