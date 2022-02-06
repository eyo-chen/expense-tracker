import { useContext, useReducer, Fragment } from "react";
import CategoryContext from "../../../../../store/category/category--context";
import AddMainCategoryModal from "../../../../UI/AddMainCategoryModal/AddMainCategoryModal";
import AddingSubCategoryModal from "../../../../UI/AddingSubCategoryModal/AddingSubCategoryModal";
import DeleteCategoryModal from "../../../../UI/DeleteCategoryModal/DeleteCategoryModal";
import SettingType from "./SettingType";
import SettingMainCategory from "./SettingMainCategory";
import SettingSubCategory from "./SettingSubCategory";
import style from "./SettingCategory.module.css";

let expenseObj, incomeObj;

function reducer(state, action) {
  switch (action.type) {
    case "TYPE": {
      // update these four values when chaning type
      let mainCategoryArr, subCategoryArr, mainCategory, subCategory;

      if (action.value === "expense") {
        const expenseKeyArr = Object.keys(expenseObj);

        mainCategoryArr = expenseKeyArr;
        mainCategory = expenseKeyArr[0];
        subCategoryArr = expenseObj[mainCategory];
        subCategory = expenseObj[mainCategory][0];
      } else {
        const incomeKeyArr = Object.keys(incomeObj);

        mainCategoryArr = incomeKeyArr;
        mainCategory = incomeKeyArr[0];
        subCategoryArr = incomeObj[mainCategory];
        subCategory = incomeObj[mainCategory][0];
      }

      return {
        ...state,
        category: action.value,
        mainCategoryArr,
        subCategoryArr,
        mainCategory,
        subCategory,
        // whenever use change the category, the editing state should be canceled
        editMainCategory: false,
        editSubCategory: false,
      };
    }

    case "CLICK_MAIN_CATEGORY": {
      let subCategoryArr, subCategory;

      if (state.category === "expense") {
        subCategoryArr = expenseObj[action.value];
        subCategory = expenseObj[action.value][0];
      } else {
        subCategoryArr = incomeObj[action.value];
        subCategory = incomeObj[action.value][0];
      }

      return {
        ...state,
        mainCategory: action.value,
        subCategoryArr,
        subCategory,
      };
    }

    case "CLICK_SUB_CATEGORY": {
      return { ...state, subCategory: action.value };
    }

    case "EDIT_MAIN_CATEGORY_STATE": {
      return { ...state, editMainCategory: !state.editMainCategory };
    }

    case "EDIT_SUB_CATEGORY_STATE": {
      return { ...state, editSubCategory: !state.editSubCategory };
    }

    // Reference 1
    case "DELETE_CATEGORY_MODAL_TOGGLER": {
      if (state.deleteModal)
        return { ...state, deleteModal: false, clickingCategoryForDelete: "" };
      else {
        let clickingCategoryForDelete = state.subCategory;
        if (action.value === "main")
          clickingCategoryForDelete = state.mainCategory;

        return {
          ...state,
          deleteModal: true,
          clickingCategoryForDelete,
          deleteMainOrSub: action.value,
        };
      }
    }

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

    // have to update several variables after deleting(For UI purpose)
    case "DELETE_CATEGORY": {
      // main category
      if (action.value === "main") {
        const mainCategoryArr = state.mainCategoryArr.filter(
          (element) => element !== state.clickingCategoryForDelete
        );

        return {
          ...state,
          mainCategoryArr,
          mainCategory: mainCategoryArr[0],
          subCategoryArr:
            state.category === "expense"
              ? expenseObj[mainCategoryArr[0]]
              : incomeObj[mainCategoryArr[0]],
          subCategory:
            state.category === "expense"
              ? expenseObj[mainCategoryArr[0]][0]
              : incomeObj[mainCategoryArr[0]][0],
        };
      }
      // sub category
      else if (action.value === "sub") {
        const subCategoryArr = state.subCategoryArr.filter(
          (element) => element !== state.clickingCategoryForDelete
        );

        return {
          ...state,
          subCategoryArr,
          subCategory: subCategoryArr[0],
        };
      } else return state;
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
    editMainCategory: false,
    editSubCategory: false,
    deleteModal: false,
    addMainCategoryModal: false,
    addSubCategoryModal: false,
    deleteCategoryModal: false,
    clickingCategoryForDelete: "",
    deleteMainOrSub: "main",
  });
  // make these variables connect with object because they are used in reducer function
  expenseObj = categoryExpense;
  incomeObj = categoryIncome;

  function clickEditBtnHandler(e) {
    const id = e.target.dataset.id;
    if (id === "main")
      categoryStateDispatch({ type: "EDIT_MAIN_CATEGORY_STATE" });
    else if (id === "sub")
      categoryStateDispatch({ type: "EDIT_SUB_CATEGORY_STATE" });
    else return;
  }

  function deleteModalToggler(e) {
    categoryStateDispatch({
      type: "DELETE_CATEGORY_MODAL_TOGGLER",
      value: e.target.dataset.id,
    });
  }

  function clickDeleteBtnHandler(e) {
    const id = e.target.dataset.id;

    if (id === "main") {
      removeMainCategory(
        categoryState.clickingCategoryForDelete,
        categoryState.category
      );
    } else if (id === "sub") {
      removeSubCategory(
        categoryState.clickingCategoryForDelete,
        categoryState.category,
        categoryState.mainCategory
      );
    }

    categoryStateDispatch({ type: "DELETE_CATEGORY", value: id });

    return;
  }

  // Referecne 2
  function addMainCategoryModalToggler(e, value) {
    categoryStateDispatch({ type: "ADD_MAIN_CATEGORY_STATE" });

    if (value) categoryStateDispatch({ type: "ADD_MAIN_CATEGORY", value });
  }

  function addSubCategoryModalToggler(e, value) {
    categoryStateDispatch({ type: "ADD_SUB_CATEGORY_STATE" });

    if (value) categoryStateDispatch({ type: "ADD_SUB_CATEGORY", value });
  }

  return (
    <Fragment>
      {categoryState.addMainCategoryModal && (
        <AddMainCategoryModal
          category={categoryState.category}
          addMainCategoryModalToggler={addMainCategoryModalToggler}
        />
      )}
      {categoryState.addSubCategoryModal && (
        <AddingSubCategoryModal
          category={categoryState.category}
          mainCategory={categoryState.mainCategory}
          addSubCategoryModalToggler={addSubCategoryModalToggler}
        />
      )}
      {categoryState.deleteModal && (
        <DeleteCategoryModal
          deleteMainOrSub={categoryState.deleteMainOrSub}
          clickingCategoryForDelete={categoryState.clickingCategoryForDelete}
          deleteModalToggler={deleteModalToggler}
          clickDeleteBtnHandler={clickDeleteBtnHandler}
        />
      )}
      <form className={style.form}>
        <div className={style["form__list"]}>
          <SettingType
            category={categoryState.category}
            categoryStateDispatch={categoryStateDispatch}
          />
          <SettingMainCategory
            categoryState={categoryState}
            categoryStateDispatch={categoryStateDispatch}
            clickEditBtnHandler={clickEditBtnHandler}
            deleteModalToggler={deleteModalToggler}
            addMainCategoryModalToggler={addMainCategoryModalToggler}
          />
          <SettingSubCategory
            categoryState={categoryState}
            categoryStateDispatch={categoryStateDispatch}
            clickEditBtnHandler={clickEditBtnHandler}
            deleteModalToggler={deleteModalToggler}
            addSubCategoryModalToggler={addSubCategoryModalToggler}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default SettingCategory;

/*
Reference 1
This part of code does three things
1. toggle the delete category modal
=> that's why first check if state.removeModal it's true or false

2. set clickingCategoryForDelete
=> note that both main and sub category share one delete modal
=> first add data-id on both delete btn, respectively "main" and "sub"
=> so that we can know which btn is user clicking
=> and know that what category does user wanna delete
=> if the data-id of btn is "main", then user wanna delete current selected main category
=> so does sub category

3. set deleteMainOrSub
=> to keep tracking what does user wanna delete ("main" or "sub")
=> note that both main and sub category share one delete modal
=> we need the variable to pass into the DeleteCategoryModal
=> to have further operation
    (1) to know that expenseData list should show in the modal
    (2) to know what category is about to delete when user clicking the delete btn in the modal
*/

/*
Referecne 2
These two functions do two things respectively
1) toggle the adding main or sub categeory modal state
   (show and close the modal)
2) add the category 
   (this will only invoke when there's value which is the name of new category)
*/
