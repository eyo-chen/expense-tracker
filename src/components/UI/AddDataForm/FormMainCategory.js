import FormContainer from "./FormContainer";

function FormMainCategory(props) {
  return (
    <FormContainer>
      <label className={props.classNameLabel}>
        main category
        <div className={props.classNameIcon}>{props.icon}</div>
      </label>
      <select
        value={props.mainCategory}
        onChange={props.mainCategoryChangeHandler}
        className={props.classNameInput}
        type="select"
      >
        {props.mainCategoryArr.map((element) => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </select>
    </FormContainer>
  );
}

export default FormMainCategory;
