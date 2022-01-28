import { useContext } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import Button from "../Button/Button";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import SearchListDataContext from "../../../store/searchListData/searchListData--context";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import { FaRegHandPointRight } from "react-icons/fa";

import style from "./DeleteModal.module.css";
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
  const dataInfoKey = Object.keys(props.dataInfo);
  const dataInfoValue = Object.values(props.dataInfo);

  const infoItem = dataInfoValue.map((data, index) => {
    let dataItemName;
    if (dataInfoKey[index] === "mainCate") dataItemName = "main category";
    else if (dataInfoKey[index] === "subCate") dataItemName = "sub category";
    else dataItemName = dataInfoKey[index];

    return (
      <div key={dataInfoKey[index]} className={style["info__item"]}>
        <p className={style["info__category"]}>
          <FaRegHandPointRight className={style.icon} /> {dataItemName}:
        </p>
        <p>{data}</p>
      </div>
    );
  });

  function closeDeleteModal() {
    props.setDeleteModal(false);
  }

  function removeExpenseItemHandler() {
    props.setDeleteModal(false);

    // remove from expense data provider
    removeExpenseData(props.id);

    // remove from Search List
    if (setFilteredData) setFilteredData({ type: "DELETE", id: props.id });
  }

  return (
    <Modal classModal={style.modal}>
      <div>
        <Title className={style.title}>
          are you sure <br /> to delete this data?
        </Title>
        <HorizontalLine />
      </div>

      <div className={style["info__container"]}>{infoItem}</div>

      <p className={style.description}>
        there is no way getting back this data <br /> once you delete it
      </p>
      <div className={style["btn__container"]}>
        <Button
          type="button"
          onClick={closeDeleteModal}
          className={`${style.btn} uppercase`}
        >
          no
        </Button>
        <Button
          type="button"
          onClick={removeExpenseItemHandler}
          className={`${style.btn} uppercase`}
        >
          yes
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
