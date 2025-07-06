import { useState, useReducer, useContext } from "react";
import Modal from "../Modal/Modal";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import FormStockBtn from "./FormStockBtn";
import FormStockPrice from "./FormStockPrice";
import FormStockTitle from "./FormStockTitle";
import FormSymbol from "./FormSymbol";
import FormQuantity from "./FormQuantity";
import FormActionType from "./FormActionType";
import FormStockType from "./FormStockType";
import FormDate from "./FormDate";
import styles from "./AddStockForm.module.css";
import fetcher from "../../../Others/Fetcher/fetcher";
import UpdateStateContext from "../../../store/updateState/updateState--context";

function AddStockForm(props) {
  const [loading, setLoading] = useState(false);
  const { updateStateHandler } = useContext(UpdateStateContext);

  let initialObj = {
    symbol: "",
    stockType: "STOCKS",
    price: "0",
    quantity: "1",
    actionType: "BUY",
    date: new Date().toISOString().split("T")[0],
    symbolTouch: false,
    priceTouch: false,
    quantityTouch: false,
    isValid: false,
  };

  const [formData, formDataDispatch] = useReducer(reducer, initialObj);

  function stockTypeChangeHandler(e) {
    formDataDispatch({
      type: "STOCK_TYPE",
      value: e.target.value,
    });
  }

  function symbolChangeHandler(e) {
    formDataDispatch({
      type: "SYMBOL",
      value: e.target.value,
    });
  }

  function priceChangeHandler(e) {
    formDataDispatch({
      type: "PRICE",
      value: e.target.value,
    });
  }

  function quantityChangeHandler(e) {
    formDataDispatch({
      type: "QUANTITY",
      value: e.target.value,
    });
  }

  function actionTypeChangeHandler(e) {
    formDataDispatch({
      type: "ACTION_TYPE",
      value: e.target.value,
    });
  }

  function inputSymbolTouchHandler() {
    formDataDispatch({
      type: "SYMBOL--TOUCH",
    });
  }

  function inputPriceTouchHandler() {
    formDataDispatch({
      type: "PRICE--TOUCH",
    });
  }

  function inputQuantityTouchHandler() {
    formDataDispatch({
      type: "QUANTITY--TOUCH",
    });
  }

  function dateChangeHandler(e) {
    formDataDispatch({
      type: "DATE",
      value: e.target.value,
    });
  }

  async function formSubmitHandler(e) {
    e.preventDefault();

    const data = {
      symbol: formData.symbol,
      stock_type: formData.stockType,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      action_type: formData.actionType,
      date: formData.date + "T00:00:00.000Z",
    };

    setLoading(true);
    try {
      await createStock(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
    addStockFormModalToggler();
    updateStateHandler();
  }

  function addStockFormModalToggler() {
    if (!loading) {
      props.addStockFormModalToggler();
    }
  }

  return (
    <Modal onClick={addStockFormModalToggler} classModal={styles.modal}>
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <FormStockTitle title="Add Stock" actionType={formData.actionType} actionTypeChangeHandler={actionTypeChangeHandler} />
        <HorizontalLine />
        <div className={styles["form__container"]}>
          {formData.actionType !== "TRANSFER" && (
            <FormSymbol
              symbol={formData.symbol}
              symbolTouch={formData.symbolTouch}
              disabled={loading}
              symbolChangeHandler={symbolChangeHandler}
              inputSymbolTouchHandler={inputSymbolTouchHandler}
            />
          )}

          <FormStockPrice
            price={formData.price}
            priceTouch={formData.priceTouch}
            disabled={loading}
            priceChangeHandler={priceChangeHandler}
            inputPriceTouchHandler={inputPriceTouchHandler}
          />

          {formData.actionType !== "TRANSFER" && (
            <FormQuantity
              quantity={formData.quantity}
              quantityTouch={formData.quantityTouch}
              disabled={loading}
              quantityChangeHandler={quantityChangeHandler}
              inputQuantityTouchHandler={inputQuantityTouchHandler}
            />
          )}

          {formData.actionType !== "TRANSFER" && (
            <FormStockType
              stockType={formData.stockType}
              disabled={loading}
              stockTypeChangeHandler={stockTypeChangeHandler}
            />
          )}

          {formData.actionType !== "TRANSFER" && (
            <FormActionType
              actionType={formData.actionType}
              disabled={loading}
              actionTypeChangeHandler={actionTypeChangeHandler}
            />
          )}

          <FormDate
            date={formData.date}
            disabled={loading}
            dateChangeHandler={dateChangeHandler}
          />

          <FormStockBtn
            addStockFormModalToggler={addStockFormModalToggler}
            isValid={formData.isValid}
            isCategValid={true}
            isTooLarge={false}
            btnText="Add Stock"
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddStockForm;

function reducer(state, action) {
  switch (action.type) {
    case "SYMBOL": {
      let isValid = state.isValid;
      if (state.stockType === "STOCKS") {
        isValid = state.symbol.trim().length > 0 &&
          Number(state.price) > 0 &&
          Number(state.quantity) > 0;
      } else {
        isValid = true;
      }

      return { ...state, symbol: action.value, isValid };
    }

    case "STOCK_TYPE": {
      return { ...state, stockType: action.value }
    }

    case "PRICE": {
      let isValid = Number(action.value) > 0 && state.price.trim().length > 0 && Number(state.quantity) > 0;

      return { ...state, price: action.value, isValid };
    }

    case "QUANTITY": {
      let isValid = state.isValid;
      if (state.stockType === "STOCKS") {
        isValid = Number(action.value) > 0 &&
          Number(state.price) > 0 &&
          state.symbol.trim().length > 0;
      } else {
        isValid = true;
      }

      return { ...state, quantity: action.value, isValid };
    }

    case "ACTION_TYPE": {
      if (action.value !== "TRANSFER")
        return { ...state, actionType: action.value };

      const newState = {
        symbol: "",
        stockType: "STOCKS",
        price: "0",
        quantity: "1",
        actionType: action.value,
        symbolTouch: false,
        priceTouch: false,
        quantityTouch: false,
        isValid: false,
        date: new Date().toISOString().split("T")[0],
      }

      return newState;
    }

    case "DATE": {
      return { ...state, date: action.value };
    }

    case "SYMBOL--TOUCH": {
      return { ...state, symbolTouch: true };
    }

    case "PRICE--TOUCH": {
      return { ...state, priceTouch: true };
    }

    case "QUANTITY--TOUCH": {
      return { ...state, quantityTouch: true };
    }

    default: {
      return state;
    }
  }
}


async function createStock(data) {
  try {
    await fetcher("v1/stock", "POST", data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
