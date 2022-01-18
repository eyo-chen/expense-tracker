import Card from "../../../UI/Card/Card";
import Title from "../../../UI/Title/Title";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import InputCheckbox from "../../../UI/InputCheckbox/InputCheckbox";
import SearchOptionTime from "./SearchOptionTime/SearchOptionTime";
import SearchOptionPrice from "./SearchOptionPrice/SearchOptionPrice";
import SearchOptionCategory from "./SearchOptionCategory/SearchOptionCategory";

import style from "./SearchOption.module.css";

function SearchOption() {
  return (
    <Card className={style.searchOption}>
      <Title>search by</Title>
      <div className={style["search__container"]}>
        <SearchOptionTime />
        <SearchOptionPrice />
        <SearchOptionCategory />
      </div>
    </Card>
  );
}

export default SearchOption;
