import { AiFillEdit } from "react-icons/ai";
import BtnIcon from "../../../../UI/BtnIcon/BtnIcon";
import Button from "../../../../UI/Button/Button";
import style from "./SettingCategory.module.css";

function SettingMainCategory(props) {
  const categoryList = props.categoryState.mainCategoryArr.map((element) => (
    <div
      className={`${style.data}  ${
        element === props.categoryState.mainCategory
          ? props.categoryState.category === "expense"
            ? style["data--active--expense"]
            : style["data--active--income"]
          : ""
      } `}
      key={element}
    >
      <span onClick={clickMainCategoryHandler}>{element}</span>
    </div>
  ));

  function clickMainCategoryHandler(e) {
    props.categoryStateDispatch({
      type: "CLICK_MAIN_CATEGORY",
      value: e.target.textContent,
    });
  }

  return (
    <div className={style.container}>
      <div className={style["subtitle__container"]}>
        <p className={style.subtitle}>main category</p>
        <BtnIcon onClick={props.clickEditBtnHandler} dataID="main">
          <AiFillEdit />
        </BtnIcon>
      </div>
      <div className={style["data__container"]}>{categoryList}</div>
      {props.categoryState.editMainCategory && (
        <div className={style["btn__container"]}>
          <Button
            onClick={props.deleteModalToggler}
            type="button"
            className={style.btn}
            dataID="main"
          >
            delete
          </Button>
          <Button
            onClick={props.addMainCategoryModalToggler}
            type="button"
            className={style.btn}
            dataID="main"
          >
            add
          </Button>
        </div>
      )}
    </div>
  );
}

export default SettingMainCategory;
