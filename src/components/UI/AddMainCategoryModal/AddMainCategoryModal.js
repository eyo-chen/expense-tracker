import { useReducer, useContext } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import Button from "../Button";
import InputText from "../InputText/InputText";
import InputRadio from "../InputRadio/InputRadio";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import CategoryContext from "../../../store/category/category--context";
import Warning from "../Warning/Warning";
import style from "./AddMainCategoryModal.module.css";
import { v4 as uuidv4 } from "uuid";

function reducer(state, action) {
  switch (action.type) {
    case "NAME": {
      const isDuplicate = state.allCategoryNameArr.includes(action.value);

      return {
        ...state,
        name: action.value,
        isValid:
          action.value.trim().length > 0 && state.iconIndex && !isDuplicate,
        isDuplicate,
      };
    }

    case "ICON": {
      return {
        ...state,
        iconIndex: action.value,
        isValid:
          state.name.trim().length > 0 && action.value && !state.isDuplicate,
      };
    }

    default: {
      return state;
    }
  }
}

function AddMainCategoryModal(props) {
  const { addMainCategory, iconArr, categoryExpense, categoryIncome } =
    useContext(CategoryContext);

  const allCategoryNameArr = Object.keys(categoryExpense).concat(
    Object.keys(categoryIncome)
  );
  const [form, formDispatch] = useReducer(reducer, {
    name: "",
    iconIndex: false,
    isValid: false,
    isDuplicate: false,
    allCategoryNameArr,
  });

  function inputTextChangeHandler(e) {
    formDispatch({ type: "NAME", value: e.target.value });
  }

  function radioIconChangeHandler(e) {
    formDispatch({ type: "ICON", value: e.target.value });
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    /*
    Note that we need to do two things when form is submitted

    1) close the adding modal and add the category to the SettingCategory
       (for the sake of immediate showing at that state)
       (this is accomplished by props.addMainCategoryAndModal)
    
    2) truly add the category inside the category provider
       (this is accomplished by addMainCategory)

    Again, it seems we're doing duplicate work
    But it's not
    First function is to make the UI immediately adding the new adding category
    Second function is truly add the category where we storing all the category
    */

    props.addMainCategoryAndModal(null, form.name);

    addMainCategory(form.name, form.iconIndex, props.category);
  }

  return (
    <Modal className={style.modal}>
      <Title className={style.title}>add main category</Title>
      <HorizontalLine />
      <form onSubmit={formSubmitHandler} className={style.form}>
        <div className={style["big__container"]}>
          <InputText
            id="name"
            type="text"
            label="category name"
            value={form.name}
            classLabel={style.label}
            classInput={
              form.isDuplicate
                ? `${style.input} ${style["input--invalid"]}`
                : `${style.input}`
            }
            classInputContainer={style["input__container"]}
            onChange={inputTextChangeHandler}
          />

          <Warning className={style.warning} index={form.isDuplicate}>
            duplicate category name is not allowed
          </Warning>
        </div>
        <div
          className={`${style["input__container"]} ${style["input__container--icon"]}`}
        >
          <p className={`${style.label} ${style["label--icon"]}`}>icon</p>
          <div className={style["icon__container"]}>
            {iconArr.map((element, index) => (
              <InputRadio
                key={uuidv4()}
                name="icon"
                label={element}
                value={index}
                classLabel={style.icon}
                classContainer={style["radio__container"]}
                classInput={style["input--icon"]}
                onChange={radioIconChangeHandler}
                checked={index + "" === form.iconIndex}
              />
            ))}
          </div>
        </div>
        <div className={style["btn__container"]}>
          <Button
            onClick={props.addMainCategoryAndModal}
            className={`${style.btn} ${style["btn--isValid"]}`}
            type="button"
          >
            cancel
          </Button>
          <Button
            disabled={!form.isValid}
            className={`${style.btn} ${
              form.isValid ? `${style["btn--isValid"]}` : ""
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
