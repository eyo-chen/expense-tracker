import { useState} from "react";
import InputCheckbox from "../../../UI/InputCheckbox/InputCheckbox";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import styles from "./SearchOptionUI.module.css";

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

  function arrowBtnClickHandler() {
    setShowBoxes((prev) => !prev);
  }

  function changeChekboxHandler(index, e) {
    // filter by time
    if (e.target.dataset.id === "time") {
      if (!e.target.checked) {
        setCheckState(checkState.map(() => false));
        props.setSearchOption((prev) => {
          return {
            ...prev,
            time: {},
          };
        });
        return;
      }

      const [startDate, endDate] = e.target.value.split(",");
      const dateOpt = {
        startDate: startDate,
        endDate: endDate,
      }
      props.setSearchOption((prev) => {
        return {
          ...prev,
          time: dateOpt,
        };
      })
      
      setCheckState(checkState.map((_, i) => index === i));
      return;
    }
    
    // filter by price
    if (e.target.dataset.id === "price") {
      if (!e.target.checked) {
        setCheckState(checkState.map(() => false));
        props.setSearchOption((prev) => {
          return {
            ...prev,
            price: {},
          };
        });
        return;
      }

      const [minPrice, maxPrice] = e.target.value.split(",");
      const priceOpt = {
        minPrice: minPrice,
        maxPrice: maxPrice,
      };

      props.setSearchOption((prev) => {
        return {
          ...prev,
          price: priceOpt,
        };
      });

      setCheckState(checkState.map((_, i) => index === i));
      return;
    }

    // filter by category
    let categoryList = props.searchOption.categoryList || [];
    if (!e.target.checked) {
      categoryList = categoryList.filter((category) => category !== e.target.value);
    } else {
      categoryList = [...categoryList, e.target.value];
    }

    props.setSearchOption((prev) => {
      return {
        ...prev,
        categoryList: categoryList,
      };
    });

    setCheckState(checkState.map((check, i) => (index === i ? !check : check)));
  }

  const checkboxContent = props.checkboxItem.map((checkbox, i) => (
    <InputCheckbox
      ariaLabel={checkbox.text}
      label={checkbox.text}
      id={checkbox.text}
      key={checkbox.value}
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
