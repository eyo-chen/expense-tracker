import FormContainer from "./FormContainer";
import Warning from "../Warning/Warning";
import style from "./AddDataForm.module.css";

function FormPrice(props) {
  // Reference 1
  const invalid = !props.isValid && props.priceTouch;

  let classInput = `${style.input} input`;
  if (invalid || props.isTooLarge) classInput += " input--invalid";

  let warningText = "price must be positive integer";
  if (props.isTooLarge) warningText = "sorry! price should be less than 1000T";

  return (
    <FormContainer className={style["price__container"]}>
      <label htmlFor="price" className={`${style.label} capitalize`}>
        price
      </label>
      <input
        onChange={props.priceChangeHandler}
        onBlur={props.inputPriceTouchHandler}
        type="number"
        className={classInput}
        value={props.price}
        id="price"
      ></input>
      <Warning index={invalid || props.isTooLarge} className={style.warning}>
        {warningText}
      </Warning>
    </FormContainer>
  );
}

export default FormPrice;
/*
Reference 1
this validation is for UI (red outline)
we only want to show the red outline to user when
1) user has selected or touched the price input
2) user input the wrong input
*/
