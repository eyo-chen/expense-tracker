import { useState, useEffect } from "react";
import Modal from "../../UI/Modal/Modal";
import SubTitle from "../../UI/SubTitle/SubTitle";
import styles from "./InitialData.module.css";
import fetcher from "../../../Others/Fetcher/fetcher";

function InitialData(props) {
  const [initData, setInitData] = useState({
    expense: [],
    income: [],
  });
  const [curMainCategoryIndex, setCurMainCategoryIndex] = useState(0);

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

  const subCategoryList = initData.expense[curMainCategoryIndex]?.sub_categories.map((category) => {
    return (
      <div className={styles.item} key={category}>{category}</div>
    );
  });

  function mainCategoryClickHandler(index) {
    setCurMainCategoryIndex(index);
  }

  return (
    <Modal classModal={`${styles.modal}`}>
      <SubTitle className={styles.subtitle}>Please customize your initial data</SubTitle>
      <div className={styles.container}>
        <div className={styles["main-category--container"]}>
          <div className={styles["category-title"]}>Main Category</div>
          <div className={styles["main-category--inner-container"]}>
            {mainCategoryList}
          </div>
        </div>
        <div className={styles["sub-category--container"]}>
          <div className={styles["category-title"]}>Sub Category</div>
          <div className={styles["sub-category--inner-container"]}>
            {subCategoryList}
          </div>
        </div>
      </div>

    </Modal>
  );
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