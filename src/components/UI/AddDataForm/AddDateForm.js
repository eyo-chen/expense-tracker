import { useContext, useReducer } from "react";
import EditModalContext from "../../../store/editModal/editModal--context";
import Modal from "../Modal/Modal";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import CategoryContext from "../../../store/category/category--context";
import createDateStringFormat from "../../../Others/CreateDateStringFormat/CreateDateStringFormat";
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
      const firstCategoryExpense = Object.keys(state.categoryExpense)[0];
      const firstCategoryIncome = Object.keys(state.categoryIncome)[0];

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
            ? firstCategoryExpense
            : firstCategoryIncome,
        subCategory:
          action.value === "expense"
            ? state.categoryExpense[categoryExpenseKeyArr[0]][0]
            : state.categoryIncome[categoryIncomeKeyArr[0]][0],
        icon: state.iconObj[
          action.value === "expense"
            ? firstCategoryExpense
            : firstCategoryIncome
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
      // it will always be true once user have selected or touched the price input
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
  if (props.oldExpenseData)
    initialObj = {
      ...props.oldExpenseData,
      mainCategoryArr:
        props.oldExpenseData.category === "expense"
          ? mainCateExpenseArr
          : mainCateIncomeArr,
      subCategoryArr:
        props.oldExpenseData.category === "expense"
          ? categoryExpense[props.oldExpenseData.mainCategory]
          : categoryIncome[props.oldExpenseData.mainCategory],
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
          ? createDateStringFormat(new Date())
          : props.date,
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

  function formSubmitHandler(e) {
    e.preventDefault();

    const newFormData = {
      id: props.oldExpenseData ? props.oldExpenseData.id : uuidv4(),
      category: formData.category,
      mainCate: formData.mainCategory,
      subCate: formData.subCategory,
      time: formData.date,
      description: formData.description,
      price: formData.price,
      year: formData.date.slice(0, 4),
      month: formData.date.slice(5, 7),
      day: formData.date.slice(8, 10),
    };

    //////////////////////////////////////////////////
    // add new data or edited old data
    // if props.oldExpenseData exist, it means it's editing the old data
    if (props.oldExpenseData) {
      editExpenseData(newFormData);
      setEditModal(true);
    } else addExpenseData(newFormData);

    // hide the more functionality after user edit the data
    if (props.btnMoreToggler) props.btnMoreToggler();

    props.addDataFormModalToggler();
  }

  return (
    <Modal classModal={style.modal}>
      <form onSubmit={formSubmitHandler} className={style.form}>
        <FormTitle
          classContainer={style["title__container"]}
          classInput={style.input}
          classExpense={style.expense}
          classIncome={style.income}
          classCheck={style.check}
          classTitle={`${style.title} uppercase transition--25`}
          category={formData.category}
          categoryChangeHandler={categoryChangeHandler}
        />

        <HorizontalLine />
        <div className={style["form__container"]}>
          <FormMainCategory
            classLabel={`${style.label} capitalize`}
            classIcon="center--flex"
            classInput={style.input}
            mainCategory={formData.mainCategory}
            icon={formData.icon}
            mainCategoryChangeHandler={mainCategoryChangeHandler}
            mainCategoryArr={formData.mainCategoryArr}
          />

          <FormSubCategory
            classLabel={`${style.label} capitalize`}
            classInput={style.input}
            subCategoryChangeHandler={subCategoryChangeHandler}
            subCategory={formData.subCategory}
            subCategoryArr={formData.subCategoryArr}
          />

          <FormDescription
            classTextContainer={style["text__container"]}
            classLabel={`${style.label} capitalize`}
            classInput={style.input}
            description={formData.description}
            descriptionChangeHandler={descriptionChangeHandler}
          />

          <FormDate
            classLabel={`${style.label} capitalize`}
            classInput={style.input}
            date={formData.date}
            dateChangeHandler={dateChangeHandler}
          />

          <FormPrice
            classContainer={style["price__container"]}
            classLabel={`${style.label} capitalize`}
            classInput={style.input}
            classInputInvalid={style["input--invalid"]}
            classWarn={style.warning}
            price={formData.price}
            priceTouch={formData.priceTouch}
            isValid={!formData.isValid}
            priceChangeHandler={priceChangeHandler}
            inputPriceTouchHandler={inputPriceTouchHandler}
          />

          <FormBtn
            classContainer={`${style["btn__container"]}`}
            classCancel={`${style.btn} uppercase transition--25`}
            addDataFormModalToggler={props.addDataFormModalToggler}
            classAdd={
              !formData.isValid
                ? `${style["btn--invalid"]} ${style.btn} uppercase transition--25`
                : `${style.btn} uppercase transition--25`
            }
            isValid={!formData.isValid}
            oldExpenseData={props.oldExpenseData}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddDataForm;
