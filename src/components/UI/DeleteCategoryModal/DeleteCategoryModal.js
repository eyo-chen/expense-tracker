import { useContext } from "react";
import Modal from "../Modal/Modal";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Button from "../Button/Button";
import ExpenseList from "../ExpenseList/ExpenseList";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import EditModalContext from "../../../store/editModal/editModal--context";
import { AiFillWarning } from "react-icons/ai";
import styles from "./DeleteCategoryModal.module.css";

function DeleteCategoryModal(props) {
  const { expenseData, removeExpenseDataByCategory } =
    useContext(ExpenseDataContext);
  const [, setEditModal] = useContext(EditModalContext);

  const expenseItem =
    props.deleteMainOrSub === "main"
      ? expenseData.filter(
          (element) => element.mainCategory === props.clickingCategoryForDelete
        )
      : expenseData.filter(
          (element) => element.subCategory === props.clickingCategoryForDelete
        );

  const subtitleContent =
    expenseItem.length > 0
      ? `there ${expenseItem.length === 1 ? "is" : "are"} still ${
          expenseItem.length
        } data in your ${props.type} history`
      : `there's no data in your ${props.type} history`;

  function btnDeleteClickHandler(e) {
    props.clickDeleteBtnHandler(e, props.type);
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
    <Modal onClick={props.deleteModalToggler} classModal={styles.modal}>
      <div className={styles["title__container"]}>
        <SubTitle className={styles.title}>are you sure to delete</SubTitle>
        <SubTitle className={`${styles.title} ${styles["title--icon"]}`}>
          <span className={styles["text__category"]}>
            {props.clickingCategoryForDelete}
          </span>
          ?
        </SubTitle>
      </div>
      <HorizontalLine />
      <SubTitle className={styles.subtitle}>{subtitleContent}</SubTitle>
      {expenseItem.length > 0 && (
        <p className={`${styles.description}`}>
          <AiFillWarning className={styles.warning} />
          All of these data will be deleted if the category is deleted
          <AiFillWarning className={styles.warning} />
        </p>
      )}
      {
        /*
        use inDeleteSection to hide "more" button and functionality
        */
        <ExpenseList
          modal={true}
          classItem={styles.list}
          data={expenseItem}
          inDeleteSection={true}
        />
      }
      <div className={styles["btn__container"]}>
        <Button
          type="button"
          onClick={props.deleteModalToggler}
          className={`${styles.btn} transition--25`}
        >
          cancel
        </Button>
        <Button
          dataID={props.deleteMainOrSub}
          onClick={btnDeleteClickHandler}
          className={`${styles.btn} ${styles["btn--right"]} transition--25`}
        >
          delete
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteCategoryModal;
