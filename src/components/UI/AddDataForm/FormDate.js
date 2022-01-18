import FormContainer from "./FormContainer";

function FormDate(props) {
  return (
    <FormContainer>
      <label className={props.classNameLabel}>date</label>
      <input
        value={props.date}
        className={props.classNameInput}
        type="date"
        onChange={props.dateChangeHandler}
      ></input>
    </FormContainer>
  );
}

export default FormDate;
