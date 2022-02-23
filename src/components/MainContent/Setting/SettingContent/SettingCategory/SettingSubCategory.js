import BtnIcon from "../../../../UI/BtnIcon/BtnIcon";
import Button from "../../../../UI/Button/Button";
import { AiFillEdit } from "react-icons/ai";
import styles from "./SettingCategory.module.css";

function SettingSubCategory(props) {
  const categoryList = props.categoryState.subCategoryArr.map((element) => (
    <div
      className={`${styles.data}  ${
        element === props.categoryState.subCategory
          ? props.categoryState.type === "expense"
            ? styles["data--active--expense"]
            : styles["data--active--income"]
          : ""
      }  `}
      key={element}
    >
      <span aria-label={element} tabIndex="0" onClick={clickSubCategoryHandler}>
        {element}
      </span>
    </div>
  ));

  function clickSubCategoryHandler(e) {
    props.categoryStateDispatch({
      type: "CLICK_SUB_CATEGORY",
      value: e.target.textContent,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles["subtitle__container"]}>
        <p className={`${styles.subtitle} capitalize`}>sub category</p>
        <BtnIcon
          dataID="sub"
          text="edit"
          classBtn={styles["btn--edit"]}
          classText={styles["btn__text"]}
          onClick={props.clickEditBtnHandler}
        >
          <AiFillEdit />
        </BtnIcon>
      </div>
      <div className={styles["data__container"]}>{categoryList}</div>
      {props.categoryState.editSubCategory && (
        <div className={styles["btn__container"]}>
          <Button
            onClick={props.deleteModalToggler}
            type="button"
            className={`${styles.btn} transition--25 `}
            dataID="sub"
          >
            delete
          </Button>
          <Button
            onClick={props.addSubCategoryModalToggler}
            type="button"
            className={`${styles.btn} transition--25 `}
            dataID="sub"
          >
            add
          </Button>
        </div>
      )}
    </div>
  );
}

export default SettingSubCategory;
