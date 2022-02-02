import { useContext } from "react";
import SearchOptionUI from "./SearchOptionUI";
import CategoryContext from "../../../../store/category/category--context";

function SearchOptionCategory() {
  const { categoryExpense, categoryIncome } = useContext(CategoryContext);

  const expenseLength = Object.keys(categoryExpense).length;

  const checkboxItem = Object.keys(categoryExpense)
    .concat(Object.keys(categoryIncome))
    .map((element, index) => {
      /*
      Because both expense and income have "others"
      And I use text as key in SearchOptionUI
      So I have to use category to distinguish different others
      to avoid same key (two same others)
      */
      let category;
      if (index < expenseLength) category = "expense";
      else category = "income";

      return { text: element, value: element, category };
    });

  return (
    <SearchOptionUI
      dataID="category"
      label="category"
      checkboxItem={checkboxItem}
    />
  );
}

export default SearchOptionCategory;
