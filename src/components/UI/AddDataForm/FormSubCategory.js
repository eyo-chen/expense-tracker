import FormContainer from "./FormContainer";

function FormSubCategory(props) {
  return (
    <FormContainer>
      <label htmlFor="subCategory" className={props.classNameLabel}>
        sub category
      </label>
      <select
        value={props.subCategory}
        onChange={props.subCategoryChangeHandler}
        className={props.classNameInput}
        type="select"
        id="subCategory"
      >
        {props.subCategoryArr.map((element) => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </select>
    </FormContainer>
  );
}

export default FormSubCategory;
