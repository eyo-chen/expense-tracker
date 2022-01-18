import { useContext, useReducer, Fragment, useEffect } from "react";
import CategoryContext from "../../../../../store/category/category--context";
import InputRadio from "../../../../UI/InputRadio/InputRadio";
import Button from "../../../../UI/Button";
import AddMainCategoryModal from "../../../../UI/AddMainCategoryModal/AddMainCategoryModal";
import AddingSubCategoryModal from "../../../../UI/AddingSubCategoryModal/AddingSubCategoryModal";
import DeleteCategoryModal from "../../../../UI/DeleteCategoryModal/DeleteCategoryModal";
import style from "./SettingCategory.module.css";

let expenseObj, incomeObj;

function reducer(state, action) {
  switch (action.type) {
    case "FIRST_CATEGORY": {
      let mainCategoryArr, subCategoryArr, mainCategory;

      if (action.value === "expense") {
        const expenseKeyArr = Object.keys(expenseObj);

        mainCategoryArr = expenseKeyArr;
        subCategoryArr = expenseObj[expenseKeyArr[0]];
        mainCategory = expenseKeyArr[0];
      } else {
        const incomeKeyArr = Object.keys(incomeObj);

        mainCategoryArr = incomeKeyArr;
        subCategoryArr = incomeObj[incomeKeyArr[0]];
        mainCategory = incomeKeyArr[0];
      }

      return {
        ...state,
        category: action.value,
        mainCategoryArr,
        subCategoryArr,
        mainCategory,

        // whenever use change the category, the removing state should be canceled
        removeMain: false,
        removeSub: false,
      };
    }

    case "MAIN_CATEGORY": {
      let subCategoryArr;

      if (state.category === "expense")
        subCategoryArr = expenseObj[action.value];
      else subCategoryArr = incomeObj[action.value];

      return { ...state, subCategoryArr, mainCategory: action.value };
    }

    case "REMOVE_MAIN_CATEGORY_STATE": {
      return { ...state, removeMain: !state.removeMain };
    }

    case "REMOVE_SUB_CATEGORY_STATE": {
      return { ...state, removeSub: !state.removeSub };
    }

    // case "REMOVE_MAIN_CATEGORY": {
    //   const mainCategoryArr = state.mainCategoryArr.filter(
    //     (element) => element !== action.value
    //   );

    //   return { ...state, mainCategoryArr };
    // }

    // case "REMOVE_SUB_CATEGORY": {
    //   const subCategoryArr = state.subCategoryArr.filter(
    //     (element) => element !== action.value
    //   );

    //   return { ...state, subCategoryArr };
    // }

    case "ADD_MAIN_CATEGORY_STATE": {
      return { ...state, addMainCategoryModal: !state.addMainCategoryModal };
    }

    case "ADD_SUB_CATEGORY_STATE": {
      return { ...state, addSubCategoryModal: !state.addSubCategoryModal };
    }

    case "ADD_MAIN_CATEGORY": {
      const mainCategoryArr = state.mainCategoryArr.concat(action.value);

      return { ...state, mainCategoryArr };
    }

    case "ADD_SUB_CATEGORY": {
      const subCategoryArr = state.subCategoryArr.concat(action.value);

      return { ...state, subCategoryArr };
    }

    case "DELETE_CATEGORY_MODAL": {
      return {
        ...state,
        deleteCategoryModal: !state.deleteCategoryModal,
        clickingCategoryForDelete: action.value,
      };
    }

    case "DELETE_CATEGORY": {
      // main category
      if (state.mainCategoryArr.includes(action.value)) {
        const mainCategoryArr = state.mainCategoryArr.filter(
          (element) => element !== action.value
        );

        /*
        here is very important

        isSame variable tracking
        if the current chosen category is as same as the user's gonna delete

        for example,
        user now may choose food, and food category is now labeled blue
        but once user click the "remove" button, then the remove state is showing
        all the category now will have "x" button, which means we allow user to delete every category, not necessary the currently choosing category
        so, the situation may be user choose the food category, and show it's subcategory
        then remove clothing category
        
        */
        const isSame = state.mainCategory === state.clickingCategoryForDelete;

        /*
        if the chossing category is as same as deleting category
        then make main category to be whatever the first element in the main category array, so does sub category

        if it's not, then we do nothing

        it's very important we do this for the user
        if the chossing category is as same as deleting category,
        and we do nothing,
        then there's no element labeling blue after deletion
        and the sub category element would still be the old, deleted one

        for example, food is deleted,
        but subcategory may still show food's subcategory, which is very weird
        */

        return {
          ...state,
          mainCategoryArr,
          mainCategory: isSame ? mainCategoryArr[0] : state.mainCategory,

          /*
          if isSame variable is true,
          then we want to dynamically change the sub category
          based on if now it's expense or income
          */
          subCategoryArr: isSame
            ? state.category === "expense"
              ? expenseObj[mainCategoryArr[0]]
              : incomeObj[mainCategoryArr[0]]
            : state.subCategoryArr,
        };
      }
      // sub category
      else {
        const subCategoryArr = state.subCategoryArr.filter(
          (element) => element !== action.value
        );

        return {
          ...state,
          subCategoryArr,
        };
      }
    }

    case "CLOSE_DELETE_MODAL": {
      return { ...state, deleteCategoryModal: !state.deleteCategoryModal };
    }

    default: {
      return state;
    }
  }
}

function SettingCategory() {
  const {
    categoryExpense,
    categoryIncome,
    removeMainCategory,
    removeSubCategory,
  } = useContext(CategoryContext);
  const [categoryState, categoryStateDispatch] = useReducer(reducer, {
    category: "expense",
    mainCategory: Object.keys(categoryExpense)[0],
    mainCategoryArr: Object.keys(categoryExpense),
    subCategory: categoryExpense[Object.keys(categoryExpense)[0]][0],
    subCategoryArr: categoryExpense[Object.keys(categoryExpense)[0]],
    removeMain: false,
    removeSub: false,
    addMainCategoryModal: false,
    addSubCategoryModal: false,
    deleteCategoryModal: false,
    clickingCategoryForDelete: "",
  });

  // let these variables connect with object because they are used in reducer function
  expenseObj = categoryExpense;
  incomeObj = categoryIncome;

  const mainDataContent = categoryState.mainCategoryArr.map((element) => (
    <div
      className={`${style.data}  ${
        element === categoryState.mainCategory
          ? categoryState.category === "expense"
            ? style["data--active--expense"]
            : style["data--active--income"]
          : ""
      } ${categoryState.removeMain && style["data--remove"]}`}
      key={element}
    >
      <span onClick={mainCategoryClickHandler}>{element}</span>
      {categoryState.removeMain && (
        <span>
          <Button
            onClick={deleteIconClickHandler}
            className={style["btn--remove"]}
            type="button"
            dataID={element}
          >
            x
          </Button>
        </span>
      )}
    </div>
  ));

  const subDataContent = categoryState.subCategoryArr.map((element) => (
    <div
      className={`${style.data}  ${
        categoryState.removeSub && style["data--remove"]
      } `}
      key={element}
    >
      <span>{element}</span>
      {categoryState.removeSub && (
        <span>
          <Button
            onClick={deleteIconClickHandler}
            className={style["btn--remove"]}
            type="button"
            dataID={element}
          >
            x
          </Button>
        </span>
      )}
    </div>
  ));

  // expense & income
  function categoryChangeHandler(e) {
    categoryStateDispatch({ type: "FIRST_CATEGORY", value: e.target.value });
  }

  // based on main categoey, show the corresponding sub category
  function mainCategoryClickHandler(e) {
    categoryStateDispatch({
      type: "MAIN_CATEGORY",
      value: e.target.textContent,
    });
  }

  function removeBtnMainCategoryStateClickHandler() {
    categoryStateDispatch({
      type: "REMOVE_MAIN_CATEGORY_STATE",
    });
  }

  function removeBtnSubCategoryStateClickHandler() {
    categoryStateDispatch({
      type: "REMOVE_SUB_CATEGORY_STATE",
    });
  }

  function deleteIconClickHandler(e) {
    categoryStateDispatch({
      type: "DELETE_CATEGORY_MODAL",
      value: e.target.dataset.id,
    });
  }

  function deleteCategory() {
    categoryStateDispatch({
      type: "DELETE_CATEGORY",
      value: categoryState.clickingCategoryForDelete,
    });

    // main category
    if (
      categoryState.mainCategoryArr.includes(
        categoryState.clickingCategoryForDelete
      )
    )
      removeMainCategory(
        categoryState.clickingCategoryForDelete,
        categoryState.category
      );
    // sub category
    else
      removeSubCategory(
        categoryState.clickingCategoryForDelete,
        categoryState.category,
        categoryState.mainCategory
      );
  }

  function closeDeleteModal() {
    categoryStateDispatch({
      type: "CLOSE_DELETE_MODAL",
    });
  }

  /*
  These two functions do two things respectively
  1) toggle the adding main or sub categeory modal state
     (show and close the modal)
  2) add the category 
     (this will only invoke when there's value which is the name of new category)
  */
  function addMainCategoryAndModal(e, value) {
    categoryStateDispatch({ type: "ADD_MAIN_CATEGORY_STATE" });

    if (value) categoryStateDispatch({ type: "ADD_MAIN_CATEGORY", value });
  }

  function addSubCategoryAndModal(e, value) {
    categoryStateDispatch({ type: "ADD_SUB_CATEGORY_STATE" });

    if (value) categoryStateDispatch({ type: "ADD_SUB_CATEGORY", value });
  }

  return (
    <Fragment>
      {categoryState.addMainCategoryModal && (
        <AddMainCategoryModal
          category={categoryState.category}
          addMainCategoryAndModal={addMainCategoryAndModal}
        />
      )}
      {categoryState.addSubCategoryModal && (
        <AddingSubCategoryModal
          category={categoryState.category}
          mainCategory={categoryState.mainCategory}
          addSubCategoryAndModal={addSubCategoryAndModal}
        />
      )}
      {categoryState.deleteCategoryModal && (
        <DeleteCategoryModal
          category={categoryState.category}
          clickingCategoryForDelete={categoryState.clickingCategoryForDelete}
          mainCategoryArr={categoryState.mainCategoryArr}
          subCategoryArr={categoryState.subCategoryArr}
          deleteCategory={deleteCategory}
          closeDeleteModal={closeDeleteModal}
        />
      )}
      <form className={style.form}>
        <div className={style["form__list"]}>
          <div className={style.category}>
            <InputRadio
              classContainer={style["radio__container"]}
              classInput={style.input}
              classLabel={`${style.labelBlue} ${style.label}`}
              classCheck={style.check}
              id="expense"
              name="category"
              value="expense"
              label="expense"
              checked={categoryState.category === "expense"}
              onChange={categoryChangeHandler}
            />
            <InputRadio
              classContainer={style["radio__container"]}
              classInput={style.input}
              classLabel={`${style.labelPink} ${style.label}`}
              classCheck={style.check}
              id="income"
              name="category"
              value="income"
              label="income"
              checked={categoryState.category === "income"}
              onChange={categoryChangeHandler}
            />
          </div>
          <div className={style.container}>
            <div className={style["subtitle__container"]}>
              <p className={style.subtitle}>main category</p>
            </div>
            <div className={style["data__container"]}>{mainDataContent}</div>
            <div className={style["btn__container"]}>
              <Button
                onClick={removeBtnMainCategoryStateClickHandler}
                type="button"
                className={style.btn}
              >
                remove
              </Button>
              <Button
                onClick={addMainCategoryAndModal}
                type="button"
                className={style.btn}
              >
                add
              </Button>
            </div>
          </div>
          <div className={style.container}>
            <div className={style["subtitle__container"]}>
              <p className={style.subtitle}>sub category</p>
            </div>
            <div className={style["data__container"]}>{subDataContent}</div>
            <div className={style["btn__container"]}>
              <Button
                onClick={removeBtnSubCategoryStateClickHandler}
                type="button"
                className={style.btn}
              >
                remove
              </Button>
              <Button
                onClick={addSubCategoryAndModal}
                type="button"
                className={style.btn}
              >
                add
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default SettingCategory;
