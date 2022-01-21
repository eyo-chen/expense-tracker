import { Fragment, useState, useContext } from "react";
import { MdMoreVert } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import style from "./ExpenseItem.module.css";
import BtnIcon from "../BtnIcon/BtnIcon";
import Button from "../Button/Button";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddDataForm from "../AddDataForm/AddDateForm";
import CategoryContext from "../../../store/category/category--context";

function ExpenseItem(props) {
  const [btnMore, setBtnMore] = useState(false);
  const [hideDescription, setHideDescription] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addDataFrom, setAddDataForm] = useState({
    show: false,
    initialObj: {},
  });
  const { iconObj } = useContext(CategoryContext);

  // for DeleteModal
  const dataInfo = {
    mainCate: props.mainCate,
    subCate: props.subCate,
    price: props.price,
    time: props.time,
    description: props.description,
  };

  const icon = iconObj[props.mainCate];

  const classMainCate =
    props.category === "expense"
      ? `${style["item__mainCate--blue"]}`
      : `${style["item__mainCate--pink"]}`;

  function btnMoreClickHandler() {
    setBtnMore((prev) => !prev);
  }

  function closeDescriptionClickHandler() {
    setHideDescription(false);
  }

  function showDescriptionClickHandler() {
    if (props.description && props.description.length > limitLength)
      setHideDescription(true);
  }

  function showDeleteModalHandler() {
    setDeleteModal(true);
  }

  function showAddDataFormHandler() {
    const initialObj = {
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

    setAddDataForm({ show: true, initialObj });
  }

  function closeAddDataFormHandlerExpenseItem(edit) {
    setAddDataForm({ show: false, initialObj: {} });
  }

  let limitLength = props.modal ? 13 : 40;
  let lengthLongClassName =
    props.description?.length > limitLength ? "description--long" : "";

  let description =
    props.description && props.description.length > limitLength
      ? props.description.slice(0, limitLength).padEnd(limitLength + 3, ".")
      : props.description;

  // shorten the description after user clicking the more btn
  if (props.description?.length > limitLength - 10 && btnMore)
    description = props.description
      .slice(0, limitLength - 18)
      .padEnd(limitLength - 14, ".");

  return (
    <Fragment>
      {deleteModal && (
        <DeleteModal
          // expenseDataModal={props.expenseDataModal} (not sure what this is about)
          expenseListCalendar={props.expenseListCalendar}
          id={props.id}
          setDeleteModal={setDeleteModal}
          setExpenseListCalendar={props.setExpenseListCalendar}
          dataInfo={dataInfo}
        />
      )}
      {addDataFrom.show && (
        <AddDataForm
          initialObj={addDataFrom.initialObj}
          closeAddDataFormHandlerExpenseItem={
            closeAddDataFormHandlerExpenseItem
          }
        />
      )}
      <li className={style["item__list"]}>
        {hideDescription && (
          <div className={style["description--show"]}>
            <p>{props.description}</p>
            <Button type="button" onClick={closeDescriptionClickHandler}>
              <MdClose className={style.close} />
            </Button>
          </div>
        )}
        <div className={style["item__info"]}>
          <div
            title={props.mainCate}
            className={`${style["item__mainCate"]} ${classMainCate}`}
          >
            {icon}
          </div>
          <div>
            <p className={style.sub}>{props.subCate}</p>
            <p className={style.time}>{props.time}</p>
          </div>
          <p
            onClick={showDescriptionClickHandler}
            className={`${style.description} ${style[lengthLongClassName]}`}
          >
            {description}
          </p>
        </div>
        <div className={style.last}>
          <p className={style.money}>${props.price}</p>

          {/* 
          Note that here and below

          we only want to show "more" button and functionality when
          the expense list item do NOT in the delete section 
          */}
          {!props.inDeleteSection && btnMore && (
            <div className={style["btn__group__container"]}>
              <BtnIcon
                onClick={showDeleteModalHandler}
                classBtn={style["btn__icon"]}
                text="delete"
              >
                <AiFillDelete className={style.icon} />
              </BtnIcon>
              <span className={style.vertical} />
              <BtnIcon
                onClick={showAddDataFormHandler}
                classBtn={style["btn__icon"]}
                text="edit"
              >
                <AiFillEdit className={style.icon} />
              </BtnIcon>
            </div>
          )}
          {!props.inDeleteSection && (
            <Button
              onClick={btnMoreClickHandler}
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
