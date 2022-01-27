import { useState, useContext } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import CategoryContext from "../../../store/category/category--context";
import style from "./AddingSubCategoryModal.module.css";
import Warning from "../Warning/Warning";

function AddingSubCategoryModal(props) {
  const [name, setName] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  const { categoryExpense, categoryIncome, addSubCategory } =
    useContext(CategoryContext);

  // the sub category has either to be in expense or income
  const subCategoryNameArr =
    categoryExpense[props.mainCategory] || categoryIncome[props.mainCategory];

  function inputTextChangeHandler(e) {
    setName(e.target.value);

    setDuplicate(subCategoryNameArr.includes(e.target.value));
  }

  function submitHandler(e) {
    e.preventDefault();

    // the logic here is exactly as same as adding main category

    addSubCategory(name, props.category, props.mainCategory);

    props.addSubCategoryAndModal(null, name);
  }

  return (
    <Modal classModal={style.modal}>
      <Title className={style.title}>add sub category</Title>
      <HorizontalLine />
      <div className={style["subtitle__container"]}>
        <SubTitle className={style.subtitle}>
          you're adding sub category of {props.mainCategory}
        </SubTitle>
      </div>
      <form onSubmit={submitHandler}>
        <div className={style["big__container"]}>
          <div className={style["input__container"]}>
            <InputText
              name="subcategory name"
              label="subcategory name"
              value={name}
              onChange={inputTextChangeHandler}
              classLabel={style.label}
              classInput={
                duplicate
                  ? `${style.input} ${style["input--invalid"]}`
                  : `${style.input}`
              }
            />
          </div>

          <Warning className={style.warning} index={duplicate}>
            duplicate category name is not allowed
          </Warning>
        </div>

        <div className={style["btn__container"]}>
          <Button
            type="button"
            className={`${style.btn} ${style["btn--isValid"]}`}
            onClick={props.addSubCategoryAndModal}
          >
            cancel
          </Button>
          <Button
            /*
            Note that 
            if disabled={true}, it means do NOT let user submit the form
            so the logic would be, we only want it to be true if the data is NOT valid

            in this case, if
            1) there is no name (input)
            2) the name is duplicate
            then we want the button to be disabled

            note that this condition is exactly opposite of the className below
            */
            disabled={name.trim().length === 0 || duplicate}
            type="submit"
            className={
              name.trim().length > 0 && !duplicate
                ? `${style.btn} ${style["btn--isValid"]}`
                : `${style.btn}`
            }
          >
            add
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddingSubCategoryModal;

/*
import { useReducer, useEffect } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import SubTitle from "../SubTitle/SubTitle";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InputText from "../InputText/InputText";
import Button from "../Button";
import style from "./AddingSubCategoryModal.module.css";
import { v4 as uuidv4 } from "uuid";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_INPUT_TEXT": {
      return {
        ...state,
        inputTextAmount: state.inputTextAmount + 1,
      };
    }
    case "REMOVE_INPUT_TEXT": {
      return {
        ...state,
        inputTextAmount: state.inputTextAmount - 1,
      };
    }

    case "INPUT_TEXT_CHANGE": {
      const nameArr = [...state.nameArr];

      nameArr[action.id] = action.value;

      return { ...state, nameArr, test: action.value };
    }

    case "aa": {
      return { state };
    }

    default: {
      return state;
    }
  }
}

function AddingSubCategoryModal(props) {
  const [form, formDispatch] = useReducer(reducer, {
    nameArr: [""],
    test: "",
    inputTextAmount: 1,
    inputTextChangeHandler,
  });

  function btnKeepAddingClickHandler() {
    formDispatch({ type: "ADD_INPUT_TEXT" });
  }

  function btnRemoveAddingClickHandler() {
    formDispatch({ type: "REMOVE_INPUT_TEXT" });
  }

  function inputTextChangeHandler(e) {
    formDispatch({
      type: "INPUT_TEXT_CHANGE",
      id: e.target.dataset.id,
      value: e.target.value,
    });
  }

  let inputTextAmountArr = [];

  for (let i = 0; i < form.inputTextAmount; i++) {
    inputTextAmountArr.push(
      <InputText
        key={uuidv4()}
        label="name"
        classInputContainer={style["input__container"]}
        dataID={i}
      />
    );
  }

  return (
    <Modal>
      <Title className={style.title}>add sub category</Title>
      <HorizontalLine />
      <div className={style["subtitle__container"]}>
        <SubTitle className={style.subtitle}>
          you're adding sub category
        </SubTitle>
        <SubTitle className={style.subtitle}>of food</SubTitle>
      </div>
      <form
        className={
          inputTextAmountArr.length > 3
            ? `${style.overflow} ${style.form}`
            : `${style.form}`
        }
      >
        {inputTextAmountArr}
        <div className={style["btn__container--small"]}>
          <Button
            disabled={inputTextAmountArr.length === 1}
            className={
              inputTextAmountArr.length === 1
                ? `${style["btn--disabled--small"]}`
                : `${style["btn--small"]}`
            }
            type="button"
            onClick={btnRemoveAddingClickHandler}
          >
            remove adding
          </Button>
          <Button
            className={style["btn--small"]}
            type="button"
            onClick={btnKeepAddingClickHandler}
          >
            keep adding
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddingSubCategoryModal;
*/
