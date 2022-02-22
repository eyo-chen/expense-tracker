import { useContext } from "react";
import SearchListInput from "./SearchListInput/SearchListInput";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import SearchListDataContext from "../../../../store/searchListData/searchListData--context";
import styles from "./SearchList.module.css";

function SearchList(props) {
  const { expenseData } = useContext(SearchListDataContext);

  let mainContent = <p className={styles.empty}>No Data</p>;

  if (expenseData.length !== 0)
    mainContent = (
      <ExpenseList
        classItemSearch={styles["item--inner"]}
        data={expenseData}
        classItem={styles.item}
      />
    );

  return (
    <div className={styles.search}>
      <SearchListInput
        searchOptionModalToggler={props.searchOptionModalToggler}
      />
      {mainContent}
    </div>
  );
}

export default SearchList;
