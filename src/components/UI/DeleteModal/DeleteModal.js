import { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import SubTitle from "../SubTitle/SubTitle";
import Button from "../Button/Button";
import UpdateStateContext from "../../../store/updateState/updateState--context";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import EditModalContext from "../../../store/editModal/editModal--context";
import DescriptionModal from "../DescriptionModal/DescriptionModal";
import createEditedDescription from "../../../Others/CreateEditedDescription/createEditedDescription";
import { FaRegHandPointRight } from "react-icons/fa";
import styles from "./DeleteModal.module.css";
import fetcher from "../../../Others/Fetcher/fetcher"

// Reference 1
function DeleteModal(props) {
  const { updateStateHandler } = useContext(UpdateStateContext);
  const [, setEditModal] = useContext(EditModalContext);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const {id: _, ...filteredDataInfo} = props.dataInfo // filter out the id
  const dataInfoKey = Object.keys(filteredDataInfo);
  const dataInfoValue = Object.values(filteredDataInfo);

  // first filter out the empty note
  const infoItem = dataInfoValue.filter((data, index) => {
    if (dataInfoKey[index] !== "note") return true;
    return data
  })
  .map((data, index) => {
    let dataItemName;
    if (dataInfoKey[index] === "mainCate") dataItemName = "main category";
    else if (dataInfoKey[index] === "subCate") dataItemName = "sub category";
    else if (dataInfoKey[index] === "date") dataItemName = "date";
    else dataItemName = dataInfoKey[index];

    if (dataItemName === "description" && data.length >= 20) {
      const editedDescription = createEditedDescription(data, 20);

      return (
        <div
          onClick={descriptionModalToggler}
          key={dataInfoKey[index]}
          className={
            data?.length >= 20
              ? `${styles["info__item"]} ${styles.long}`
              : `${styles["info__item"]}`
          }
        >
          <p className={styles["info__category"]}>
            <FaRegHandPointRight className={styles.icon} /> {dataItemName}:
          </p>
          <p>{editedDescription}</p>
        </div>
      );
    } else
      return (
        <div key={dataInfoKey[index]} className={styles["info__item"]}>
          <p className={styles["info__category"]}>
            <FaRegHandPointRight className={styles.icon} /> {dataItemName}:
          </p>
          <p>{data}</p>
        </div>
      );
  });

  function descriptionModalToggler() {
    setDescriptionModal((prev) => !prev);
  }

  function closeDeleteModal() {
    props.setDeleteModal(false);
  }

  async function deleteTransaction(id) {
    try {
      await fetcher(
        `v1/transaction/${id}`,
        "DELETE"
      );
    } catch (error) {
      throw error;
    }
  }

  async function removeExpenseItemHandler() {
    try {
      await deleteTransaction(props.dataInfo.id);
      
      props.setDeleteModal(false);

      setEditModal({
        show: true,
        type: props.dataInfo.type,
        value: "delete",
        status: "success",
      });

      // close the btn more state after deleting the data
      if (props.btnMoreToggler) props.btnMoreToggler();

      updateStateHandler();
    } catch (error) {
      setEditModal({
        show: true,
        type: props.dataInfo.type,
        value: "delete",
        status: "fail",
      });
    }
  }

  return (
    <>
      {descriptionModal && (
        <DescriptionModal descriptionModalToggler={descriptionModalToggler}>
          {props.dataInfo.description}
        </DescriptionModal>
      )}
      <Modal onClick={closeDeleteModal} classModal={styles.modal}>
        <div>
          <SubTitle className={styles.title}>
            are you sure <br /> to delete this data?
          </SubTitle>
          <HorizontalLine />
        </div>

        <div className={styles["info__container"]}>{infoItem}</div>

        <p className={styles.description}>
          <em>
            there is no way to get this data back <br /> once you delete it
          </em>
        </p>
        <div className={styles["btn__container"]}>
          <Button
            type="button"
            onClick={closeDeleteModal}
            className={`${styles.btn} uppercase transition--25`}
          >
            no
          </Button>
          <Button
            type="button"
            onClick={removeExpenseItemHandler}
            className={`${styles.btn} uppercase transition--25`}
          >
            yes
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteModal;

/*
Reference 1
There are three different places need DeleteModal component
1. Home
2. Calendar List Modal
3. Search List
So we need different function to handle the data once user delete the data

Note that DeleteModal only from "DeleteModal" because there's only way to show this modal
*/
