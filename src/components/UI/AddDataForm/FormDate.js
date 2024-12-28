import FormContainer from "./FormContainer";
import InputDate from "../InputDate/InputDate";
import styles from "./AddDataForm.module.css";

function FormDate(props) {
  return (
    <FormContainer>
      <InputDate
        name="date"
        id="date"
        label="date"
        value={props.date}
        onChange={props.dateChangeHandler}
        classInput={styles.input}
        classLabel={`${styles.label} capitalize`}
        disabled={props.disabled}
      />
    </FormContainer>
  );
}

export default FormDate;
