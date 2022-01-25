import FormContainer from "./FormContainer";

function FormDate(props) {
  return (
    <FormContainer>
      <label htmlFor="date" className={props.classNameLabel}>
        date
      </label>
      <input
        value={props.date}
        className={props.classNameInput}
        onChange={props.dateChangeHandler}
        type="date"
        id="date"
      ></input>
    </FormContainer>
  );
}

export default FormDate;
