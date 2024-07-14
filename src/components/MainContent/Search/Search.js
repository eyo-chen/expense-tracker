import { useState } from "react";
import SearchList from "./SearchList/SearchList";
import SearchOption from "./SearchOption/SearchOption";
import Backdrop from "../../UI/Modal/Backdrop";
import useCurWidth from "../../../Others/Custom/useCurWidth";
import styles from "./Search.module.css";

function Search() {
  const [searchOptionModal, setSearchOptionModal] = useState(false);
  const [searchOption, setSearchOption] = useState({});
  const curWidth = useCurWidth();

  function searchOptionModalToggler() {
    setSearchOptionModal((prev) => !prev);
  }

  const optionContainerClassName =
    curWidth <= 900 && searchOptionModal
      ? `${styles["option__container"]} ${styles["option--show"]} center`
      : `${styles["option__container"]}`;

  return (
    <>
      {curWidth <= 900 && searchOptionModal && (
        <Backdrop
          onClick={searchOptionModalToggler}
          classBackdrop={styles.backdrop}
        />
      )}
      <div className={styles.search}>
        <div className={optionContainerClassName}>
          <SearchOption searchOptionModalToggler={searchOptionModalToggler} setSearchOption={setSearchOption} searchOption={searchOption}/>
        </div>
        <SearchList searchOptionModalToggler={searchOptionModalToggler} searchOption={searchOption} />
      </div>
    </>
  );
}

export default Search;
