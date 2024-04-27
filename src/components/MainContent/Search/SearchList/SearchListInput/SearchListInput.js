import { FaSearch } from "react-icons/fa";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import Button from "../../../../UI/Button/Button";
import styles from "./SearchListInput.module.css";
import debounce from "../../../../../Others/Debounce/debounce";

function SearchListInput(props) {
  function inputChangeHandler(e) {
    props.setKeyword(e.target.value);
  }

  const throttledInputChangeHandler = debounce(inputChangeHandler, 800);


  function sortTimeBtnClickHandler() {
    if (props.sortState.sortBy === "date" && props.sortState.sortDir === "asc") {
      props.setSortState(() => ({
        sortBy: "",
        sortDir: "",
      }));
      return;
    }

    let sortDir = "desc";
    if (props.sortState.sortBy === "date") {
      sortDir = nextSortState(props.sortState.sortDir);
    }

    props.setSortState(() => ({
      sortBy: "date",
      sortDir,
    }));
  }

  function sortPriceBtnClickHandler() {
    if (props.sortState.sortBy === "price" && props.sortState.sortDir === "asc") {
      props.setSortState(() => ({
        sortBy: "",
        sortDir: "",
      }));
      return;
    }

    let sortDir = "desc";
    if (props.sortState.sortBy === "price") {
      sortDir = nextSortState(props.sortState.sortDir);
    }

    props.setSortState(() => ({
      sortBy: "price",
      sortDir,
    }));
  }

  function sortCategoryBtnClickHandler() {
    if (props.sortState.sortBy === "type" && props.sortState.sortDir === "asc") {
      props.setSortState(() => ({
        sortBy: "",
        sortDir: "",
      }));
      return;
    }

    let sortDir = "desc";
    if (props.sortState.sortBy === "type") {
      sortDir = nextSortState(props.sortState.sortDir);
    }

    props.setSortState(() => ({
      sortBy: "type",
      sortDir,
    }));
  }

  const sortStateToIcon = {
    asc: <FaSortAmountDownAlt className={styles["btn__icon"]} />,
    desc: <FaSortAmountDown className={styles["btn__icon"]} />,
  };

  const isDateActive = props.sortState.sortBy === "date";
  const isPriceActive = props.sortState.sortBy === "price";
  const isTypeActive = props.sortState.sortBy === "type";

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
            isDateActive ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {isDateActive && sortStateToIcon[props.sortState.sortDir]}sort by date
        </Button>
        <Button
          onClick={sortPriceBtnClickHandler}
          type="button"
          className={`${styles.btn} capitalize center--flex ${
            isPriceActive ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {isPriceActive && sortStateToIcon[props.sortState.sortDir]}sort by price
        </Button>
        <Button
          onClick={sortCategoryBtnClickHandler}
          type="button"
          className={`${styles.btn} capitalize center--flex ${
            isTypeActive ? `${styles["btn__clicked"]}` : ""
          }`}
        >
          {isTypeActive && sortStateToIcon[props.sortState.sortDir]}sort by type
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