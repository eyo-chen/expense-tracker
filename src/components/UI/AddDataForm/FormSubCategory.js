import FormContainer from "./FormContainer";

function FormSubCategory(props) {
  return (
    <FormContainer>
      <label className={props.classNameLabel}>sub category</label>

      <select
        value={props.subCategory}
        onChange={props.subCategoryChangeHandler}
        className={props.classNameInput}
        type="select"
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
