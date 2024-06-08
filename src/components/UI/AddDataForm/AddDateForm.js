import { useState, useReducer, useEffect, useContext } from "react";
import Modal from "../Modal/Modal";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import UpdateStateContext from "../../../store/updateState/updateState--context";
import createDateStringFormat from "../../../Others/CreateDateStringFormat/CreateDateStringFormat";
import FormBtn from "./FormBtn";
import FormPrice from "./FormPrice";
import FormDate from "./FormDate";
import FormDescription from "./FormDescription";
import FormSubCategory from "./FormSubCategory";
import FormMainCategory from "./FormMainCategory";
import FormTitle from "./FormTitle";
import styles from "./AddDataForm.module.css";
import fetcher from "../../../Others/Fetcher/fetcher";

function AddDataForm(props) {
  const [isInitialMainCateg, setIsInitialMainCateg] = useState(true);
  const { updateStateHandler } = useContext(UpdateStateContext);

  let initialObj = {
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
  };

  // if it's updating data
  if (props.editDataInfo) {
    initialObj = {
      ...initialObj,
      type: props.editDataInfo.type,
      mainCateg: props.editDataInfo.mainCategory,
      subCateg: props.editDataInfo.subCategory,
      price: props.editDataInfo.price,
      date: createDateStringFormat(new Date(props.editDataInfo.date)),
      description: props.editDataInfo.note,
      isValid: true,
    }
  }

  const [formData, formDataDispatch] = useReducer(reducer, initialObj);

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

    if (props.editDataInfo) {
      try {
        await updateTransaction(props.editDataInfo.id, newFormData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      props.btnMoreToggler();
    } else {
      try {
        await createTransaction(newFormData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    props.addDataFormModalToggler();
    updateStateHandler();
  }

  useEffect(() => {
    fetchMainCategList(formData.type).then((data) => {
      formDataDispatch({ type: "MAIN_CATEGORY_LIST", value: data });

      if (!props.editDataInfo) {
        formDataDispatch({ type: "MAIN_CATEGORY", value: data[0] });
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
    })
  }, [formData.type]);

  useEffect(() => {
    if (!formData?.mainCateg) {
      formDataDispatch({ type: "SUB_CATEGORY_LIST", value: [] });
      formDataDispatch({ type: "SUB_CATEGORY", value: {} });
      return;
    }

    fetchSubCategList(formData.mainCateg.id).then((data) => {
      formDataDispatch({ type: "SUB_CATEGORY_LIST", value: data });

      // 1. If it's adding new data(!props.editDataInfo), always set the first sub category as default
      // 2. If it's updating data(props.editDataInfo), and it's not the first time the main category is set, set the first sub category as default
      // If it's updating data, and it's the first time the main category is set, we don't want to set the first sub category as default
      // because we want to let the sub category be the same as the previous data(old data)
      if (!props.editDataInfo || !isInitialMainCateg) {
        formDataDispatch({ type: "SUB_CATEGORY", value: data[0] });
      }

      setIsInitialMainCateg(false);
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
          isEditing={!!props.editDataInfo}
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
            subCategory={formData.subCateg}
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
            isCategValid={!!formData.mainCateg?.id && !!formData.subCateg?.id}
            isTooLarge={formData.isTooLarge}
            editDataInfo={props.editDataInfo}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddDataForm;


function reducer(state, action) {
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

async function fetchMainCategList(type) {
  try {
    const data = await fetcher(`v1/main-category?type=${type}`, "GET");

    return data.categories;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function fetchSubCategList(id) {
  if (!id) return [];

  try {
    const data = await fetcher(`v1/main-category/${id}/sub-category`, "GET");
    return data.categories;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function createTransaction(data) {
  try {
    await fetcher("v1/transaction", "POST", data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function updateTransaction(id, data) {
  try {
    await fetcher(`v1/transaction/${id}`, "PUT", data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}