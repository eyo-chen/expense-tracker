import { useEffect, useState } from "react";
import SearchOptionUI from "./SearchOptionUI";
import fetcher from "../../../../Others/Fetcher/fetcher";

function SearchOptionCategory(props) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchMainCategory()
      .then((data) => {
        const list = data.map(({id, name}) => ({text: name, value: id}));
        setCategoryList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  , []);

  return (
    <SearchOptionUI
      dataID="category"
      label="category"
      checkboxItem={categoryList}
      setSearchOption={props.setSearchOption}
      searchOption={props.searchOption}
    />
  );
}

export default SearchOptionCategory;

async function fetchMainCategory() {
  try {
    const data = await fetcher(`v1/main-category`, "GET");
    return data.categories;
  } catch (err) {
    throw err;
  }
}