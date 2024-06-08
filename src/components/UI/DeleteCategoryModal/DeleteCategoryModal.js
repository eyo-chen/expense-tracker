import { useContext, useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Button from "../Button/Button";
import ExpenseList from "../ExpenseList/ExpenseList";
import EditModalContext from "../../../store/editModal/editModal--context";
import { AiFillWarning } from "react-icons/ai";
import styles from "./DeleteCategoryModal.module.css";
import fetcher from "../../../Others/Fetcher/fetcher";
import Loading from "../Loading/Loading";

function DeleteCategoryModal(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setEditModal] = useContext(EditModalContext);

  useEffect(() => {
    setLoading(true);
    fetchTransactionList(props.mainOrSub, props.curCategory.id).then((data) => {
      setTransactionList(data);
    }).catch((error) => {
      console.error("Error fetching data:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, [props.curCategory.id]);


  const subtitleContent =
    transactionList.length > 0
      ? `there ${transactionList.length === 1 ? "is" : "are"} still ${
        transactionList.length
        } data in your ${props.curType} history`
      : `there's no data in your ${props.curType} history`;

  async function btnDeleteClickHandler(e) {
    try {
      await deleteCategory(props.mainOrSub, props.curCategory.id);
      setEditModal({
        show: true,
        type: props.curType,
        value: "delete",
        status: "success",
      });

      props.deleteModalToggler();

      // update state
      if (props.mainOrSub === "main") {
        props.setDeleteMainCategory();
      } else {
        props.setDeleteSubCategory();
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      setEditModal({
        show: true,
        type: props.curType,
        value: "delete",
        status: "fail",
      });
    }
  }

  let categoryList = <Loading className={styles["loading"]} />;
  if (!loading) {
    categoryList = <ExpenseList
                      modal={true}
                      classItem={styles.list}
                      dataList={transactionList}
                      inDeleteSection={true}
                    />
  }

  return (
    <Modal onClick={props.deleteModalToggler} classModal={styles.modal}>
      <div className={styles["title__container"]}>
        <SubTitle className={styles.title}>are you sure to delete</SubTitle>
        <SubTitle className={`${styles.title} ${styles["title--icon"]}`}>
          <span className={styles["text__category"]}>
            {props.curCategory.name}
          </span>
          ?
        </SubTitle>
      </div>
      <HorizontalLine />
      <SubTitle className={styles.subtitle}>{subtitleContent}</SubTitle>
      {transactionList.length > 0 && (
        <p className={`${styles.description}`}>
          <AiFillWarning className={styles.warning} />
          All of these data will be removed if the category is deleted
          <AiFillWarning className={styles.warning} />
        </p>
      )}
      {categoryList}
      <div className={styles["btn__container"]}>
        <Button
          type="button"
          onClick={props.deleteModalToggler}
          className={`${styles.btn} transition--25`}
        >
          cancel
        </Button>
        <Button
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


async function fetchTransactionList(mainOrSub, id) {
  try {
    const query = mainOrSub === "main" ? "main_category_ids" : "sub_category_ids";
    const resp = await fetcher(
      `v1/transaction?${query}=${id}`,
      "GET"
    );

    return resp.transactions;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function deleteCategory(mainOrSub, id) {
  try {
    const endpoint = mainOrSub === "main" ? "main-category" : "sub-category";
    await fetcher(
      `v1/${endpoint}/${id}`,
      "DELETE"
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}