import FormContainer from "./FormContainer";
import Select from "../Select/Select";
import style from "./AddDataForm.module.css";

function FormMainCategory(props) {
  return (
    <FormContainer>
      <label htmlFor="mainCategory" className={`${style.label} capitalize`}>
        main category
        <div className="center--flex">{props.icon}</div>
      </label>
      <Select
        id="mainCategory"
        name="mainCategory"
        className={style.input}
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
