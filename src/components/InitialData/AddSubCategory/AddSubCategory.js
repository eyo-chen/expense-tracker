import { useReducer } from "react";
import Modal from "./../../../components/UI/Modal/Modal";
import Title from "./../../../components/UI/Title/Title";
import SubTitle from "./../../../components/UI/SubTitle/SubTitle";
import HorizontalLine from "./../../../components/UI/HorizontalLine/HorizontalLine";
import InputText from "./../../../components/UI/InputText/InputText";
import Button from "./../../../components/UI/Button/Button";
import Warning from "./../../../components/UI/Warning/Warning";
import styles from "./AddSubCategory.module.css"

function AddingSubCategoryModal(props) {
  const [form, formDispatch] = useReducer(reducer, {
    name: "",
    isDuplicate: false,
    isTouch: false,
    isValid: false,
    categoryNameList: props.categoryNameList,
  });

  function inputTextTouchHandler() {
    formDispatch({ type: "TOUCH" });
  }

  function inputTextChangeHandler(e) {
    formDispatch({ type: "NAME", value: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();

    props.addSubCategoryHandler(form.name);
    props.addSubCategoryModalToggler();
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

function reducer(state, action) {
  switch (action.type) {
    case "NAME": {
      const isDuplicate = state.categoryNameList?.find(
        name => name === action.value
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
