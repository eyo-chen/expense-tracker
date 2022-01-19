import SearchOption from "../../MainContent/Search/SearchOption/SearchOption";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import style from "./SearchOptionModal.module.css";

function SearchOptionModal(props) {
  console.log("aaa");
  return (
    <ModalCloseIcon
      onClick={props.searchOptionToggler}
      classModal={style.modal}
      classBackdrop={style.backdrop}
    >
      <SearchOption />
    </ModalCloseIcon>
  );
}

export default SearchOptionModal;
