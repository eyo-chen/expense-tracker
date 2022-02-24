import FormContainer from "./FormContainer";
import InputText from "../InputText/InputText";
import styles from "./AddDataForm.module.css";

function FormDescription(props) {
  return (
    <FormContainer>
      <InputText
        value={props.description}
        name="notes"
        id="notes"
        label="notes (optional)"
        onChange={props.descriptionChangeHandler}
        classInput={styles.input}
        classLabel={`${styles.label} capitalize`}
      />
    </FormContainer>
  );
}

export default FormDescription;
