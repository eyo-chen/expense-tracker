import { useContext, useReducer } from "react";
import EditModalContext from "../../../store/editModal/editModal--context";
import Modal from "../Modal/Modal";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import CategoryContext from "../../../store/category/category--context";
import createDateFormat from "../../../Others/createDateFormat";
import FormBtn from "./FormBtn";
import FormPrice from "./FormPrice";
import FormDate from "./FormDate";
import FormDescription from "./FormDescription";
import FormSubCategory from "./FormSubCategory";
import FormMainCategory from "./FormMainCategory";
import FormTitle from "./FormTitle";
import { v4 as uuidv4 } from "uuid";
import style from "./AddDataForm.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "CATEGORY": {
      let mainCategoryArr, subCategoryArr;
      const categoryExpenseKeyArr = Object.keys(state.categoryExpense);
      const categoryIncomeKeyArr = Object.keys(state.categoryIncome);

      /*
      Note that do NOT directly hard code "food" or "salary"
      because user may add, remove, edit main and sub category

      what we want is showing the first main category, and it's sub category
      */
      if (action.value === "expense") {
        mainCategoryArr = categoryExpenseKeyArr;
        subCategoryArr = state.categoryExpense[categoryExpenseKeyArr[0]];
      } else {
        mainCategoryArr = categoryIncomeKeyArr;
        subCategoryArr = state.categoryIncome[categoryIncomeKeyArr[0]];
      }

      return {
        ...state,
        category: action.value,
        mainCategoryArr,
        subCategoryArr,
        mainCategory:
          action.value === "expense"
            ? Object.keys(state.categoryExpense)[0]
            : Object.keys(state.categoryIncome)[0],
        subCategory:
          action.value === "expense"
            ? state.categoryExpense[categoryExpenseKeyArr[0]][0]
            : state.categoryIncome[categoryIncomeKeyArr[0]][0],
        icon: state.iconObj[
          action.value === "expense"
            ? Object.keys(state.categoryExpense)[0]
            : Object.keys(state.categoryIncome)[0]
        ],
      };
    }

    case "MAIN_CATEGORY": {
      let subCategoryArr;

      if (state.category === "expense")
        subCategoryArr = state.categoryExpense[action.value];
      else subCategoryArr = state.categoryIncome[action.value];

      return {
        ...state,
        mainCategory: action.value,
        subCategoryArr,
        subCategory: subCategoryArr[0],
        icon: state.iconObj[action.value],
      };
    }

    case "SUB_CATEGORY": {
      return { ...state, subCategory: action.value };
    }

    case "DESCRIPTION": {
      return { ...state, description: action.value };
    }

    case "DATE": {
      return { ...state, date: action.value };
    }

    case "PRICE": {
      let valid = false;
      if (
        action.value.trim().length > 0 &&
        !Object.is(-0, Number(action.value)) &&
        Number(action.value) >= 0
      )
        valid = true;

      return { ...state, isValid: valid, price: action.value };
    }

    case "PRICE--TOUCH": {
      // it will always be true once user select or touch the price input
      return { ...state, priceTouch: true };
    }

    default: {
      return state;
    }
  }
}

function AddDataForm(props) {
  const { addExpenseData, editExpenseData } = useContext(ExpenseDataContext);
  const [, setEditModal] = useContext(EditModalContext);
  const { categoryExpense, categoryIncome, iconObj } =
    useContext(CategoryContext);

  const mainCateExpenseArr = Object.keys(categoryExpense);
  const mainCateIncomeArr = Object.keys(categoryIncome);

  /*
  the data storing in expenseDataProvider do NOT have
  mainCategoryArr, subCategoryArr categoryExpense, categoryIncome, iconObj, priceTouch
  but we need this data in the form, so add them
  */
  let initialObj;
  if (props.initialObj)
    initialObj = {
      ...props.initialObj,
      mainCategoryArr:
        props.initialObj.category === "expense"
          ? mainCateExpenseArr
          : mainCateIncomeArr,
      subCategoryArr:
        props.initialObj.category === "expense"
          ? categoryExpense[props.initialObj.mainCategory]
          : categoryIncome[props.initialObj.mainCategory],
      categoryExpense,
      categoryIncome,
      iconObj,
      priceTouch: true,
    };
  else
    initialObj = {
      category: "expense",
      mainCategoryArr: mainCateExpenseArr,
      subCategoryArr: categoryExpense[mainCateExpenseArr[0]],
      mainCategory: mainCateExpenseArr[0],
      subCategory: categoryExpense[mainCateExpenseArr[0]][0],
      date:
        props.date === undefined
          ? createDateFormat(new Date())
          : createDateFormat(new Date(props.date)),
      description: "",
      price: "",
      priceTouch: false,
      icon: iconObj[Object.keys(categoryExpense)[0]],
      isValid: false,
      iconObj,
      categoryExpense,
      categoryIncome,
    };

  const [formData, formDataDispatch] = useReducer(reducer, initialObj);

  // get rid of animation, so that component won't re-render several times repeatedly
  // const [animation, setAnimation] = useState(false);
  // useEffect(() => {
  //   setAnimation(formData.category);

  //   const time = setTimeout(() => {
  //     setAnimation(false);
  //   }, 500);

  //   return function cleanUp() {
  //     clearTimeout(time);
  //   };
  // }, [formData.category]);

  function categoryChangeHandler(e) {
    formDataDispatch({ type: "CATEGORY", value: e.target.value });
  }

  function mainCategoryChangeHandler(e) {
    formDataDispatch({
      type: "MAIN_CATEGORY",
      value: e.target.value,
    });
  }

  function subCategoryChangeHandler(e) {
    formDataDispatch({
      type: "SUB_CATEGORY",
      value: e.target.value,
    });
  }

  function descriptionChangeHandler(e) {
    formDataDispatch({
      type: "DESCRIPTION",
      value: e.target.value,
    });
  }

  function dateChangeHandler(e) {
    formDataDispatch({
      type: "DATE",
      value: e.target.value,
    });
  }

  function priceChangeHandler(e) {
    formDataDispatch({
      type: "PRICE",
      value: e.target.value,
    });
  }

  function inputPriceTouchHandler() {
    // it will always be true until user select or touch the price input
    formDataDispatch({
      type: "PRICE--TOUCH",
    });
  }

  function cancelClickHandler() {
    // close the form from home
    if (props.closeFormHandlerFromHome) props.closeFormHandlerFromHome();

    // close from calendar
    if (props.closeAddDataFormHandlerFromCalendar)
      props.closeAddDataFormHandlerFromCalendar();

    // close from expense item
    if (props.closeAddDataFormHandlerExpenseItem)
      props.closeAddDataFormHandlerExpenseItem();
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    const newFormData = {
      id: props.initialObj ? props.initialObj.id : uuidv4(),
      category: formData.category,
      mainCate: formData.mainCategory,
      subCate: formData.subCategory,
      time: formData.date,
      description: formData.description,
      price: formData.price,
    };

    //////////////////////////////////////////////////
    // add new data or edited old data
    // if props.initialObj exist, it means it's editing the old data
    if (props.initialObj) editExpenseData(newFormData);
    else addExpenseData(newFormData);

    //////////////////////////////////////////////////
    // close the form from Home
    if (props.closeFormHandlerFromHome) props.closeFormHandlerFromHome();

    // close from Calendar
    if (props.closeAddDataFormHandlerFromCalendar)
      props.closeAddDataFormHandlerFromCalendar();

    // close from expense item
    if (props.closeAddDataFormHandlerExpenseItem) {
      props.closeAddDataFormHandlerExpenseItem();

      // edit successfully
      setEditModal(true);
    }
  }

  // let classNameAnimation = !animation
  //   ? ""
  //   : animation === "expense"
  //   ? "bump--blue"
  //   : "bump--pink";

  return (
    <Modal classModal={style.modal}>
      <form onSubmit={formSubmitHandler} className={style.form}>
        <FormTitle
          classNameContainer={style["title__container"]}
          classNameInput={style.input}
          classNameExpense={style.expense}
          classNameIncome={style.income}
          classNameCheck={style.check}
          classNameTitle={style.title}
          category={formData.category}
          categoryChangeHandler={categoryChangeHandler}
        />

        <HorizontalLine />
        <div className={style["form__container"]}>
          <FormMainCategory
            classNameLabel={style.label}
            classNameIcon={style.icon}
            classNameInput={style.input}
            mainCategory={formData.mainCategory}
            icon={formData.icon}
            mainCategoryChangeHandler={mainCategoryChangeHandler}
            mainCategoryArr={formData.mainCategoryArr}
          />

          <FormSubCategory
            classNameLabel={style.label}
            classNameInput={style.input}
            subCategoryChangeHandler={subCategoryChangeHandler}
            subCategory={formData.subCategory}
            subCategoryArr={formData.subCategoryArr}
          />

          <FormDescription
            classNameLabel={style.label}
            classNameInput={style.input}
            description={formData.description}
            descriptionChangeHandler={descriptionChangeHandler}
          />

          <FormDate
            classNameLabel={style.label}
            classNameInput={style.input}
            date={formData.date}
            dateChangeHandler={dateChangeHandler}
          />

          <FormPrice
            classNameContainer={style["container--last"]}
            classNameLabel={style.label}
            classNameInput={style.input}
            classNameInputNonValid={style["input--nonValid"]}
            classNameWarn={style.warning}
            classNameWarnShow={style["warning--show"]}
            price={formData.price}
            priceTouch={formData.priceTouch}
            isValid={!formData.isValid}
            priceChangeHandler={priceChangeHandler}
            inputPriceTouchHandler={inputPriceTouchHandler}
          />

          <FormBtn
            classNameContainer={`${style["btn__container"]} `}
            classNameCancel={`${style.btn} ${style["btn--isValid"]}`}
            cancelClickHandler={cancelClickHandler}
            classNameAdd={
              formData.isValid
                ? `${style["btn--isValid"]} ${style.btn}`
                : `${style.btn}`
            }
            isValid={!formData.isValid}
            initialObj={props.initialObj}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddDataForm;
/*
  <div className={style["title__container"]}>
          <InputRadio
            classInput={style.input}
            classCheck={`${style.expense} ${style.check}`}
            classLabel={style.title}
            label="expense"
            name="title"
            value="expense"
            onChange={categoryChangeHandler}
            checked={formData.category === "expense"}
          />
          <InputRadio
            classInput={style.input}
            classCheck={`${style.income} ${style.check}`}
            classLabel={style.title}
            label="income"
            name="title"
            value="income"
            onChange={categoryChangeHandler}
            checked={formData.category === "income"}
          />
        </div>


          <div className={style["container"]}>
            <label className={style.label}>
              main category
              <div className={style.icon}>{formData.icon}</div>
            </label>
            <select
              value={formData.mainCategory}
              onChange={mainCategoryChangeHandler}
              className={style.input}
              type="select"
            >
              {formData.mainCategoryArr.map((element) => (
                <option value={element} key={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
*/

{
  /* <div className={style["container"]}>
            <label className={style.label}>sub category</label>

            <select
              value={formData.subCategory}
              onChange={subCategoryChangeHandler}
              className={style.input}
              type="select"
            >
              {formData.subCategoryArr.map((element) => (
                <option value={element} key={element}>
                  {element}
                </option>
              ))}
            </select>
          </div> */
}
{
  /* <div className={style["container"]}>
            <label className={style.label}>description (optional)</label>
            <input
              value={formData.description}
              onChange={descriptionChangeHandler}
              className={style.input}
              type="text"
            ></input>
          </div> */
}
{
  /* <div className={style["container"]}>
            <label className={style.label}>date</label>
            <input
              value={formData.date}
              className={style.input}
              type="date"
              onChange={dateChangeHandler}
            ></input>
          </div> */
}

{
  /* <div className={`${style["container"]} ${style["container--last"]}`}>
            <label className={style.label}>price *</label>
            <input
              onChange={priceChangeHandler}
              className={style.input}
              type="number"
              value={formData.price}
            ></input>
          </div> */
}
{
  /* <div className={`${style["btn__container"]} `}>
            <Button
              type="button"
              className={`${style.btn} ${style["btn--isValid"]}`}
              onClick={cancelClickHandler}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={
                formData.isValid
                  ? `${style["btn--isValid"]} ${style.btn}`
                  : `${style.btn}`
              }
              disabled={formData.isValid}
            >
              {props.initialObj ? "edit" : "add"}
            </Button>
          </div> */
}
