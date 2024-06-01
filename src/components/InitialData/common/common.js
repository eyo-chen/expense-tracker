import { useState } from "react";
import Modal from "./../../../components/UI/Modal/Modal";
import SubTitle from "./../../../components/UI/SubTitle/SubTitle";
import Button from "./../../../components/UI/Button/Button";
import styles from "./common.module.css";
import AddMainCategoryModal from "../AddMainCategory/AddMainCategory";
import AddSubCategoryModal from "../AddSubCategory/AddSubCategory";

function Common(props) {
  const [curMainCategoryIndex, setCurMainCategoryIndex] = useState(0);
  const [curSubCategoryIndex, setCurSubCategoryIndex] = useState(0);
  const [isAddingMainCategory, setIsAddingMainCategory] = useState(false);
  const [isAddingSubCategory, setIsAddingSubCategory] = useState(false);

  function mainCategoryClickHandler(index) {
    setCurMainCategoryIndex(index);
    setCurSubCategoryIndex(0);
  }

  function addMainCategoryModalToggler() {
    setIsAddingMainCategory((prev) => !prev);
  }

  function addSubCategoryModalToggler() {
    setIsAddingSubCategory((prev) => !prev);
  }

  function addMainCategoryHandler(name, icon) {
    // add main category
    const newMainCategory = {
      name,
      icon,
      sub_categories: [],
    };
    props.categoryChangeHandler([...props.mainCategoryList, newMainCategory]);

    // reset current main category index
    const newIndex = props.mainCategoryList?.length;
    setCurMainCategoryIndex(newIndex);
  }

  function addSubCategoryHandler(name) {
    // add sub category
    const newSubCategoryList = [...props.mainCategoryList[curMainCategoryIndex].sub_categories, name];
    const newMainCategory = {
      ...props.mainCategoryList[curMainCategoryIndex],
      sub_categories: newSubCategoryList,
    };
    const newMainCategoryList = props.mainCategoryList?.map((category, index) => {
      if (index === curMainCategoryIndex) {
        return newMainCategory;
      }
      return category;
    });

    props.categoryChangeHandler(newMainCategoryList);

    // reset current sub category index
    const newIndex = props.mainCategoryList[curMainCategoryIndex].sub_categories.length;
    setCurSubCategoryIndex(newIndex);
  }

  function deleteMainCategoryHandler() {
    // delete main category
    const newMainCategoryList = props.mainCategoryList?.filter((_, i) => i !== curMainCategoryIndex);
    props.categoryChangeHandler(newMainCategoryList);

    // reset current main category index
    const newIndex = curMainCategoryIndex === 0 ? 0 : curMainCategoryIndex - 1;
    setCurMainCategoryIndex(newIndex);
  }

  function deleteSubCategoryHandler() {
    // delete sub category
    const newSubCategoryList = props.mainCategoryList[curMainCategoryIndex].sub_categories.filter((_, i) => i !== curSubCategoryIndex);
    const newMainCategory = {
      ...props.mainCategoryList[curMainCategoryIndex],
      sub_categories: newSubCategoryList,
    };
    const newMainCategoryList = props.mainCategoryList?.map((category, index) => {
      if (index === curMainCategoryIndex) {
        return newMainCategory;
      }
      return category;
    });
    props.categoryChangeHandler(newMainCategoryList);

    // reset current sub category index
    const newIndex = curSubCategoryIndex === 0 ? 0 : curSubCategoryIndex - 1;
    setCurSubCategoryIndex(newIndex);
  }

  function resetIndex() {
    setCurMainCategoryIndex(0);
    setCurSubCategoryIndex(0);
  }

  function nextBtnClickHandler() {
    resetIndex();
    props.nextBtnClickHandler();
  }

  function prevBtnClickHandler() {
    resetIndex();
    props.prevBtnClickHandler();
  }

  const mainCategoryList = props.mainCategoryList?.map((data, index) => {
    return (
      <div 
        key={data.name}
        onClick={() => mainCategoryClickHandler(index)}
        className={`${styles.item}  ${
          index === curMainCategoryIndex
          ? props.type === "EXPENSE"
            ? styles["item--active--expense"]
            : styles["item--active--income"]
          : ""
      }`}
      >
        <div className={styles["item__cover"]} data-id={index}></div>
        <span className={styles["item__icon"]}>
          <img
            alt={data.name}
            className={`icon ${styles["img__icon"]}`}
            src={data.icon.url}
          />
        </span>
        <span>{data.name}</span>
      </div>
    )
  });
  const mainCategoryNameList = props.mainCategoryList?.map(({name}) => name)

  const subCategoryList = !props.mainCategoryList ? 
    [] :
    props.mainCategoryList[curMainCategoryIndex]?.sub_categories?.map((data, index) => {
    return (
      <div
        key={data}
        onClick={() => setCurSubCategoryIndex(index)}
        className={`${styles.item}  ${
          index === curSubCategoryIndex
          ? props.type === "EXPENSE"
            ? styles["item--active--expense"]
            : styles["item--active--income"]
          : ""
        }`}
      >
        <span>{data}</span>
      </div>
    );
  });
  const subCategoryNameList = !props.mainCategoryList ?
    [] : props.mainCategoryList[curMainCategoryIndex]?.sub_categories

  return <>
    {isAddingMainCategory && 
      <AddMainCategoryModal
        type={props.type} 
        categoryNameList={mainCategoryNameList}
        addMainCategoryModalToggler={addMainCategoryModalToggler}
        addMainCategoryHandler={addMainCategoryHandler}
      />
    }
    {isAddingSubCategory &&
      <AddSubCategoryModal
        categoryNameList={subCategoryNameList}
        curMainCategory={props.mainCategoryList[curMainCategoryIndex]}
        addSubCategoryModalToggler={addSubCategoryModalToggler}
        addSubCategoryHandler={addSubCategoryHandler}
      />
    }
    <Modal classModal={`${styles.modal}`}>
        <SubTitle className={styles.subtitle}>{props.subTitle}</SubTitle>
        <div className={styles.container}>
          <div className={styles["main-category--container"]}>
            <div className={styles["category-title"]}>Main Category</div>
            <div className={styles["main-category--inner-container"]}>
              {mainCategoryList}
            </div>
            <div className={styles["btn-container"]}>
              <Button className={styles.btn} onClick={addMainCategoryModalToggler}>add</Button>
              <Button className={styles.btn} onClick={deleteMainCategoryHandler}>delete</Button>
            </div>
          </div>
          <div className={styles["sub-category--container"]}>
            <div className={styles["category-title"]}>Sub Category</div>
            <div className={styles["sub-category--inner-container"]}>
              {subCategoryList}
            </div>
            <div className={styles["btn-container"]}>
              <Button className={styles.btn} onClick={addSubCategoryModalToggler} >add</Button>
              <Button className={styles.btn} onClick={deleteSubCategoryHandler}>delete</Button>
            </div>
          </div>
        </div>
        <div className={styles["state-btn-container"]}>
          {props.type === "INCOME" && <Button className={styles.btn} onClick={prevBtnClickHandler}>Prev</Button>}
          <Button className={styles.btn} onClick={nextBtnClickHandler}>Next</Button>
        </div>
        <p className={styles.note}>You can still customize your category data later</p>
      </Modal>
  </>
}

export default Common;