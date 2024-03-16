import { Fragment, useState} from "react";
import BtnIcon from "../BtnIcon/BtnIcon";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddDataForm from "../AddDataForm/AddDateForm";
import DescriptionModal from "../DescriptionModal/DescriptionModal";
import MoneyModal from "../MoneyModal/MoneyModal";
import useAddDataForm from "../../../Others/Custom/useAddDataForm";
import formatMoney from "../../../Others/FormatMoney/formatMoney";
import createEditedDescription from "../../../Others/CreateEditedDescription/createEditedDescription";
import useMoneyModal from "../../../Others/Custom/useMoneyModal";
import useCurWidth from "../../../Others/Custom/useCurWidth";
import { MdMoreVert } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import styles from "./ExpenseItem.module.css";
import formatDate from "../../../Others/FormatDate/formatDate";

function ExpenseItem(props) {
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
  const curWidth = useCurWidth();
  const [moneyModal, moneyModalToggler] = useMoneyModal();

  const deletedDataInfo = {
    id: props.id,
    type: props.type,
    mainCategory: props.mainCategory.name,
    subCategory: props.subCategory.name,
    price: props.price,
    date: formatDate(props.date),
    note: props.note,
  };

  function showDeleteModalHandler() {
    setDeleteModal(true);
  }

  function descriptionModalToggler(e) {
    // Reference 1
    if (descriptionModal || e.target.dataset.id === "true")
      setDescriptionModal((prev) => !prev);
  }

  const classMainCategory =
    props.mainCategory.type === "expense"
      ? `${styles["item__category--blue"]}`
      : `${styles["item__category--pink"]}`;

  //////////////////////////////////////////////////////////////////
  // Reference 4
  let limitedLength = props.modal ? 20 : 40;
  if (curWidth <= 1100) limitedLength = 15;
  if (curWidth <= 600) limitedLength = 10;

  const classLongDescription =
    props.note?.length > limitedLength ? "item__description--long" : "";
  const longIndex = classLongDescription.length > 0;
  let editedDescription =
    props.note && props.note.length > limitedLength
      ? createEditedDescription(props.note, limitedLength)
      : props.note;

  // shorten the description after user clicking the btn(more)
  if (
    props.note &&
    props.note?.length > limitedLength - 10 &&
    props.btnMoreIndex
  )
    editedDescription = createEditedDescription(
      props.note,
      limitedLength - 10
    );

  let largeMoney = false;
  if (props.price >= 1000000) largeMoney = true;

  return (
    <Fragment>
      {deleteModal && (
        <DeleteModal
          dataInfo={deletedDataInfo}
          setDeleteModal={setDeleteModal}
          btnMoreToggler={props.btnMoreToggler}
          addNewDataHandler={props.addNewDataHandler}
        />
      )}
      {addDataFormModal && (
        <AddDataForm
          // oldExpenseData={oldExpenseData}
          addDataFormModalToggler={addDataFormModalToggler}
          btnMoreToggler={props.btnMoreToggler}
        />
      )}
      {descriptionModal && (
        <DescriptionModal descriptionModalToggler={descriptionModalToggler}>
          {props.note}
        </DescriptionModal>
      )}
      {moneyModal.show && (
        <MoneyModal value={moneyModal.value} onClick={moneyModalToggler} />
      )}
      <li
        className={
          props.classItem
            ? `${styles.item} ${props.classItem}`
            : `${styles.item}`
        }
      >
        <div className={styles["item__info"]}>
          <div
            title={props.mainCategory.name}
            className={`${styles["item__category"]} ${classMainCategory} center--flex`}
          >
            <img
              alt={props.mainCategory.name}
              className={`icon`}
              src={props.mainCategory.icon.url}
            />
          </div>
          <div>
            <p className="capitalize">{props.subCategory.name}</p>
            <p className={styles["item__time"]}>{props.date.substr(0,10)}</p>
          </div>

          <p
            data-id={longIndex}
            onClick={descriptionModalToggler}
            className={
              longIndex
                ? `${styles["item__description"]} ${styles[classLongDescription]}`
                : `${styles["item__description"]}`
            }
          >
            {editedDescription}
            <span className={styles["description__text--hover"]}>
              show notes
            </span>
          </p>

          {longIndex && !props.btnMoreIndex && (
            <p
              data-id={longIndex}
              onClick={descriptionModalToggler}
              className={styles["description__text"]}
            >
              click to show notes
            </p>
          )}
        </div>

        <div>
          <p
            data-value={props.price}
            data-id={largeMoney}
            onClick={moneyModalToggler}
            className={`${styles["item__price"]} ${
              largeMoney ? `${styles["item__price--large"]}` : ""
            }`}
          >
            ${formatMoney(props.price)}
          </p>

          {!props.inDeleteSection && props.btnMoreIndex && (
            <div className={styles["btn__container"]}>
              <BtnIcon
                onClick={showDeleteModalHandler}
                classBtn={styles["btn__icon"]}
                text="delete"
              >
                <AiFillDelete className={styles.icon} />
              </BtnIcon>
              <span className={styles.vertical} />
              <BtnIcon
                onClick={addDataFormModalToggler}
                classBtn={styles["btn__icon"]}
                text="edit"
              >
                <AiFillEdit className={styles.icon} />
              </BtnIcon>
            </div>
          )}
          {!props.inDeleteSection && (
            <BtnIcon
              onClick={props.btnMoreToggler}
              type="button"
              classBtn={styles["btn__more"]}
              classText={styles["btn__more__text"]}
              ariaLabel="more"
              dataID={props.index}
            >
              <MdMoreVert />
            </BtnIcon>
          )}
        </div>
      </li>
    </Fragment>
  );
}

export default ExpenseItem;

/*
Reference 1
We put this function on every single description
but we don't wanna trigger for every description, we only want to show the description modal when the description is too long

The logic is we only want to trigger that useState set method when
1) descriptionModal is true, which means it's gonna close the modal
2) e.target.dataset.id is true
   (e.target.dataset.id is equal to variabe longIndex, which keep track if the description is too long (see below)
   (Note e.target.dataset.id represenat as string)
*/

/*
Reference 2
 Note that here and below
we only want to show "more", "delete", "edit" button and functionality when the expense list item do NOT in the delete section 
*/

/*
Reference 3
What does this mean longIndex && !btnMore && <content></content>
If longIndex is false
=> it means the description is not too long
=> we don't need to show the content at all

** !btnMore
=> If btnMore is true, it means showing the more content
=> If !btnMore is false, it means showing the more content
=> So now we don't want to show the content
*/

/*
Reference 4
Dynamically change the limited length
*/
