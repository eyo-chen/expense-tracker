import FormContainer from "./FormContainer";
import InputText from "../InputText/InputText";

function FormDescription(props) {
  return (
    <FormContainer>
      <InputText
        value={props.description}
        name="description"
        id="description"
        label="description (optional)"
        onChange={props.descriptionChangeHandler}
        classInput={props.classInput}
        classLabel={props.classLabel}
      />
    </FormContainer>
  );
}

export default FormDescription;
