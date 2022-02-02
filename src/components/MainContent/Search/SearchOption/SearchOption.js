import Card from "../../../UI/Card/Card";
import Title from "../../../UI/Title/Title";
import SearchOptionTime from "./SearchOptionTime";
import SearchOptionPrice from "./SearchOptionPrice";
import SearchOptionCategory from "./SearchOptionCategory";
import { RiCloseCircleFill } from "react-icons/ri";
import style from "./SearchOption.module.css";

function SearchOption(props) {
  return (
    <Card className={style.option}>
      <RiCloseCircleFill
        onClick={props.searchOptionModalToggler}
        className={style.close}
      />
      <Title>search by</Title>
      <div className={style["option__container"]}>
        <SearchOptionTime />
        <SearchOptionPrice />
        <SearchOptionCategory />
      </div>
    </Card>
  );
}

export default SearchOption;
