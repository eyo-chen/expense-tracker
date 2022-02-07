import { AiFillEdit } from "react-icons/ai";
import BtnIcon from "../../../../UI/BtnIcon/BtnIcon";
import Button from "../../../../UI/Button/Button";
import style from "./SettingCategory.module.css";

function SettingSubCategory(props) {
  const categoryList = props.categoryState.subCategoryArr.map((element) => (
    <div
      className={`${style.data}  ${
        element === props.categoryState.subCategory
          ? props.categoryState.type === "expense"
            ? style["data--active--expense"]
            : style["data--active--income"]
          : ""
      }  `}
      key={element}
    >
      <span onClick={clickSubCategoryHandler}>{element}</span>
    </div>
  ));

  function clickSubCategoryHandler(e) {
    props.categoryStateDispatch({
      type: "CLICK_SUB_CATEGORY",
      value: e.target.textContent,
    });
  }

  return (
    <div className={style.container}>
      <div className={style["subtitle__container"]}>
        <p className={`${style.subtitle} capitalize`}>sub category</p>
        <BtnIcon
          dataID="sub"
          text="edit"
          classBtn={style["btn--edit"]}
          classText={style["btn__text"]}
          onClick={props.clickEditBtnHandler}
        >
          <AiFillEdit />
        </BtnIcon>
      </div>
      <div className={style["data__container"]}>{categoryList}</div>
      {props.categoryState.editSubCategory && (
        <div className={style["btn__container"]}>
          <Button
            onClick={props.deleteModalToggler}
            type="button"
            className={`${style.btn} transition--25 uppercase`}
            dataID="sub"
          >
            delete
          </Button>
          <Button
            onClick={props.addSubCategoryModalToggler}
            type="button"
            className={`${style.btn} transition--25 uppercase`}
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
