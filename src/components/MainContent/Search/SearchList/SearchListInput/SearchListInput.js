import { useState} from "react";
import { FaSearch } from "react-icons/fa";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import Button from "../../../../UI/Button/Button";
import styles from "./SearchListInput.module.css";
import debounce from "../../../../../Others/Debounce/debounce";

function SearchListInput(props) {
  const [sortState, setSortState] = useState({
    time: null,
    price: null,
    type: null,
  });

  function inputChangeHandler(e) {
    props.setKeyword(e.target.value);
  }

  const throttledInputChangeHandler = debounce(inputChangeHandler, 800);


  function sortTimeBtnClickHandler() {
    setSortState(() => ({
      time: nextSortState(sortState.time),
      price: null,
      type: null,
    }));
  }

  function sortPriceBtnClickHandler() {
    setSortState(() => ({
      time: null,
      price: nextSortState(sortState.price),
      type: null,
    }));
  }

  function sortCategoryBtnClickHandler() {
    setSortState(() => ({
      time: null,
      price: null,
      type: nextSortState(sortState.type),
    }));
  }

  const sortStateToIcon = {
    asc: <FaSortAmountDownAlt className={styles["btn__icon"]} />,
    desc: <FaSortAmountDown className={styles["btn__icon"]} />,
  };

  return (
    <div>
      <div className={`${styles["input__container"]} center--flex`}>
        <label className={styles.label} htmlFor="search">
          Search For Note
        </label>
        <input
          id="search"
          type="text"
          className={`${styles.input} transition--25`}
          onChange={throttledInputChangeHandler}
          placeholder="Search For Note"
        />
        <FaSearch aria-label="search" className={styles.icon} />
      </div>

      <div className={styles["btn__container"]}>
        <Button
          onClick={sortTimeBtnClickHandler}
          type="button"
          className={`${styles.btn} capitalize center--flex ${
            sortState.time ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {sortStateToIcon[sortState.time]}sort by time
        </Button>
        <Button
          onClick={sortPriceBtnClickHandler}
          type="button"
          className={`${styles.btn} capitalize center--flex ${
            sortState.price ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {sortStateToIcon[sortState.price]}sort by price
        </Button>
        <Button
          onClick={sortCategoryBtnClickHandler}
          type="button"
          className={`${styles.btn} capitalize center--flex ${
            sortState.type ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {sortStateToIcon[sortState.type]}sort by type
        </Button>
        <Button
          onClick={props.searchOptionModalToggler}
          className={`${styles.btn} ${styles["btn--filter"]} capitalize center--flex`}
        >
          filter
        </Button>
      </div>
    </div>
  );
}

export default SearchListInput;

function nextSortState(prevState) {
  if (!prevState) return "desc";

  if (prevState === "desc") return "asc";

  return null;
}