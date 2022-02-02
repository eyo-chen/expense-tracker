import { Fragment, useState, useContext } from "react";
import BtnIcon from "../BtnIcon/BtnIcon";
import Button from "../Button/Button";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddDataForm from "../AddDataForm/AddDateForm";
import DescriptionModal from "../DescriptionModal/DescriptionModal";
import CategoryContext from "../../../store/category/category--context";
import useAddDataForm from "../../../Others/Custom/useAddDataForm";
import formatMoney from "../../../Others/FormatMoney/formatMoney";
import { MdMoreVert } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import style from "./ExpenseItem.module.css";

function ExpenseItem(props) {
  const [btnMore, setBtnMore] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
  const { iconObj } = useContext(CategoryContext);
  const icon = iconObj[props.mainCate];

  const oldExpenseData = {
    id: props.id,
    category: props.category,
    mainCategoryArr: [],
    mainCategory: props.mainCate,
    subCategoryArr: [],
    subCategory: props.subCate,
    date: props.time,
    description: props.description,
    price: props.price,
    isValid: true,
  };

  const deletedDataInfo = {
    mainCate: props.mainCate,
    subCate: props.subCate,
    price: props.price,
    time: props.time,
    description: props.description,
  };

  function btnMoreToggler() {
    setBtnMore((prev) => !prev);
  }

  function showDeleteModalHandler() {
    setDeleteModal(true);
  }

  function descriptionModalToggler(e) {
    /*
    We put this function on every single description
    but we don't wanna trigger for every description, we only want to show the description modal when the description is too long

    The logic is we only want to trigger that useState set method when
    1) descriptionModal is true, which means it's gonna close the modal
    2) e.target.dataset.id is true
       e.target.dataset.id is equal to variabe longIndex, which keep track if the description is too long (see below)
       (Note e.target.dataset.id represenat as string)
    */
    if (descriptionModal) setDescriptionModal((prev) => !prev);
    else if (e.target.dataset.id === "true")
      setDescriptionModal((prev) => !prev);
  }

  const classMainCate =
    props.category === "expense"
      ? `${style["item__category--blue"]}`
      : `${style["item__category--pink"]}`;

  const limitedLength = props.modal ? 13 : 40;
  const longLengthClassName =
    props.description?.length > limitedLength ? "item__description--long" : "";
  const longIndex = longLengthClassName.length > 0;

  let editedDescription =
    props.description && props.description.length > limitedLength
      ? props.description.slice(0, limitedLength).padEnd(limitedLength + 3, ".")
      : props.description;

  // shorten the description after user clicking the btn(more)
  if (
    props.description &&
    props.description?.length > limitedLength - 10 &&
    btnMore
  )
    editedDescription = props.description
      .slice(0, limitedLength - 10)
      .padEnd(limitedLength - 6, ".");

  return (
    <Fragment>
      {deleteModal && (
        <DeleteModal
          id={props.id}
          dataInfo={deletedDataInfo}
          setDeleteModal={setDeleteModal}
        />
      )}
      {addDataFormModal && (
        <AddDataForm
          oldExpenseData={oldExpenseData}
          addDataFormModalToggler={addDataFormModalToggler}
          btnMoreToggler={btnMoreToggler}
        />
      )}
      {descriptionModal && (
        <DescriptionModal descriptionModalToggler={descriptionModalToggler}>
          {props.description}
        </DescriptionModal>
      )}

      <li
        className={
          props.classItem ? `${style.item} ${props.classItem}` : `${style.item}`
        }
      >
        <div className={style["item__info"]}>
          <div
            title={props.mainCate}
            className={`${style["item__category"]} ${classMainCate} center--flex`}
          >
            {icon}
          </div>
          <div>
            <p className="capitalize">{props.subCate}</p>
            <p className={style["item__time"]}>{props.time}</p>
          </div>
          <p
            data-id={longIndex}
            onClick={descriptionModalToggler}
            className={
              longIndex
                ? `${style["item__description"]} ${style[longLengthClassName]}`
                : `${style["item__description"]}`
            }
          >
            {editedDescription}
          </p>
          {longIndex && (
            <p
              data-id={longIndex}
              onClick={descriptionModalToggler}
              className={style["description__text"]}
            >
              click to show description
            </p>
          )}
        </div>

        <div>
          <p className={style["item__price"]}>${formatMoney(props.price)}</p>

          {/* 
          Note that here and below
          we only want to show "more", "delete", "edit" button and functionality when the expense list item do NOT in the delete section 
          */}
          {!props.inDeleteSection && btnMore && (
            <div className={style["btn__container"]}>
              <BtnIcon
                onClick={showDeleteModalHandler}
                classBtn={style["btn__icon"]}
                text="delete"
              >
                <AiFillDelete className={style.icon} />
              </BtnIcon>
              <span className={style.vertical} />
              <BtnIcon
                onClick={addDataFormModalToggler}
                classBtn={style["btn__icon"]}
                text="edit"
              >
                <AiFillEdit className={style.icon} />
              </BtnIcon>
            </div>
          )}
          {!props.inDeleteSection && (
            <Button
              onClick={btnMoreToggler}
              type="button"
              className={style["btn__more"]}
            >
              <MdMoreVert />
            </Button>
          )}
        </div>
      </li>
    </Fragment>
  );
}

export default ExpenseItem;
