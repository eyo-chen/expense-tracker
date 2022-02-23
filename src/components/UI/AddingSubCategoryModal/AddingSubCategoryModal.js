import { useContext, useReducer } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import CategoryContext from "../../../store/category/category--context";
import Warning from "../Warning/Warning";
import EditModalContext from "../../../store/editModal/editModal--context";
import styles from "./AddingSubCategoryModal.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "NAME": {
      const isDuplicate = state.categoryNameArr.includes(action.value);
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
  const { categoryExpense, categoryIncome, addSubCategory } =
    useContext(CategoryContext);
  const [, setEditModal] = useContext(EditModalContext);

  const categoryNameArr =
    props.type === "expense"
      ? categoryExpense[props.mainCategory]
      : categoryIncome[props.mainCategory];

  const [form, formDispatch] = useReducer(reducer, {
    name: "",
    isDuplicate: false,
    isTouch: false,
    isValid: false,
    categoryNameArr,
  });

  function inputTextTouchHandler() {
    formDispatch({ type: "TOUCH" });
  }

  function inputTextChangeHandler(e) {
    formDispatch({ type: "NAME", value: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();

    // the logic here is exactly as same as adding main category
    addSubCategory(form.name, props.type, props.mainCategory);
    props.addSubCategoryModalToggler(null, form.name);
    setEditModal({
      show: true,
      type: props.type,
      value: "add",
    });
  }

  const warnningIndex = form.isDuplicate || (form.isTouch && !form.isValid);

  const warnningText = form.isDuplicate
    ? "duplicate category name is not allowed"
    : "required";

  return (
    <Modal onClick={props.addSubCategoryModalToggler} classModal={styles.modal}>
      <Title className={styles.title}>add sub category</Title>
      <HorizontalLine />
      <div className={styles["subtitle__container"]}>
        <SubTitle>you're adding sub category of {props.mainCategory}</SubTitle>
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
            onClick={props.addSubCategoryModalToggler}
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
