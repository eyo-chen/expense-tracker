import FormContainer from "./FormContainer";
import Select from "../Select/Select";
import style from "./AddDataForm.module.css";

function FormSubCategory(props) {
  return (
    <FormContainer>
      <label htmlFor="subCategory" className={`${style.label} capitalize`}>
        sub category
      </label>
      <Select
        onChange={props.subCategoryChangeHandler}
        className={style.input}
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
