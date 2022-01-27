import FormContainer from "./FormContainer";
import Select from "../Select/Select";

function FormMainCategory(props) {
  return (
    <FormContainer>
      <label htmlFor="mainCategory" className={props.classLabel}>
        main category
        <div className={props.classIcon}>{props.icon}</div>
      </label>
      <Select
        value={props.mainCategory}
        id="mainCategory"
        name="mainCategory"
        className={props.classInput}
        onChange={props.mainCategoryChangeHandler}
      >
        {props.mainCategoryArr.map((element) => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </Select>
    </FormContainer>
  );
}

export default FormMainCategory;
