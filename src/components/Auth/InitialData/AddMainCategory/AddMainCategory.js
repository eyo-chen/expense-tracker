import { useReducer, useEffect, useState } from "react";
import Modal from "../../../UI/Modal/Modal";
import Title from "../../../UI/Title/Title";
import Button from "./../../../UI/Button/Button"
import InputText from "../../../UI/InputText/InputText";
import InputRadio from "../../../UI/InputRadio/InputRadio";
import HorizontalLine from "../../../UI/HorizontalLine/HorizontalLine";
import Warning from "../../../UI/Warning/Warning";
import styles from "./AddMainCategory.module.css"
import LoadingUI from "../../../UI/Loading/Loading";
import fetcher from "../../../../Others/Fetcher/fetcher";

function AddMainCategoryModal(props) {
  const [iconList, setIconList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, formDispatch] = useReducer(reducer, {
    name: "",
    icon: {
      id: "",
      url: "",
    },
    isValid: false,
    inputValid: false,
    isDuplicate: false,
    isTouch: false,
    categoryNameList: props.categoryNameList,
  });

  function inputTextTouchHandler() {
    formDispatch({ type: "TOUCH" });
  }

  function inputTextChangeHandler(e) {
    formDispatch({ type: "NAME", value: e.target.value });
  }

  function radioIconChangeHandler(e) {
    const { url } = iconList.find(({id}) => id === Number(e.target.value));
    const icon = { id: e.target.value, url };
    formDispatch({ type: "ICON", value: icon });
  }

  async function fetchIconList() {
    try {
      setLoading(true);
      const data = await fetcher(
        `v1/icon`,
        "GET"
      );

      return data.icons;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIconList()
    .then((data) => {
      setIconList(data)
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [])

  async function formSubmitHandler(e) {
    e.preventDefault();

    props.addMainCategoryHandler(form.name, form.icon);

    props.addMainCategoryModalToggler();
  }

  let iconListContent = <LoadingUI />;

  if (!loading) {
    iconListContent = iconList.map(({ id, url }) => {
      const iconImg = <img alt="icon" className={`icon`} src={url} />;

      return (
        <InputRadio
          key={id}
          name="icon"
          ariaLabel="icon"
          label={iconImg}
          value={id}
          classLabel={`${styles.icon} transition--25 ${
            props.type === "EXPENSE"
              ? `${styles["icon--expense"]}`
              : `${styles["icon--income"]}`
          }`}
          classContainer={styles["radio__container"]}
          classInput={styles["input--icon"]}
          onChange={radioIconChangeHandler}
          checked={id + "" === form.icon.id}
        />
      );
    });
  }

  const warnningIndex = form.isDuplicate || (form.isTouch && !form.inputValid);

  const warnningText = form.isDuplicate
    ? "duplicate category name is not allowed"
    : "required";

  return (
    <Modal
      onClick={props.addMainCategoryModalToggler}
      classModal={styles.modal}
      classBackdrop={styles.backdrop}
    >
      <Title className={styles.title}>add main category</Title>
      <HorizontalLine />
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <div className={styles.container}>
          <div className={styles["input__container"]}>
            <InputText
              name="maincategory"
              id="name"
              label="main category name"
              value={form.name}
              classLabel={styles.label}
              classInput={
                warnningIndex
                  ? `${styles.input} input--invalid`
                  : `${styles.input}`
              }
              onChange={inputTextChangeHandler}
              onBlur={inputTextTouchHandler}
            />
          </div>
          <Warning className={styles.warning} index={warnningIndex}>
            {warnningText}
          </Warning>
        </div>
        <div className={styles["input__container"]}>
          <p className={`${styles.label} capitalize`}>icon</p>
          <div className={styles["icon__container"]}>{iconListContent}</div>
        </div>
        <div className={styles["btn__container"]}>
          <Button
            onClick={props.addMainCategoryModalToggler}
            className={`${styles.btn} btn--valid transition--25`}
            type="button"
          >
            cancel
          </Button>
          <Button
            disabled={!form.isValid}
            className={`${styles.btn} transition--25 ${styles["btn--right"]} ${
              form.isValid ? `btn--valid` : "btn--invalid"
            }`}
            type="submit"
          >
            add
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddMainCategoryModal;

function reducer(state, action) {
  switch (action.type) {
    case "NAME": {
      const isDuplicate = state.categoryNameList.find(
        (name) => name === action.value
      )
      const inputValid = action.value.trim().length > 0 && !isDuplicate;

      return {
        ...state,
        name: action.value,
        inputValid,
        isDuplicate,
        isValid: inputValid && state.icon.id,
      };
    }

    case "ICON": {
      return {
        ...state,
        icon: action.value,
        isValid: state.inputValid && action.value,
      };
    }

    case "TOUCH": {
      return { ...state, isTouch: true };
    }

    default: {
      return state;
    }
  }
}