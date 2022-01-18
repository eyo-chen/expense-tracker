import { useContext } from "react";
import SearchListInput from "./SearchListInput/SearchListInput";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import SearchListDataContext from "../../../../store/searchListData/searchListData--context";
import style from "./SearchList.module.css";

function SearchList() {
  const { expenseData } = useContext(SearchListDataContext);

  let mainContent = <p className={style.noData}>No Data</p>;
  if (expenseData.length !== 0)
    mainContent = <ExpenseList data={expenseData} classItem={style.item} />;

  return (
    <div className={style.search}>
      <SearchListInput />
      {mainContent}
    </div>
  );
}

export default SearchList;
