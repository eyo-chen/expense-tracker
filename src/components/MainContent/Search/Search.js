import { useState, useEffect } from "react";
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

  const [curWidth, setCurWidth] = useState(window.innerWidth);

  // console.log(curWidth);

  // function detectWindowWidth() {
  //   debounce(() => {
  //     setCurWidth(window.innerWidth);
  //   }, 500);
  // }

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setCurWidth(window.innerWidth);
    }, 500);
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
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

function debounce(fn, ms) {
  let timer;

  return (_) => {
    clearTimeout(timer);

    timer = setTimeout((_) => {
      timer = null;

      fn.apply(this, arguments);
    }, ms);
  };
}
