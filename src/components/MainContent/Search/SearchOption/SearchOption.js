import Card from "../../../UI/Card/Card";
import Title from "../../../UI/Title/Title";
import SearchOptionTime from "./SearchOptionTime";
import SearchOptionPrice from "./SearchOptionPrice";
import SearchOptionCategory from "./SearchOptionCategory";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import { RiCloseCircleFill } from "react-icons/ri";
import styles from "./SearchOption.module.css";

function SearchOption(props) {
  return (
    <Card className={styles.option}>
      <BtnIcon
        onClick={props.searchOptionModalToggler}
        text="close"
        classBtn={styles.close}
        classText={styles["btn__text"]}
      >
        <RiCloseCircleFill />
      </BtnIcon>

      <Title>search by</Title>
      <div className={styles["option__container"]}>
        <SearchOptionTime setSearchOption={props.setSearchOption} />
        <SearchOptionPrice setSearchOption={props.setSearchOption} />
        <SearchOptionCategory setSearchOption={props.setSearchOption} searchOption={props.searchOption} />
      </div>
    </Card>
  );
}

export default SearchOption;
