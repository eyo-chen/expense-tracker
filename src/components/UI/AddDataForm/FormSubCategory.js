import FormContainer from "./FormContainer";
import Select from "../Select/Select";
import styles from "./AddDataForm.module.css";

function FormSubCategory(props) {
  return (
    <FormContainer>
      <label htmlFor="subCategory" className={`${styles.label} capitalize`}>
        sub category
      </label>
      <Select
        onChange={props.subCategoryChangeHandler}
        className={styles.input}
        name="subCategory"
        id="subCategory"
      >
        {props?.list?.map(({id, name}) => (
          <option value={id} key={name}>
            {name}
          </option>
        ))}
      </Select>
    </FormContainer>
  );
}

export default FormSubCategory;
