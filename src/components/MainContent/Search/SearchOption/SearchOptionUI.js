import { useState, useContext } from "react";
import InputCheckbox from "../../../UI/InputCheckbox/InputCheckbox";
import SearchListDataContext from "../../../../store/searchListData/searchListData--context";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import styles from "./SearchOptionUI.module.css";

/*
for each different type of search option
we have different group of small check boxes
*/
function SearchOptionUI(props) {
  const [showBoxes, setShowBoxes] = useState(true);
  const { setFilteredData } = useContext(SearchListDataContext);

  /*
  to keep tracking each small check boxes if it's checked or not
  initially, all of them is false which is no checked
  */
  const [checkState, setCheckState] = useState(
    new Array(props.checkboxItem.length).fill(false)
  );

  function arrowBtnClickHandler() {
    setShowBoxes((prev) => !prev);
  }

  function changeChekboxHandler(index, e) {
    setCheckState(checkState.map((check, i) => (index === i ? !check : check)));

    // setFilteredData is connected with reducer function
    if (e.target.checked) {
      // add constraint
      // addConstraintObj(e.target.value, e.target.dataset.id);
      setFilteredData({
        type: "ADD",
        value: e.target.value,
        id: e.target.dataset.id,
      });
    } else {
      // remove constraint
      // removeConstraintObj(e.target.value, e.target.dataset.id);
      setFilteredData({
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
      key={checkbox.text}
      value={checkbox.value}
      checked={checkState[i]}
      dataID={props.dataID}
      classCheck={styles.check}
      classInput={styles.input}
      classLabel={`${styles["label--item"]} capitalize`}
      onChange={(e) => changeChekboxHandler(i, e)}
    />
  ));

  return (
    <div>
      <InputCheckbox
        label={props.label}
        id={props.label}
        classCheck={styles.icon}
        classLabel={`${styles.label} uppercase`}
        classContainer={styles["icon__container"]}
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
            ? `${styles.container}`
            : `${styles.container} ${styles.hidden}`
        }
      >
        {checkboxContent}
      </div>
    </div>
  );
}

export default SearchOptionUI;
