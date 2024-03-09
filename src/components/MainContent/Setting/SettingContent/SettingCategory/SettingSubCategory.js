import BtnIcon from "../../../../UI/BtnIcon/BtnIcon";
import Button from "../../../../UI/Button/Button";
import { AiFillEdit } from "react-icons/ai";
import styles from "./SettingCategory.module.css";

function SettingSubCategory(props) {
  function clickSubCategoryHandler(e) {
    const curCateg = props.categoryList.find(
      (categ) => categ.id === Number(e.target.dataset.id)
    );

    props.setCurSubCategory(curCateg);
  }

  const categoryList = props.categoryList?.map(({id, name}) => (
    <div
      className={`${styles.data}  ${
        id === props.curSubCategory.id
          ? props.categoryState.type === "expense"
            ? styles["data--active--expense"]
            : styles["data--active--income"]
          : ""
      }  `}
      key={id}
    >
      <span aria-label={id} tabIndex="0" data-id={id} onClick={clickSubCategoryHandler}>
        {name}
      </span>
    </div>
  ));

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
