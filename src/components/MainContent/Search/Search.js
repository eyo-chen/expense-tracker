import { useState, useEffect } from "react";
import SearchList from "./SearchList/SearchList";
import SearchOption from "./SearchOption/SearchOption";
import SearchListDataProvider from "../../../store/searchListData/SearchListDataProvider";
import Backdrop from "../../UI/Modal/Backdrop";
import debounce from "../../../Others/Debounce/debounce";
import style from "./Search.module.css";

function Search() {
  const [searchOptionModal, setSearchOptionModal] = useState(false);
  const [curWidth, setCurWidth] = useState(window.innerWidth);

  function searchOptionModalToggler() {
    setSearchOptionModal((prev) => !prev);
  }

  useEffect(() => {
    const detectWindowWidth = debounce(function handleResize() {
      setCurWidth(window.innerWidth);
    }, 500);

    window.addEventListener("resize", detectWindowWidth);

    return () => window.removeEventListener("resize", detectWindowWidth);
  }, []);

  return (
    <SearchListDataProvider>
      {curWidth <= 900 && searchOptionModal && (
        <Backdrop classBackdrop={style.backdrop} />
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
