import BtnIcon from "../../../../UI/BtnIcon/BtnIcon";
import Button from "../../../../UI/Button/Button";
import { AiFillEdit } from "react-icons/ai";
import styles from "./SettingCategory.module.css";
import Loading from "../../../../UI/Loading/Loading";

function SettingMainCategory(props) {
  function clickMainCategoryHandler(e) {
    const selectedMainCategory = props.state.list.find(
      (element) => element.id === Number(e.target.dataset.id)
    );
    props.dispatch({ type: "SET_CUR_DATA", value: selectedMainCategory });

    // close edit modal when user click on main category
    props.subCategoryDispatch({ type: "CLOSE_EDIT" });
  }

  let categList = <Loading className={styles["loading"]} />;

  if (!props.state.loading) {
    categList = props?.state.list?.map(({id, name, icon_data}) => (
      <div
        tabIndex="0"
        aria-label={name}
        onClick={clickMainCategoryHandler}
        className={`${styles.data}  ${
          id === props.state.curData.id
            ? props.curType === "expense"
              ? styles["data--active--expense"]
              : styles["data--active--income"]
            : ""
        } `}
        key={id}
      >
        {/* Reference 1  */}
        <div className={styles["data__cover"]} data-id={id}></div>
        <span className={styles["data__icon"]}>
          <img
            alt={name}
            className={`icon ${styles["img__icon"]}`}
            src={icon_data}
          />
        </span>
        <span>{name}</span>
      </div>
    ));
  }

  return (
    <div className={styles.container}>
      <div className={styles["subtitle__container"]}>
        <p className={`${styles.subtitle} capitalize`}>main category</p>
        <BtnIcon
          dataID="main"
          text="edit"
          classBtn={styles["btn--edit"]}
          classText={styles["btn__text"]}
          onClick={() => props.dispatch({ type: "EDIT_TOGGLER" })}
        >
          <AiFillEdit />
        </BtnIcon>
      </div>
      <div className={styles["data__container"]}>{categList}</div>
      {props.state.edit && (
        <div className={styles["btn__container"]}>
          {
            // only show delete button when there's data
            props.state.list.length > 0 && (
              <Button
                onClick={props.deleteModalToggler}
                type="button"
                className={`${styles.btn} transition--25`}
                dataID="main"
              >
                delete
              </Button>
            )
          }
          <Button
            onClick={() => props.dispatch({ type: "ADD_MODAL_TOGGLER" })}
            type="button"
            className={`${styles.btn} transition--25`}
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