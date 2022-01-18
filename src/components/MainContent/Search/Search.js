import SearchList from "./SearchList/SearchList";
import SearchOption from "./SearchOption/SearchOption";
import SearchListDataProvider from "../../../store/searchListData/SearchListDataProvider";

import style from "./Search.module.css";

function Search() {
  return (
    <SearchListDataProvider>
      <div className={style.search}>
        <SearchOption />
        <SearchList />
      </div>
    </SearchListDataProvider>
  );
}

export default Search;
