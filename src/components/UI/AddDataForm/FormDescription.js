import FormContainer from "./FormContainer";
import InputText from "../InputText/InputText";
import styles from "./AddDataForm.module.css";

function FormDescription(props) {
  return (
    <FormContainer>
      <InputText
        value={props.description}
        name="description"
        id="description"
        label="description (optional)"
        onChange={props.descriptionChangeHandler}
        classInput={styles.input}
        classLabel={`${styles.label} capitalize`}
      />
    </FormContainer>
  );
}

export default FormDescription;
