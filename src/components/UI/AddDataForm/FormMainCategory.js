import FormContainer from "./FormContainer";
import Select from "../Select/Select";
import styles from "./AddDataForm.module.css";

function FormMainCategory(props) {
  return (
    <FormContainer>
      <label htmlFor="mainCategory" className={`${styles.label} capitalize`}>
        main category
        {props.mainCateg && (
          <div className={`center--flex ${styles.icon}`}>
            <img
              alt={props.mainCateg?.name}
              className={`icon`}
              src={props.mainCateg?.icon?.url}
            />
            </div>
        )}
      </label>
      <Select
        id="mainCategory"
        name="mainCategory"
        className={styles.input}
        onChange={props.mainCategoryChangeHandler}
        value={props.mainCateg?.id}
      >
        {props?.list.map(({id, name}) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Select>
    </FormContainer>
  );
}

export default FormMainCategory;