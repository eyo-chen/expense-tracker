import { useState } from "react";
import SearchList from "./SearchList/SearchList";
import SearchOption from "./SearchOption/SearchOption";
import SearchListDataProvider from "../../../store/searchListData/SearchListDataProvider";
import Backdrop from "../../UI/Modal/Backdrop";
import useCurWidth from "../../../Others/Custom/useCurWidth";
import style from "./Search.module.css";

function Search() {
  const [searchOptionModal, setSearchOptionModal] = useState(false);
  const curWidth = useCurWidth();

  function searchOptionModalToggler() {
    setSearchOptionModal((prev) => !prev);
  }

  return (
    <SearchListDataProvider>
      {curWidth <= 900 && searchOptionModal && (
        <Backdrop
          onClick={searchOptionModalToggler}
          classBackdrop={style.backdrop}
        />
      )}
      <div className={style.search}>
        <div
          className={
            curWidth <= 900 && searchOptionModal
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
