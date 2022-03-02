import { useContext } from "react";
import SearchOptionUI from "./SearchOptionUI";
import CategoryContext from "../../../../store/category/category--context";

function SearchOptionCategory() {
  const { mainCategoryExpense, mainCategoryIncome } =
    useContext(CategoryContext);

  // Reference 1
  const checkboxItem = [
    ...new Set(mainCategoryExpense.concat(mainCategoryIncome)),
  ].map((element) => ({ text: element, value: element }));

  return (
    <SearchOptionUI
      dataID="category"
      label="category"
      checkboxItem={checkboxItem}
    />
  );
}

export default SearchOptionCategory;

/*
Reference 1
Both expense and income may have same category name
But showing two duplicate category name seems a liitle bit verbose
Also, each key should be unique
So use new Set() to remove duplicate element
*/
