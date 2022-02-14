import Card from "../../../UI/Card/Card";
import Title from "../../../UI/Title/Title";
import SearchOptionTime from "./SearchOptionTime";
import SearchOptionPrice from "./SearchOptionPrice";
import SearchOptionCategory from "./SearchOptionCategory";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import { RiCloseCircleFill } from "react-icons/ri";
import style from "./SearchOption.module.css";

function SearchOption(props) {
  return (
    <Card className={style.option}>
      <BtnIcon
        onClick={props.searchOptionModalToggler}
        text="close"
        classBtn={style.close}
        classText={style["btn__text"]}
      >
        <RiCloseCircleFill />
      </BtnIcon>

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
