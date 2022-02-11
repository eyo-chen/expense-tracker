import { useState, useContext } from "react";
import style from "./SearchOptionUI.module.css";
import InputCheckbox from "../../../UI/InputCheckbox/InputCheckbox";
import SearchListDataContext from "../../../../store/searchListData/searchListData--context";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

/*
for each different type of search option
we have different group of small check boxes
*/
function SearchOptionUI(props) {
  const [showBoxes, setShowBoxes] = useState(true);

  /*
  to keep tracking each small check boxes if it's checked or not
  initially, all of them is false which is no checked
  */
  const [checkState, setCheckState] = useState(
    new Array(props.checkboxItem.length).fill(false)
  );
  const searchExpenseDataCtx = useContext(SearchListDataContext);

  function arrowBtnClickHandler() {
    setShowBoxes((prev) => !prev);
  }

  function changeChekboxHandler(index, e) {
    setCheckState(checkState.map((check, i) => (index === i ? !check : check)));

    // setFilteredData is connected with reducer function
    if (e.target.checked) {
      // add constraint
      // addConstraintObj(e.target.value, e.target.dataset.id);
      searchExpenseDataCtx.setFilteredData({
        type: "ADD",
        value: e.target.value,
        id: e.target.dataset.id,
      });
    } else {
      // remove constraint
      // removeConstraintObj(e.target.value, e.target.dataset.id);
      searchExpenseDataCtx.setFilteredData({
        type: "REMOVE",
        value: e.target.value,
        id: e.target.dataset.id,
      });
    }
  }

  const checkboxContent = props.checkboxItem.map((checkbox, i) => (
    <InputCheckbox
      ariaLabel={checkbox.text}
      label={checkbox.text}
      id={checkbox.text}
      key={
        checkbox.category ? checkbox.category + checkbox.text : checkbox.text
      }
      value={checkbox.value}
      checked={checkState[i]}
      dataID={props.dataID}
      classCheck={style.check}
      classInput={style.input}
      classLabel={`${style["label--item"]} capitalize`}
      onChange={(e) => changeChekboxHandler(i, e)}
    />
  ));

  return (
    <div>
      <InputCheckbox
        label={props.label}
        id={props.label}
        classCheck={style.icon}
        classLabel={`${style.label} uppercase`}
        classContainer={style["icon__container"]}
        icon={
          showBoxes ? (
            <IoIosArrowDropdownCircle aria-label="hide" />
          ) : (
            <IoIosArrowDroprightCircle aria-label="show" />
          )
        }
        checked={showBoxes}
        onChange={arrowBtnClickHandler}
      />
      <div
        className={
          showBoxes
            ? `${style.container}`
            : `${style.container} ${style.hidden}`
        }
      >
        {checkboxContent}
      </div>
    </div>
  );
}

export default SearchOptionUI;
