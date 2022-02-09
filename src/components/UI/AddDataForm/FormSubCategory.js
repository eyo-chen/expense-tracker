import FormContainer from "./FormContainer";
import Select from "../Select/Select";
import createNewSelectArr from "../../../Others/CreateNewSelectArr/createNewSelectArr";
import style from "./AddDataForm.module.css";

function FormSubCategory(props) {
  let newSelectArr = props.subCategoryArr;
  if (props.edit)
    newSelectArr = createNewSelectArr(props.subCategoryArr, props.subCategory);

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
        {newSelectArr.map((element) => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </Select>
    </FormContainer>
  );
}

export default FormSubCategory;
