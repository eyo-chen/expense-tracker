import FormContainer from "./FormContainer";

function FormDescription(props) {
  return (
    <FormContainer>
      <label htmlFor="description" className={props.classNameLabel}>
        description (optional)
      </label>
      <input
        value={props.description}
        onChange={props.descriptionChangeHandler}
        className={props.classNameInput}
        type="text"
        id="description"
      ></input>
    </FormContainer>
  );
}

export default FormDescription;
