import FormContainer from "./FormContainer";
import { AiFillWarning } from "react-icons/ai";

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

  return (
    <FormContainer className={props.classNameContainer}>
      <label className={props.classNameLabel}>price</label>
      <input
        onChange={props.priceChangeHandler}
        onBlur={props.inputPriceTouchHandler}
        type="number"
        className={
          priceValid
            ? `${props.classNameInputNonValid} ${props.classNameInput}`
            : `${props.classNameInput}`
        }
        value={props.price}
      ></input>
      <p
        className={
          priceValid
            ? `${props.classNameWarn} ${props.classNameWarnShow}`
            : `${props.classNameWarn}`
        }
      >
        {<AiFillWarning title="warning" />} price should be positive number
      </p>
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
