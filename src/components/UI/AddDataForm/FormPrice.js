import FormContainer from "./FormContainer";
import Warning from "../Warning/Warning";

function FormPrice(props) {
  /*
  this validation is for UI (red outline)
  we only want to show the red outline to user when
  1) user has selected or touched the price input
  2) user input the wrong input

  Note that this validation has noting to do with the final validation which is controled the button

  props.isValid is the validation to control that
  */
  const priceValid = props.isValid && props.priceTouch;

  const classNameInput = priceValid
    ? `${props.classInputInvalid} ${props.classInput} input`
    : `${props.classInput} input`;

  return (
    <FormContainer className={props.classContainer}>
      <label htmlFor="price" className={props.classLabel}>
        price
      </label>
      <input
        onChange={props.priceChangeHandler}
        onBlur={props.inputPriceTouchHandler}
        type="number"
        className={classNameInput}
        value={props.price}
        id="price"
      ></input>
      <Warning index={priceValid} className={props.classWarn}>
        price should be positive number
      </Warning>
    </FormContainer>
  );
}

export default FormPrice;
/*
 className={
          props.isValid
            ? `${props.classNameInput}`
            : `${props.classNameInput} ${props.classnameInputNonValid}`
        }
*/
