import { useContext } from "react";
import SearchListInput from "./SearchListInput/SearchListInput";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import SearchListDataContext from "../../../../store/searchListData/searchListData--context";
import style from "./SearchList.module.css";

function SearchList(props) {
  const { expenseData } = useContext(SearchListDataContext);

  let mainContent = <p className={style.empty}>No Data</p>;
  if (expenseData.length !== 0)
    mainContent = (
      <ExpenseList
        classItemSearch={style["item--inner"]}
        data={expenseData}
        classItem={style.item}
      />
    );

  return (
    <div className={style.search}>
      <SearchListInput
        searchOptionModalToggler={props.searchOptionModalToggler}
      />
      {mainContent}
    </div>
  );
}

export default SearchList;
