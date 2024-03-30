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
        id="subCategory"
        name="subCategory"
        className={styles.input}
        onChange={props.subCategoryChangeHandler}
        value={props.subCategory?.id}
      >
        {props?.list?.map(({id, name}) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Select>
    </FormContainer>
  );
}

export default FormSubCategory;
