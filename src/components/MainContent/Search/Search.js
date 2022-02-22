import { useState } from "react";
import SearchList from "./SearchList/SearchList";
import SearchOption from "./SearchOption/SearchOption";
import SearchListDataProvider from "../../../store/searchListData/SearchListDataProvider";
import Backdrop from "../../UI/Modal/Backdrop";
import useCurWidth from "../../../Others/Custom/useCurWidth";
import styles from "./Search.module.css";

function Search() {
  const [searchOptionModal, setSearchOptionModal] = useState(false);
  const curWidth = useCurWidth();

  function searchOptionModalToggler() {
    setSearchOptionModal((prev) => !prev);
  }

  const optionContainerClassName =
    curWidth <= 900 && searchOptionModal
      ? `${styles["option__container"]} ${styles["option--show"]} center`
      : `${styles["option__container"]}`;

  return (
    <SearchListDataProvider>
      {curWidth <= 900 && searchOptionModal && (
        <Backdrop
          onClick={searchOptionModalToggler}
          classBackdrop={styles.backdrop}
        />
      )}
      <div className={styles.search}>
        <div className={optionContainerClassName}>
          <SearchOption searchOptionModalToggler={searchOptionModalToggler} />
        </div>
        <SearchList searchOptionModalToggler={searchOptionModalToggler} />
      </div>
    </SearchListDataProvider>
  );
}

export default Search;
