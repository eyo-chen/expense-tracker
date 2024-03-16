import {  useReducer, useEffect } from "react";
import Modal from "../Modal/Modal";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import createDateStringFormat from "../../../Others/CreateDateStringFormat/CreateDateStringFormat";
import getToken from "../../../Others/GetToken/getToken";
import FormBtn from "./FormBtn";
import FormPrice from "./FormPrice";
import FormDate from "./FormDate";
import FormDescription from "./FormDescription";
import FormSubCategory from "./FormSubCategory";
import FormMainCategory from "./FormMainCategory";
import FormTitle from "./FormTitle";
import styles from "./AddDataForm.module.css";
import axios from "axios";

function AddDataForm(props) {
   const initialObj1 = {
      type: "expense", 
      mainCategList: [],
      subCategList: [],
      mainCateg: {},
      subCateg: {},
      date:  props.date === undefined
      ? createDateStringFormat(new Date())
      : createDateStringFormat(new Date(props.date)),
      description: "",
      price: "",
      priceTouch: false,
      isValid: false,
      isTooLarge: false,
   }

  const [formData, formDataDispatch] = useReducer(reducer1, initialObj1);

  function typeChangeHandler(e) {
    formDataDispatch({ type: "TYPE", value: e.target.value });
  }

  function mainCategoryChangeHandler(e) {
    const mainCateg = formData.mainCategList.find((categ) => categ.id === Number(e.target.value));
    formDataDispatch({
      type: "MAIN_CATEGORY",
      value: mainCateg,
    });
  }

  function subCategoryChangeHandler(e) {
    const subCateg = formData.subCategList.find((categ) => categ.id === Number(e.target.value));
    formDataDispatch({
      type: "SUB_CATEGORY",
      value: subCateg,
    });
  }

  function descriptionChangeHandler(e) {
    formDataDispatch({
      type: "DESCRIPTION",
      value: e.target.value,
    });
  }

  function dateChangeHandler(e) {
    console.log("dateChangeHandler", e.target.value)
    formDataDispatch({
      type: "DATE",
      value: e.target.value,
    });
  }

  function priceChangeHandler(e) {
    formDataDispatch({
      type: "PRICE",
      value: e.target.value,
    });
  }

  function inputPriceTouchHandler() {
    // it will always be true until user select or touch the price input
    formDataDispatch({
      type: "PRICE--TOUCH",
    });
  }

  async function formSubmitHandler(e) {
    e.preventDefault();

    const newFormData = {
      type: formData.type,
      main_category_id: formData.mainCateg.id,
      sub_category_id: formData.subCateg.id,
      date: formData.date + "T00:00:00.000Z",
      note: formData.description,
      price: Number(formData.price),
    };

    try {
      const response = await axios.post("http://localhost:4000/v1/transaction", newFormData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": getToken()
        },
        withCredentials: false
      })

      console.log("response", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    props.addDataFormModalToggler();

    if (props.changeDataHandler) props.changeDataHandler();
  }

  async function fetchMainCategList() {
    try {
      const mainCategoryResponse = await axios.get(`http://localhost:4000/v1/main-category?type=${formData.type}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": getToken()
        },
        withCredentials: false
      });
      const mainCategList = mainCategoryResponse.data.categories;

      return mainCategList;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchSubCategList(id) {
    if (!id) return [];

    try {
      const subCategoryResponse = await axios.get(`http://localhost:4000/v1/main-category/${id}/sub-category`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": getToken()
        },
        withCredentials: false
      });

      return subCategoryResponse.data.categories;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchMainCategList().then((data) => {
      formDataDispatch({ type: "MAIN_CATEGORY_LIST", value: data });
      formDataDispatch({ type: "MAIN_CATEGORY", value: data[0] });
      return data[0];
    }).then((data) => {
      fetchSubCategList(data.id).then((data) => {
        formDataDispatch({ type: "SUB_CATEGORY_LIST", value: data });
        formDataDispatch({ type: "SUB_CATEGORY", value: data[0] });
      });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    })
  }, [formData.type]);

  useEffect(() => {
    fetchSubCategList(formData.mainCateg.id).then((data) => {
      formDataDispatch({ type: "SUB_CATEGORY_LIST", value: data });
      formDataDispatch({ type: "SUB_CATEGORY", value: data[0] });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    })
  }, [formData.mainCateg]);


  return (
    <Modal onClick={props.addDataFormModalToggler} classModal={styles.modal}>
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <FormTitle
          type={formData.type}
          categoryChangeHandler={typeChangeHandler}
        />

        <HorizontalLine />
        <div className={styles["form__container"]}>
          <FormMainCategory
            list={formData.mainCategList}
            mainCateg={formData.mainCateg}
            mainCategoryChangeHandler={mainCategoryChangeHandler}
            edit={!(props.oldExpenseData === undefined)}
          />

          <FormSubCategory
            list={formData.subCategList}
            subCategoryChangeHandler={subCategoryChangeHandler}
          />

          <FormDescription
            description={formData.description}
            descriptionChangeHandler={descriptionChangeHandler}
          />

          <FormDate
            date={formData.date}
            dateChangeHandler={dateChangeHandler}
          />

          <FormPrice
            price={formData.price}
            priceTouch={formData.priceTouch}
            isValid={formData.isValid}
            isTooLarge={formData.isTooLarge}
            priceChangeHandler={priceChangeHandler}
            inputPriceTouchHandler={inputPriceTouchHandler}
          />

          <FormBtn
            addDataFormModalToggler={props.addDataFormModalToggler}
            isValid={formData.isValid}
            isTooLarge={formData.isTooLarge}
            oldExpenseData={props.oldExpenseData}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddDataForm;

/*
Reference 1
Note that do NOT directly hard code "food" or "salary"
because user may add, remove, edit main and sub category
what we want is showing the first main category, and it's sub category
*/


function reducer1(state, action) {
  switch (action.type) {
    case "TYPE": {
      return {
        ...state,
        type: action.value,
      }
    }

    case "MAIN_CATEGORY_LIST": {
      return {
        ...state,
        mainCategList: action.value,
      };
    }

    case "MAIN_CATEGORY": {
      return {
        ...state,
        mainCateg: action.value,
      };
    }

    case "SUB_CATEGORY": {
      return { ...state, subCateg: action.value };
    }

    case "SUB_CATEGORY_LIST": {
      return {
        ...state,
        subCategList: action.value,
      };
    }

    case "DESCRIPTION": {
      return { ...state, description: action.value };
    }

    case "DATE": {
      return { ...state, date: action.value };
    }

    case "PRICE": {
      let isValid = false,
        isTooLarge = false;
      if (
        action.value.trim().length > 0 &&
        !Object.is(-0, Number(action.value)) &&
        Number(action.value) >= 0
      )
        isValid = true;

      if (Number(action.value) > 1000000000000000) isTooLarge = true;

      return { ...state, isValid, isTooLarge, price: action.value };
    }

    case "PRICE--TOUCH": {
      // it will always be true once user have selected or touched the price input
      return { ...state, priceTouch: true };
    }

    default: {
      return state;
    }
  }
}

