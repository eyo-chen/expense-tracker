import { useState } from "react";
import SearchList from "./SearchList/SearchList";
import SearchOption from "./SearchOption/SearchOption";
import SearchListDataProvider from "../../../store/searchListData/SearchListDataProvider";
import Backdrop from "../../UI/Modal/Backdrop";
import style from "./Search.module.css";

function Search() {
  const [searchOptionModal, setSearchOptionModal] = useState(false);

  function searchOptionModalToggler() {
    setSearchOptionModal((prev) => !prev);
  }

  return (
    <SearchListDataProvider>
      {searchOptionModal && <Backdrop classBackdrop={style.backdrop} />}
      <div className={style.search}>
        <div
          className={
            searchOptionModal
              ? `${style["option__container"]} ${style["option--show"]} center`
              : `${style["option__container"]}`
          }
        >
          <SearchOption searchOptionModalToggler={searchOptionModalToggler} />
        </div>
        <SearchList searchOptionModalToggler={searchOptionModalToggler} />
      </div>
    </SearchListDataProvider>
  );
}

export default Search;
