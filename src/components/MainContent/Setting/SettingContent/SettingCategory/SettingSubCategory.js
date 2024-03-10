import BtnIcon from "../../../../UI/BtnIcon/BtnIcon";
import Button from "../../../../UI/Button/Button";
import { AiFillEdit } from "react-icons/ai";
import styles from "./SettingCategory.module.css";
import Loading from "../../../../UI/Loading/Loading";

function SettingSubCategory(props) {
  function clickSubCategoryHandler(e) {
    const curCateg = props.state.list.find(
      (categ) => categ.id === Number(e.target.dataset.id)
    );

    props.dispatch({ type: "SET_CUR_DATA", value: curCateg });
  }

  let categoryList = <Loading className={styles["loading"]} />;

  if (!props.state.loading) {
    categoryList = props.state.list?.map(({id, name}) => (
      <div
        className={`${styles.data}  ${
          id === props.state.curData.id
            ? props.curType === "expense"
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
          onClick={() => props.dispatch({ type: "EDIT_TOGGLER" })} 
        >
          <AiFillEdit />
        </BtnIcon>
      </div>
      <div className={styles["data__container"]}>{categoryList}</div>
      {props.state.edit && (
        <div className={styles["btn__container"]}>
          {
            // only show delete button if there's data
            props.state.list.length > 0 && (
              <Button
                onClick={props.deleteModalToggler}
                type="button"
                className={`${styles.btn} transition--25 `}
                dataID="sub"
              >
                delete
              </Button>
            )
          }
          <Button
            onClick={() => props.dispatch({ type: "ADD_MODAL_TOGGLER" })}
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
