import { useContext, useReducer } from "react";
import EditModalContext from "../../../store/editModal/editModal--context";
import Modal from "../Modal/Modal";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import ExpenseDataContext from "../../../store/expenseData/expenseData--context";
import CategoryContext from "../../../store/category/category--context";
import SearchListDataContext from "../../../store/searchListData/searchListData--context";
import createDateStringFormat from "../../../Others/CreateDateStringFormat/CreateDateStringFormat";
import FormBtn from "./FormBtn";
import FormPrice from "./FormPrice";
import FormDate from "./FormDate";
import FormDescription from "./FormDescription";
import FormSubCategory from "./FormSubCategory";
import FormMainCategory from "./FormMainCategory";
import FormTitle from "./FormTitle";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddDataForm.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "TYPE": {
      let mainCategoryArr, subCategoryArr;
      const categoryExpenseKeyArr = Object.keys(state.categoryExpense);
      const categoryIncomeKeyArr = Object.keys(state.categoryIncome);
      const firstCategoryExpense = Object.keys(state.categoryExpense)[0];
      const firstCategoryIncome = Object.keys(state.categoryIncome)[0];

      // Reference 1
      if (action.value === "expense") {
        mainCategoryArr = categoryExpenseKeyArr;
        subCategoryArr = state.categoryExpense[categoryExpenseKeyArr[0]];
      } else {
        mainCategoryArr = categoryIncomeKeyArr;
        subCategoryArr = state.categoryIncome[categoryIncomeKeyArr[0]];
      }

      return {
        ...state,
        type: action.value,
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

      if (state.type === "expense")
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
      let isValid = false,
        isTooLarge = false;
      if (
        action.value.trim().length > 0 &&
        !Object.is(-0, Number(action.value)) &&
        Number(action.value) >= 0
      )
        isValid = true;

      if (Number(action.value) > 1000000000000000) isTooLarge = true;

      return { ...state, isValid, isTooLarge, price: action.value };
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
  const { update } = useContext(SearchListDataContext);
  const mainCateExpenseArr = Object.keys(categoryExpense).sort(
    (a, b) => a.charCodeAt(0) - b.charCodeAt(0)
  );
  const mainCateIncomeArr = Object.keys(categoryIncome);

  // Reference 2
  let initialObj;
  if (props.oldExpenseData)
    initialObj = {
      ...props.oldExpenseData,
      mainCategoryArr:
        props.oldExpenseData.type === "expense"
          ? mainCateExpenseArr
          : mainCateIncomeArr,
      subCategoryArr:
        props.oldExpenseData.type === "expense"
          ? categoryExpense[props.oldExpenseData.mainCategory]
          : categoryIncome[props.oldExpenseData.mainCategory],
      iconObj,
      priceTouch: true,
      categoryExpense,
      categoryIncome,
    };
  else
    initialObj = {
      type: "expense",
      mainCategoryArr: mainCateExpenseArr,
      subCategoryArr: categoryExpense[mainCateExpenseArr[0]],
      mainCategory: mainCateExpenseArr[0],
      subCategory: categoryExpense[mainCateExpenseArr[0]][0],
      date:
        props.date === undefined
          ? createDateStringFormat(new Date())
          : createDateStringFormat(new Date(props.date)),
      description: "",
      price: "",
      priceTouch: false,
      isValid: false,
      isTooLarge: false,
      iconObj,
      categoryExpense,
      categoryIncome,
    };

  const [formData, formDataDispatch] = useReducer(reducer, initialObj);

  function categoryChangeHandler(e) {
    formDataDispatch({ type: "TYPE", value: e.target.value });
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

  async function formSubmitHandler(e) {
    e.preventDefault();

    const newFormData = {
      id: props.oldExpenseData ? props.oldExpenseData.id : uuidv4(),
      type: formData.type,
      mainCategory: formData.mainCategory,
      subCategory: formData.subCategory,
      time: formData.date,
      year: formData.date.slice(0, 4),
      month: formData.date.slice(5, 7),
      day: formData.date.slice(8, 10),
      description: formData.description,
      price: Number(formData.price),
    };

    // if props.oldExpenseData exist, it means it's editing the old data
    if (props.oldExpenseData) {
      editExpenseData(newFormData, props.oldExpenseData.id);
      setEditModal({
        show: true,
        type: "data",
        value: "edit",
      });

      // update UI in search list section
      if (update) update(newFormData, props.oldExpenseData.id);
    }
    // add new data
    else {
      addExpenseData(newFormData);
      setEditModal({
        show: true,
        type: "data",
        value: "add",
      });
    }

    // hide the more functionality after user edit the data
    if (props.btnMoreToggler) props.btnMoreToggler();

    props.addDataFormModalToggler();
  }

  return (
    <Modal onClick={props.addDataFormModalToggler} classModal={styles.modal}>
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <FormTitle
          type={formData.type}
          categoryChangeHandler={categoryChangeHandler}
        />

        <HorizontalLine />
        <div className={styles["form__container"]}>
          <FormMainCategory
            mainCategory={formData.mainCategory}
            type={formData.type}
            mainCategoryChangeHandler={mainCategoryChangeHandler}
            mainCategoryArr={formData.mainCategoryArr}
            edit={!(props.oldExpenseData === undefined)}
          />

          <FormSubCategory
            subCategoryChangeHandler={subCategoryChangeHandler}
            subCategory={formData.subCategory}
            subCategoryArr={formData.subCategoryArr}
            edit={!(props.oldExpenseData === undefined)}
          />

          <FormDescription
            description={formData.description}
            descriptionChangeHandler={descriptionChangeHandler}
          />

          <FormDate
            date={formData.date}
            dateChangeHandler={dateChangeHandler}
          />

          <FormPrice
            price={formData.price}
            priceTouch={formData.priceTouch}
            isValid={formData.isValid}
            isTooLarge={formData.isTooLarge}
            priceChangeHandler={priceChangeHandler}
            inputPriceTouchHandler={inputPriceTouchHandler}
          />

          <FormBtn
            addDataFormModalToggler={props.addDataFormModalToggler}
            isValid={formData.isValid}
            isTooLarge={formData.isTooLarge}
            oldExpenseData={props.oldExpenseData}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddDataForm;

/*
Reference 1
Note that do NOT directly hard code "food" or "salary"
because user may add, remove, edit main and sub category
what we want is showing the first main category, and it's sub category
*/

/*
Reference 2
the data storing in expenseDataProvider do NOT have
mainCategoryArr, subCategoryArr categoryExpense, categoryIncome, iconObj, priceTouch
but we need this data in the form, so add them
*/

const mainCategoryArr = {
  food: true,
  transportation: true,
  clothing: true,
  housing: true,
  entertainment: true,
  education: true,
  others: true,
};

// function createMainCategoryArr(categoryExpense) {
//   const categoryArr = [];
// }
