import FormContainer from "./FormContainer";

function FormDescription(props) {
  return (
    <FormContainer>
      <label className={props.classNameLabel}>description (optional)</label>
      <input
        value={props.description}
        onChange={props.descriptionChangeHandler}
        className={props.classNameInput}
        type="text"
      ></input>
    </FormContainer>
  );
}

export default FormDescription;
