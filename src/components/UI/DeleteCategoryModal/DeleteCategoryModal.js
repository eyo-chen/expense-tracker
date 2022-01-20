import { useContext } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Button from "../Button/Button";
import ExpenseList from "../ExpenseList/ExpenseList";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import style from "./DeleteCategoryModal.module.css";

function DeleteCategoryModal(props) {
  const { expenseData } = useContext(ExpenseDataContext);

  let expenseItem;
  // main category
  if (props.mainCategoryArr.includes(props.clickingCategoryForDelete)) {
    expenseItem = expenseData.filter(
      (element) => element.mainCate === props.clickingCategoryForDelete
    );
  }
  // sub category
  else {
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

  function btnDeleteClickHandler() {
    props.deleteCategory();
    props.closeDeleteModal();
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
        <p className={style.description}>
          These data won't be deleted if the category is deleted
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
          onClick={props.closeDeleteModal}
          className={style.btn}
        >
          cancel
        </Button>
        <Button onClick={btnDeleteClickHandler} className={style.btn}>
          remove
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteCategoryModal;
