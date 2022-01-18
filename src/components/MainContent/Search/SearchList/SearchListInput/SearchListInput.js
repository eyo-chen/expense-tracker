import { useState, useContext } from "react";
import style from "./SearchListInput.module.css";
import { FaSearch } from "react-icons/fa";
import { MdSort } from "react-icons/md";
import SearchListDataContext from "../../../../../store/searchListData/searchListData--context";
import Button from "../../../../UI/Button";

let sortTimeIndex = true;
let sortPriceIndex = true;
let sortCategoryIndex = true;

function SearchListInput(props) {
  const [inputValue, setInputValue] = useState("");
  const searchListDataCtx = useContext(SearchListDataContext);

  function inputChangeHandler(e) {
    setInputValue(e.target.value);
    searchListDataCtx.setFilteredData({
      type: "SEARCH",
      value: e.target.value,
    });
  }

  function sortTimeBtnClickHandler() {
    searchListDataCtx.setFilteredData({
      type: "SORT_TIME",
      sort: sortTimeIndex,
    });

    sortTimeIndex = !sortTimeIndex;
  }

  function sortPriceBtnClickHandler() {
    searchListDataCtx.setFilteredData({
      type: "SORT_PRICE",
      sort: sortPriceIndex,
    });

    sortPriceIndex = !sortPriceIndex;
  }

  function sortCategoryBtnClickHandler() {
    searchListDataCtx.setFilteredData({
      type: "SORT_CATEGORY",
      sort: sortCategoryIndex,
    });

    sortCategoryIndex = !sortCategoryIndex;
  }

  return (
    <div>
      <div className={style["input__container"]}>
        <input
          value={inputValue}
          type="text"
          className={style.input}
          onChange={inputChangeHandler}
          placeholder="Search For Description"
        />
        <FaSearch className={style.icon} />
      </div>

      <div className={style["btn__container"]}>
        <Button
          onClick={sortTimeBtnClickHandler}
          type="button"
          className={style.btn}
        >
          {<MdSort className={style["btn__icon"]} />}sort by time
        </Button>
        <Button
          onClick={sortPriceBtnClickHandler}
          type="button"
          className={style.btn}
        >
          {<MdSort className={style["btn__icon"]} />}sort by price
        </Button>
        <Button
          onClick={sortCategoryBtnClickHandler}
          type="button"
          className={style.btn}
        >
          {<MdSort className={style["btn__icon"]} />}sort by catrgory
        </Button>
      </div>
    </div>
  );
}

export default SearchListInput;
