import { useContext, useReducer } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import CategoryContext from "../../../store/category/category--context";
import style from "./AddingSubCategoryModal.module.css";
import Warning from "../Warning/Warning";

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
  }

  const warnningIndex = form.isDuplicate || (form.isTouch && !form.isValid);

  const warnningText = form.isDuplicate
    ? "duplicate category name is not allowed"
    : "empty is not allowed";

  return (
    <Modal classModal={style.modal}>
      <Title className={style.title}>add sub category</Title>
      <HorizontalLine />
      <div className={style["subtitle__container"]}>
        <SubTitle>you're adding sub category of {props.mainCategory}</SubTitle>
      </div>
      <form onSubmit={submitHandler}>
        <div className={style.container}>
          <div className={style["input__container"]}>
            <InputText
              name="subcategory name"
              label="subcategory name"
              value={form.name}
              onChange={inputTextChangeHandler}
              onBlur={inputTextTouchHandler}
              classLabel={style.label}
              classInput={
                warnningIndex
                  ? `${style.input} input--invalid`
                  : `${style.input}`
              }
            />
          </div>

          <Warning className={style.warning} index={warnningIndex}>
            {warnningText}
          </Warning>
        </div>

        <div className={style["btn__container"]}>
          <Button
            type="button"
            className={`${style.btn} uppercase btn--valid transition--25`}
            onClick={props.addSubCategoryModalToggler}
          >
            cancel
          </Button>
          <Button
            disabled={!form.isValid}
            type="submit"
            className={`${style.btn} uppercase transition--25 ${
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
