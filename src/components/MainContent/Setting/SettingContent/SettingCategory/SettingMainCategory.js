import { useContext } from "react";
import CategoryContext from "../../../../../store/category/category--context";
import { AiFillEdit } from "react-icons/ai";
import BtnIcon from "../../../../UI/BtnIcon/BtnIcon";
import Button from "../../../../UI/Button/Button";
import style from "./SettingCategory.module.css";

function SettingMainCategory(props) {
  const { iconObj } = useContext(CategoryContext);

  const categoryList = props.categoryState.mainCategoryArr.map((element) => (
    <div
      tabIndex="0"
      aria-label={element}
      onClick={clickMainCategoryHandler}
      className={`${style.data}  ${
        element === props.categoryState.mainCategory
          ? props.categoryState.type === "expense"
            ? style["data--active--expense"]
            : style["data--active--income"]
          : ""
      } `}
      key={element}
    >
      {/* Reference 1  */}
      <div className={style["data__cover"]} data-id={element}></div>
      <span className={style["data__icon"]}>{iconObj[element]}</span>
      {/* <span className={style["data__icon"]}>
        <img
          alt={element}
          className={`icon ${style["img__icon"]}`}
          src={iconObjTes[element][1]}
        />
      </span> */}
      <span>{element}</span>
    </div>
  ));

  function clickMainCategoryHandler(e) {
    props.categoryStateDispatch({
      type: "CLICK_MAIN_CATEGORY",
      value: e.target.dataset.id,
    });
  }

  return (
    <div className={style.container}>
      <div className={style["subtitle__container"]}>
        <p className={`${style.subtitle} capitalize`}>main category</p>
        <BtnIcon
          dataID="main"
          text="edit"
          classBtn={style["btn--edit"]}
          classText={style["btn__text"]}
          onClick={props.clickEditBtnHandler}
        >
          <AiFillEdit />
        </BtnIcon>
      </div>
      <div className={style["data__container"]}>{categoryList}</div>
      {props.categoryState.editMainCategory && (
        <div className={style["btn__container"]}>
          <Button
            onClick={props.deleteModalToggler}
            type="button"
            className={`${style.btn} transition--25 uppercase`}
            dataID="main"
          >
            delete
          </Button>
          <Button
            onClick={props.addMainCategoryModalToggler}
            type="button"
            className={`${style.btn} transition--25 uppercase`}
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

/*
Reference 1
This is the same logic as BtnIcon
When user click on icon, we'll lose to catch the dataset.id
because we did NOT put data-id on icon, also we can't
So we additionally add a non-content <div></div>, and make this
cover at the top of both text and icon
text and icon can both show normally
but
when user click on the text or icon, user always click on this <div></div>
so we put data-id on the <div></div>
now we can catch the dataset.id normally
*/
