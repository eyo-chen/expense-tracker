import FormContainer from "./FormContainer";
import InputDate from "../InputDate/InputDate";

function FormDate(props) {
  return (
    <FormContainer>
      <InputDate
        name="date"
        id="date"
        label="date"
        value={props.date}
        onChange={props.dateChangeHandler}
        classInput={props.classInput}
        classLabel={props.classLabel}
      />
    </FormContainer>
  );
}

export default FormDate;
