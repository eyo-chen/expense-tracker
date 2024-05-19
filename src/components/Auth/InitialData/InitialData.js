import { useState, useEffect } from "react";
import Modal from "../../UI/Modal/Modal";
import SubTitle from "../../UI/SubTitle/SubTitle";
import Button from "../../UI/Button/Button";
import styles from "./InitialData.module.css";
import fetcher from "../../../Others/Fetcher/fetcher";
import AddMainCategoryModal from "./AddMainCategory/AddMainCategory";

function InitialData(props) {
  const [initData, setInitData] = useState({
    expense: [],
    income: [],
  });
  const [curMainCategoryIndex, setCurMainCategoryIndex] = useState(0);
  const [curSubCategoryIndex, setCurSubCategoryIndex] = useState(0);
  const [isAddingMainCategory, setIsAddingMainCategory] = useState(false);

  useEffect(() => {
    fetchInitData()
    .then((data) => {
      setInitData(data)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }
  , []);

  const mainCategoryList = initData.expense.map((category, index) => {
    return (
      <div 
        key={category.name}
        onClick={() => mainCategoryClickHandler(index)}
        className={`${styles.item}  ${
          index === curMainCategoryIndex
          ? props.curType === "expense"
            ? styles["item--active--expense"]
            : styles["item--active--income"]
          : ""
      }`}
      >
        <div className={styles["item__cover"]} data-id={index}></div>
        <span className={styles["item__icon"]}>
          <img
            alt={category.name}
            className={`icon ${styles["img__icon"]}`}
            src={category.icon.url}
          />
        </span>
        <span>{category.name}</span>
      </div>
    );
  });

  const mainCategoryNameList = initData.expense.map(({name}) => name)

  const subCategoryList = initData.expense[curMainCategoryIndex]?.sub_categories.map((category, index) => {
    return (
      <div 
        key={category}
        onClick={() => subCategoryClickHandler(index)}
        className={`${styles.item}  ${
          index === curSubCategoryIndex
          ? props.curType === "expense"
            ? styles["item--active--expense"]
            : styles["item--active--income"]
          : ""
      }`}
      >
        {category}
      </div>
    );
  });

  function mainCategoryClickHandler(index) {
    setCurMainCategoryIndex(index);
  }

  function subCategoryClickHandler(index) {
    setCurSubCategoryIndex(index);
  }

  function addMainCategoryModalToggler() {
    setIsAddingMainCategory((prev) => !prev);
  }

  function addMainCategoryHandler(name, icon) {
    // add main category
    const newMainCategory = {
      name,
      icon,
      sub_categories: [],
    };
    setInitData((prevData) => {
      return {
        ...prevData,
        expense: [...prevData.expense, newMainCategory],
      };
    });

    // reset current main category index
    const newIndex = initData.expense.length;
    setCurMainCategoryIndex(newIndex);
  }

  function deleteMainCategoryHandler() {
    // delete main category
    const newMainCategoryList = initData.expense.filter((_, i) => i !== curMainCategoryIndex);
    setInitData((prevData) => {
      return {
        ...prevData,
        expense: newMainCategoryList,
      };
    });

    // reset current main category index
    const newIndex = curMainCategoryIndex === 0 ? 0 : curMainCategoryIndex - 1;
    setCurMainCategoryIndex(newIndex);
  }

  function deleteSubCategoryHandler() {
    // delete sub category
    const newSubCategoryList = initData.expense[curMainCategoryIndex].sub_categories.filter((_, i) => i !== curSubCategoryIndex);
    setInitData((prevData) => {
      return {
        ...prevData,
        expense: prevData.expense.map((category, index) => {
          if (index === curMainCategoryIndex) {
            return {
              ...category,
              sub_categories: newSubCategoryList,
            };
          }
          return category;
        }),
      };
    });

    // reset current sub category index
    const newIndex = curSubCategoryIndex === 0 ? 0 : curSubCategoryIndex - 1;
    setCurSubCategoryIndex(newIndex);
  }

return <>
  {isAddingMainCategory && 
    <AddMainCategoryModal 
      categoryNameList={mainCategoryNameList}
      addMainCategoryModalToggler={addMainCategoryModalToggler}
      addMainCategoryHandler={addMainCategoryHandler}
    />
  }
  <Modal classModal={`${styles.modal}`}>
      <SubTitle className={styles.subtitle}>Please customize your initial data</SubTitle>
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
            <Button className={styles.btn}>add</Button>
            <Button className={styles.btn} onClick={deleteSubCategoryHandler}>delete</Button>
          </div>
        </div>
      </div>
    </Modal>
  </>
}

export default InitialData;

async function fetchInitData() {
  try {
    const resp = await fetcher("v1/init-data", "GET");
    return resp.init_data;
  } catch (error) {
    throw error;
  }
}