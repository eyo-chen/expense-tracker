import { useContext, useReducer, Fragment, useEffect, useState } from "react";
import CategoryContext from "../../../../../store/category/category--context";
import AddMainCategoryModal from "../../../../UI/AddMainCategoryModal/AddMainCategoryModal";
import AddingSubCategoryModal from "../../../../UI/AddingSubCategoryModal/AddingSubCategoryModal";
import DeleteCategoryModal from "../../../../UI/DeleteCategoryModal/DeleteCategoryModal";
import SettingType from "./SettingType";
import SettingMainCategory from "./SettingMainCategory";
import SettingSubCategory from "./SettingSubCategory";
import styles from "./SettingCategory.module.css";
import fetcher from "../../../../../Others/Fetcher/fetcher";

let expenseObj, incomeObj;

function reducer(state, action) {
  switch (action.type) {
    case "TYPE": {
      // update these four values when changing type
      let mainCategoryArr, subCategoryArr, mainCategory, subCategory;

      if (action.value === "expense") {
        mainCategoryArr = state.mainCategoryExpense;
        mainCategory = state.mainCategoryExpense[0];
        subCategoryArr = expenseObj[mainCategory];
        subCategory = expenseObj[mainCategory][0];
      } else {
        mainCategoryArr = state.mainCategoryIncome;
        mainCategory = state.mainCategoryIncome[0];
        subCategoryArr = incomeObj[mainCategory];
        subCategory = incomeObj[mainCategory][0];
      }

      return {
        ...state,
        type: action.value,
        mainCategoryArr,
        subCategoryArr,
        mainCategory,
        subCategory,
        // when user change the type, the editing state should be canceled
        editMainCategory: false,
        editSubCategory: false,
      };
    }

    case "CLICK_MAIN_CATEGORY": {
      let subCategoryArr, subCategory;

      if (state.type === "expense") {
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

    case "EDIT_MAIN_CATEGORY": {
      return { ...state, editMainCategory: !state.editMainCategory };
    }

    case "EDIT_SUB_CATEGORY": {
      return { ...state, editSubCategory: !state.editSubCategory };
    }

    // Reference 1
    case "DELETE_CATEGORY_MODAL": {
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

    case "ADD_MAIN_CATEGORY_MODAL": {
      return { ...state, addMainCategoryModal: !state.addMainCategoryModal };
    }

    case "ADD_SUB_CATEGORY_MODAL": {
      return { ...state, addSubCategoryModal: !state.addSubCategoryModal };
    }

    case "ADD_MAIN_CATEGORY": {
      const mainCategoryArr = state.mainCategoryArr.concat(action.value);

      if (action.typeCaregory === "expense")
        return {
          ...state,
          mainCategoryArr,
          mainCategoryExpense: mainCategoryArr,
        };
      else
        return {
          ...state,
          mainCategoryArr,
          mainCategoryIncome: mainCategoryArr,
        };
    }

    case "ADD_SUB_CATEGORY": {
      const subCategoryArr = state.subCategoryArr.concat(action.value);

      return { ...state, subCategoryArr };
    }

    // have to update several variables after deleting(For UI purpose)
    // (see the referecne 4)
    case "DELETE_CATEGORY": {
      // main category
      if (action.value === "main") {
        const mainCategoryArr = state.mainCategoryArr.filter(
          (element) => element !== state.clickingCategoryForDelete
        );

        const subCategoryArr =
          state.type === "expense"
            ? expenseObj[mainCategoryArr[0]]
            : incomeObj[mainCategoryArr[0]];

        if (action.typeCategory === "expense")
          return {
            ...state,
            mainCategoryArr,
            mainCategory: mainCategoryArr[0],
            subCategoryArr,
            subCategory: subCategoryArr[0],
            mainCategoryExpense: mainCategoryArr,
          };
        else
          return {
            ...state,
            mainCategoryArr,
            mainCategory: mainCategoryArr[0],
            subCategoryArr,
            subCategory: subCategoryArr[0],
            mainCategoryIncome: mainCategoryArr,
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
  const [curMainCategory, setCurMainCategory] = useState({});
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [mainCategoryLoading, setMainCategoryLoading] = useState(true);
  const [curSubCategory, setCurSubCategory] = useState({});
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryLoading, setSubCategoryLoading] = useState(true);

  const {
    categoryExpense,
    categoryIncome,
    deleteMainCategory,
    deleteSubCategory,
    mainCategoryExpense,
    mainCategoryIncome,
  } = useContext(CategoryContext);

  const [categoryState, categoryStateDispatch] = useReducer(reducer, {
    type: "expense",
    mainCategory: mainCategoryExpense[0],
    subCategory: categoryExpense[mainCategoryExpense[0]][0],
    mainCategoryArr: mainCategoryExpense,
    subCategoryArr: categoryExpense[mainCategoryExpense[0]],
    editMainCategory: false,
    editSubCategory: false,
    deleteModal: false,
    addMainCategoryModal: false,
    addSubCategoryModal: false,
    deleteCategoryModal: false,
    clickingCategoryForDelete: "",
    deleteMainOrSub: "main",
    mainCategoryExpense,
    mainCategoryIncome,
  });
  // make these variables connect with object because they are used in reducer function
  expenseObj = categoryExpense;
  incomeObj = categoryIncome;

  function clickEditBtnHandler(e) {
    const id = e.target.dataset.id;
    if (id === "main") categoryStateDispatch({ type: "EDIT_MAIN_CATEGORY" });
    else if (id === "sub") categoryStateDispatch({ type: "EDIT_SUB_CATEGORY" });
    else return;
  }

  function deleteModalToggler(e) {
    categoryStateDispatch({
      type: "DELETE_CATEGORY_MODAL",
      value: e?.target.dataset.id, // Reference 3
    });
  }

  function clickDeleteBtnHandler(e, type) {
    const id = e.target.dataset.id;

    // delect category from database
    if (id === "main") {
      deleteMainCategory(
        categoryState.clickingCategoryForDelete,
        categoryState.type
      );
    } else if (id === "sub") {
      deleteSubCategory(
        categoryState.clickingCategoryForDelete,
        categoryState.type,
        categoryState.mainCategory
      );
    }

    // Reference 4
    // delet the category from UI(also update other UI)
    categoryStateDispatch({
      type: "DELETE_CATEGORY",
      value: id,
      typeCategory: type,
    });
  }

  // Referecne 2
  function addMainCategoryModalToggler(e, value, type) {
    // always toggle the modal
    categoryStateDispatch({ type: "ADD_MAIN_CATEGORY_MODAL" });
  }

  function addSubCategoryModalToggler(e, value) {
    // always toggle the modal
    categoryStateDispatch({ type: "ADD_SUB_CATEGORY_MODAL" });

    // add the category if having input value(when click the add btn in modal)
    if (value) categoryStateDispatch({ type: "ADD_SUB_CATEGORY", value });
  }

  useEffect(() => {
    fetcher("v1/main-category", "GET").then((data) => {
      setMainCategoryList(data.categories);
      setMainCategoryLoading(false);
      setCurMainCategory(data.categories[0]);

      fetcher(`v1/main-category/${data.categories[0].id}/sub-category`, "GET").then((data) => {
        setSubCategoryList(data.categories);
        setSubCategoryLoading(false);
        setCurSubCategory(data.categories[0]);
      });
    }
    );
  }, []);


  return (
    <Fragment>
      {categoryState.addMainCategoryModal && (
        <AddMainCategoryModal
          type={categoryState.type}
          addMainCategoryModalToggler={addMainCategoryModalToggler}
        />
      )}
      {categoryState.addSubCategoryModal && (
        <AddingSubCategoryModal
          type={categoryState.type}
          mainCategory={categoryState.mainCategory}
          addSubCategoryModalToggler={addSubCategoryModalToggler}
        />
      )}
      {categoryState.deleteModal && (
        <DeleteCategoryModal
          type={categoryState.type}
          deleteMainOrSub={categoryState.deleteMainOrSub}
          clickingCategoryForDelete={categoryState.clickingCategoryForDelete}
          deleteModalToggler={deleteModalToggler}
          clickDeleteBtnHandler={clickDeleteBtnHandler}
        />
      )}
      <div className={styles.form}>
        <SettingType
          type={categoryState.type}
          categoryStateDispatch={categoryStateDispatch}
        />
        <SettingMainCategory
          categoryList={mainCategoryList}
          curMainCategory={curMainCategory}
          setCurMainCategory={setCurMainCategory}
          loading={mainCategoryLoading}
          categoryState={categoryState}
          categoryStateDispatch={categoryStateDispatch}
          clickEditBtnHandler={clickEditBtnHandler}
          deleteModalToggler={deleteModalToggler}
          addMainCategoryModalToggler={addMainCategoryModalToggler}
        />
        <SettingSubCategory
          categoryList={subCategoryList}
          curSubCategory={curSubCategory}
          setCurSubCategory={setCurSubCategory}
          loading={subCategoryLoading}
          categoryState={categoryState}
          categoryStateDispatch={categoryStateDispatch}
          clickEditBtnHandler={clickEditBtnHandler}
          deleteModalToggler={deleteModalToggler}
          addSubCategoryModalToggler={addSubCategoryModalToggler}
        />
      </div>
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

/*
Reference 3
Note that this function would be triggerd in multiple places
Like in delete btn of both main and sub category
AND also in the backdrop 
Now the question is how do we invoke this function in the Backdrop component
Here
if (e.target.dataset.id === "backdrop" && props.onClick) props.onClick();
We invoke function here => props.onClick()
So now e is undefined
we have to put ? to avoid potential error happen
*/

/*
Reference 4

Why we still need categoryStateDispatch({ type: "DELETE_CATEGORY", value: id })
even tho we have deleted the category by the function in provider?

Because for the UI purpose!!

Both deleteMainCategory and deleteSubCategory are the function in provider
These two functions delete the category from database
However, this is nothing to do with the UI
which means we indeed delete the category from database
But we did NOT show that action in UI

We need to do couple things after delete the category
Here, we only mention the UI purpose

If delete the main category,
1. creat new main category array
2. create new sub category array
   => because sub category array is also deleted after deleting main category
3. choose the first element of new main category array as selected
   => why?
   => because it's weird the selected color just disappear after deleting
   => again, for the UI purpose
   => For example, now user select food
   => and user wanna delete the food main category
   => after deleting, the food category disappear
   => now we have to select sth new
   => so we just say we always wanna select the first element in the new main category array
   => I don't care what's that, just select
   => user will change the select the category he wants 
4. choose the first element of new sub category array as selected
   => same as above
   => new sub category is created
   => so just defaul select the first element of new sub category

If delete the main category,
1. create new sub category array
2. choose the first element of new sub category array as selected
*/
