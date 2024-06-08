import { useReducer, Fragment, useEffect, useState } from "react";
import AddMainCategoryModal from "../../../../UI/AddMainCategoryModal/AddMainCategoryModal";
import AddingSubCategoryModal from "../../../../UI/AddingSubCategoryModal/AddingSubCategoryModal";
import DeleteCategoryModal from "../../../../UI/DeleteCategoryModal/DeleteCategoryModal";
import SettingType from "./SettingType";
import SettingMainCategory from "./SettingMainCategory";
import SettingSubCategory from "./SettingSubCategory";
import styles from "./SettingCategory.module.css";
import fetcher from "../../../../../Others/Fetcher/fetcher";

function mainCategoryReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        list: action.value,
        curData: action.value?.length > 0 ? action.value[0] : {},
      };
    }

    case "SET_CUR_DATA": {
      return { ...state, curData: action.value };
    }

    case "START_LOADING": {
      return { ...state, loading: true };
    }

    case "FINISH_LOADING": {
      return { ...state, loading: false };
    }

    case "ADD_MODAL_TOGGLER": {
      return { ...state, addModal: !state.addModal };
    }

    case "EDIT_TOGGLER": {
      return { ...state, edit: !state.edit };
    }

    case "CLOSE_EDIT": {
      return { ...state, edit: false };
    }

    case "EMPTY": {
      return { ...state, list: [], curData: {}};
    }

    default: {
      return state;
    }
  }
}

function subCategoryReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        list: action.value,
        curData: action.value?.length > 0 ? action.value[0] : {},
      };
    }

    case "SET_CUR_DATA": {
      return { ...state, curData: action.value };
    }

    case "START_LOADING": {
      return { ...state, loading: true };
    }

    case "FINISH_LOADING": {
      return { ...state, loading: false };
    }

    case "ADD_MODAL_TOGGLER": {
      return { ...state, addModal: !state.addModal };
    }

    case "EDIT_TOGGLER": {
      return { ...state, edit: !state.edit };
    }

    case "CLOSE_EDIT": {
      return { ...state, edit: false };
    }

    case "EMPTY": {
      return { ...state, list: [], curData: {}};
    }

    default: {
      return state;
    }
  }
}

function SettingCategory() {
  const [curType, setCurType] = useState("expense");
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    curCategory: {},
    deleteMainOrSub: "",
  });
  const [mainCategoryState, mainCategoryDispatch] = useReducer(mainCategoryReducer, {
    list: [],
    curData: {},
    loading: true,
    addModal: false,
    edit: false,
  });
  const [subCategoryState, subCategoryDispatch] = useReducer(subCategoryReducer, {
    list: [],
    curData: {},
    loading: true,
    addModal: false,
    edit: false,
  });

  function deleteModalToggler(e) {
    // in delete modal, there's no e
    const mainOrSub = e?.target?.dataset?.id;

    // close the modal
    if (mainOrSub === "") {
      setDeleteModal((prev) => {
        return { 
          show: false,
          curCategory: {},
          deleteMainOrSub: "",
        };
      });
      return;
    }

    // open the modal
    const curData = mainOrSub === "main" ? mainCategoryState.curData : subCategoryState.curData;
    setDeleteModal((prev) => {
      return {
        ...prev,
        show: !prev.show,
        curCategory: curData,
        deleteMainOrSub: mainOrSub,
      };
    });
  }

  // get main category when the component is mounted or the type is changed
  useEffect(() => {
    mainCategoryDispatch({ type: "START_LOADING" });

    getMainCategory(curType).then((data) => {
      if (data.length === 0) {
        mainCategoryDispatch({ type: "EMPTY" });
        return;
      }

      mainCategoryDispatch({ type: "ADD", value: data });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    }).finally(() => {
      mainCategoryDispatch({ type: "FINISH_LOADING" });
    });
  }, [curType]);

  // get sub category when the main category is changed
  useEffect(() => {
    if (!mainCategoryState.curData.id) {
      subCategoryDispatch({ type: "EMPTY" });
      return;
    }
    
    subCategoryDispatch({ type: "START_LOADING" });

    getSubCategory(mainCategoryState.curData.id).then((data) => {
      if (!data || data.length === 0) {
        subCategoryDispatch({ type: "EMPTY" });
        return;
      }

      subCategoryDispatch({ type: "ADD", value: data });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    }).finally(() => {
      subCategoryDispatch({ type: "FINISH_LOADING" });
    });
  }
  , [mainCategoryState.curData]);


  return (
    <Fragment>
      {mainCategoryState.addModal && (
        <AddMainCategoryModal
          curType={curType}
          state={mainCategoryState}
          dispatch={mainCategoryDispatch}
          getMainCategory={getMainCategory}
        />
      )}
      {subCategoryState.addModal && (
        <AddingSubCategoryModal
          curType={curType}
          curMainCategory={mainCategoryState.curData}
          state={subCategoryState}
          dispatch={subCategoryDispatch}
          getSubCategory={getSubCategory}
        />
      )}
      {deleteModal.show && (
        <DeleteCategoryModal
          curType={curType}
          curCategory={deleteModal.curCategory}
          mainOrSub={deleteModal.deleteMainOrSub}
          deleteModalToggler={deleteModalToggler}
        />
      )}
      <div className={styles.form}>
        <SettingType
          curType={curType}
          setCurType={setCurType}
          mainCategoryDispatch={mainCategoryDispatch}
          subCategoryDispatch={subCategoryDispatch}
        />
        <SettingMainCategory
          curType={curType}
          state={mainCategoryState}
          dispatch={mainCategoryDispatch}
          subCategoryDispatch={subCategoryDispatch}
          deleteModalToggler={deleteModalToggler}
        />
        <SettingSubCategory
          curType={curType}
          state={subCategoryState}
          dispatch={subCategoryDispatch}
          deleteModalToggler={deleteModalToggler}
        />
      </div>
    </Fragment>
  );
}

export default SettingCategory;

async function getMainCategory(type) {
  try {
    const data = await fetcher(`v1/main-category?type=${type}`, "GET");
    return data.categories;
  } catch (err) {
    throw err;
  }
}

async function getSubCategory(mainCategoryId) {
  try {
    const data = await fetcher(
      `v1/main-category/${mainCategoryId}/sub-category`,
      "GET"
    );

    return data.categories;
  } catch (err) {
    throw err;
  }
}

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
