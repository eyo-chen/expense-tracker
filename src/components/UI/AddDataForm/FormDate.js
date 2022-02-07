import FormContainer from "./FormContainer";
import InputDate from "../InputDate/InputDate";
import style from "./AddDataForm.module.css";

function FormDate(props) {
  return (
    <FormContainer>
      <InputDate
        name="date"
        id="date"
        label="date"
        value={props.date}
        onChange={props.dateChangeHandler}
        classInput={style.input}
        classLabel={`${style.label} capitalize`}
      />
    </FormContainer>
  );
}

export default FormDate;
