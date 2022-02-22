import { useContext } from "react";
import Modal from "../Modal/Modal";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Button from "../Button/Button";
import ExpenseList from "../ExpenseList/ExpenseList";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import EditModalContext from "../../../store/editModal/editModal--context";
import CategoryContext from "../../../store/category/category--context";
import { AiFillWarning } from "react-icons/ai";
import style from "./DeleteCategoryModal.module.css";

function DeleteCategoryModal(props) {
  const { expenseData, removeExpenseDataByCategory } =
    useContext(ExpenseDataContext);
  const { iconObj } = useContext(CategoryContext);
  const [_, setEditModal] = useContext(EditModalContext);

  const expenseItem =
    props.deleteMainOrSub === "main"
      ? expenseData.filter(
          (element) => element.mainCategory === props.clickingCategoryForDelete
        )
      : (expenseItem = expenseData.filter(
          (element) => element.subCatetegory === props.clickingCategoryForDelete
        ));

  const subtitleContent =
    expenseItem.length > 0
      ? `there ${expenseItem.length === 1 ? "is" : "are"} still ${
          expenseItem.length
        } data in your ${props.type} history`
      : `there's no data of ${props.clickingCategoryForDelete} in your ${props.type} history`;

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
    <Modal onClick={props.deleteModalToggler} classModal={style.modal}>
      <div className={style["title__container"]}>
        <SubTitle className={style.title}>are you sure to delete</SubTitle>
        <SubTitle className={`${style.title} ${style["title--icon"]}`}>
          <img
            className={`${style.icon} icon`}
            src={iconObj[props.clickingCategoryForDelete]}
          />
          {props.clickingCategoryForDelete} ?
        </SubTitle>
      </div>
      <HorizontalLine />
      <SubTitle className={style.subtitle}>{subtitleContent}</SubTitle>
      {expenseItem.length > 0 && (
        <p className={`${style.description}`}>
          <AiFillWarning className={style.warning} />
          All of these data will be deleted if the category is deleted
          <AiFillWarning className={style.warning} />
        </p>
      )}
      {
        /*
        use inDeleteSection to hide "more" button and functionality
        */
        <ExpenseList
          modal={true}
          classItem={style.list}
          data={expenseItem}
          inDeleteSection={true}
        />
      }
      <div className={style["btn__container"]}>
        <Button
          type="button"
          onClick={props.deleteModalToggler}
          className={`${style.btn} transition--25 uppercase`}
        >
          cancel
        </Button>
        <Button
          dataID={props.deleteMainOrSub}
          onClick={btnDeleteClickHandler}
          className={`${style.btn} ${style["btn--right"]} transition--25 uppercase`}
        >
          delete
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteCategoryModal;
