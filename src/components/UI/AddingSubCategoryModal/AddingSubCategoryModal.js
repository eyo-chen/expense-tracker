import { useContext, useReducer } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import Warning from "../Warning/Warning";
import EditModalContext from "../../../store/editModal/editModal--context";
import styles from "./AddingSubCategoryModal.module.css";
import fetcher from "../../../Others/Fetcher/fetcher";

function reducer(state, action) {
  switch (action.type) {
    case "NAME": {
      const isDuplicate = state.categoryList?.find(
        (categ) => categ.name === action.value
      );
      const isValid = action.value.trim().length > 0 && !isDuplicate;

      return { ...state, name: action.value, isValid, isDuplicate };
    }

    case "TOUCH": {
      return { ...state, isTouch: true };
    }

    default: {
      return state;
    }
  }
}

function AddingSubCategoryModal(props) {
  const [, setEditModal] = useContext(EditModalContext);

  const [form, formDispatch] = useReducer(reducer, {
    name: "",
    isDuplicate: false,
    isTouch: false,
    isValid: false,
    categoryList: props.state.list
  });

  function inputTextTouchHandler() {
    formDispatch({ type: "TOUCH" });
  }

  function inputTextChangeHandler(e) {
    formDispatch({ type: "NAME", value: e.target.value });
  }

  async function addSubCategory(name, mainCategoryID) {
    try {
      await fetcher(
        `v1/sub-category`,
        "POST",
        {
          name,
          main_category_id: Number(mainCategoryID),
        }
      );
    } catch (err) {
      throw err;
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      // add sub category
      await addSubCategory(form.name, props.curMainCategory.id);

      // close modal
      props.dispatch({ type: "ADD_MODAL_TOGGLER" });

      // show edit success popup
      setEditModal({
        show: true,
        type: props.curType,
        value: "add",
        status: "success",
      });

      // update sub category list
      const newSubCategoryList = await props.getSubCategory(props.curMainCategory.id);
      props.dispatch({ type: "ADD", value: newSubCategoryList });
    } catch (error) {
      setEditModal({
        show: true,
        type: props.curType,
        value: "add",
        status: "fail",
      });
    }
  }

  const warnningIndex = form.isDuplicate || (form.isTouch && !form.isValid);

  const warnningText = form.isDuplicate
    ? "duplicate category name is not allowed"
    : "required";

  return (
    <Modal onClick={() => props.dispatch({ type: "ADD_MODAL_TOGGLER" })} classModal={styles.modal}>
      <Title className={styles.title}>add sub category</Title>
      <HorizontalLine />
      <div className={styles["subtitle__container"]}>
        <SubTitle>you're adding sub category of {props.curMainCategory?.name}</SubTitle>
      </div>
      <form onSubmit={submitHandler}>
        <div className={styles.container}>
          <div className={styles["input__container"]}>
            <InputText
              name="subcategory name"
              label="subcategory name"
              value={form.name}
              onChange={inputTextChangeHandler}
              onBlur={inputTextTouchHandler}
              classLabel={styles.label}
              classInput={
                warnningIndex
                  ? `${styles.input} input--invalid`
                  : `${styles.input}`
              }
            />
          </div>

          <Warning className={styles.warning} index={warnningIndex}>
            {warnningText}
          </Warning>
        </div>

        <div className={styles["btn__container"]}>
          <Button
            type="button"
            className={`${styles.btn} uppercase btn--valid transition--25`}
            onClick={() => props.dispatch({ type: "ADD_MODAL_TOGGLER" })}
          >
            cancel
          </Button>
          <Button
            disabled={!form.isValid}
            type="submit"
            className={`${styles.btn} uppercase transition--25 ${
              form.isValid ? `btn--valid` : "btn--invalid"
            }`}
          >
            add
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddingSubCategoryModal;
