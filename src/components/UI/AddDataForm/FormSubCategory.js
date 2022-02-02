import FormContainer from "./FormContainer";
import Select from "../Select/Select";

function FormSubCategory(props) {
  return (
    <FormContainer>
      <label htmlFor="subCategory" className={props.classLabel}>
        sub category
      </label>
      <Select
        onChange={props.subCategoryChangeHandler}
        className={props.classInput}
        name="subCategory"
        id="subCategory"
      >
        {props.subCategoryArr.map((element) => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </Select>
    </FormContainer>
  );
}

export default FormSubCategory;
