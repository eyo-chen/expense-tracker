import { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { MdSort } from "react-icons/md";
import SearchListDataContext from "../../../../../store/searchListData/searchListData--context";
import Button from "../../../../UI/Button/Button";
import styles from "./SearchListInput.module.css";

let sortTimeIndex = true;
let sortPriceIndex = true;
let sortCategoryIndex = true;

function SearchListInput(props) {
  const [inputValue, setInputValue] = useState("");
  const { setFilteredData, btnState } = useContext(SearchListDataContext);

  function inputChangeHandler(e) {
    setInputValue(e.target.value);
    setFilteredData({
      type: "SEARCH",
      value: e.target.value,
    });
  }

  function sortTimeBtnClickHandler() {
    setFilteredData({
      type: "SORT_TIME",
      sort: sortTimeIndex,
    });

    sortTimeIndex = !sortTimeIndex;
  }

  function sortPriceBtnClickHandler() {
    setFilteredData({
      type: "SORT_PRICE",
      sort: sortPriceIndex,
    });

    sortPriceIndex = !sortPriceIndex;
  }

  function sortCategoryBtnClickHandler() {
    setFilteredData({
      type: "SORT_CATEGORY",
      sort: sortCategoryIndex,
    });

    sortCategoryIndex = !sortCategoryIndex;
  }

  return (
    <div>
      <div className={`${styles["input__container"]} center--flex`}>
        <label className={styles.label} htmlFor="search">
          Search For Note
        </label>
        <input
          id="search"
          value={inputValue}
          type="text"
          className={`${styles.input} transition--25`}
          onChange={inputChangeHandler}
          placeholder="Search For Note"
        />
        <FaSearch aria-label="search" className={styles.icon} />
      </div>

      <div className={styles["btn__container"]}>
        <Button
          onClick={sortTimeBtnClickHandler}
          type="button"
          className={`${styles.btn} capitalize center--flex ${
            btnState === "time" ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {<MdSort className={styles["btn__icon"]} />}sort by time
        </Button>
        <Button
          onClick={sortPriceBtnClickHandler}
          type="button"
          className={`${styles.btn} capitalize center--flex ${
            btnState === "price" ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {<MdSort className={styles["btn__icon"]} />}sort by price
        </Button>
        <Button
          onClick={sortCategoryBtnClickHandler}
          type="button"
          className={`${styles.btn} capitalize center--flex ${
            btnState === "category" ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {<MdSort className={styles["btn__icon"]} />}sort by type
        </Button>
        <Button
          onClick={props.searchOptionModalToggler}
          className={`${styles.btn} ${styles["btn--filter"]} capitalize center--flex`}
        >
          {<MdSort className={styles["btn__icon"]} />}filter
        </Button>
      </div>
    </div>
  );
}

export default SearchListInput;
