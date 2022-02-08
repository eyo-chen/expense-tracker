import FormContainer from "./FormContainer";
import Select from "../Select/Select";
import { v4 as uuidv4 } from "uuid";
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
          // Reference 1
          <option value={element} key={uuidv4()}>
            {element}
          </option>
        ))}
      </Select>
    </FormContainer>
  );
}

export default FormMainCategory;
/*
Although it seems each type of main category array won't have duplicate name
because we stop user to add duplicate name in addMainCategoryModal
BUT
we do allow user to have same category name in differtn type
For example, in both expense and income
we allow user to have same "others" main category
But if we use each name of element as "key" in <option></option>
it will cause unexpected behavoir
when user change the type, main category array in <option></option> always first show that duplicate name
i guess it's react for the performance issue
so we use uuidv4() to make sure every single main category name in both expense and income can have unique key
*/
