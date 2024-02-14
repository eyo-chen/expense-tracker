import FormContainer from "./FormContainer";
import Select from "../Select/Select";
import styles from "./AddDataForm.module.css";

function FormMainCategory(props) {
  return (
    <FormContainer>
      <label htmlFor="mainCategory" className={`${styles.label} capitalize`}>
        main category
        <div className={`center--flex ${styles.icon}`}>
          <img
            alt={props.mainCateg?.name}
            className={`icon`}
            src={props.mainCateg?.icon?.url}
          />
        </div>
      </label>
      <Select
        id="mainCategory"
        name="mainCategory"
        className={styles.input}
        onChange={props.mainCategoryChangeHandler}
      >
        {props?.list.map(({id, name, type}) => (
          // Reference 1
          <option value={id} key={`${name}-${type}`}>
            {name}
          </option>
        ))}
      </Select>
    </FormContainer>
  );
}

export default FormMainCategory;
/*
Reference 1
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

Update at 02/09
It turns out we can't use uuidv4() either
If we use uuidv4() here, a weird behavior will show up
Try to use uuidv4() to see the weird behavior
So i change to use ${element}-${props.type}
I guess there are two good reason to do this
1. Seperate same names in different type
For example, both expense and income may have "others" in the same time
but if we use this as key, now the two keys are different
one is "others-expense", the other one is "others-income"
By doing so, we can avoid weird behavior when user change the type
2. Each element of select will always have same key
If we use uuidv4(), each element of select will have differnt key,
I guess this is the reason for the weird behavior
By doing so, each key of element is unique, and each key of element is always keeping same
*/

/*
Reference 2
Why we need newSelectArr?
Because when user click edit button to show the addDataForm
User wanna see that selet of mainCategory is showing the main category of edited
For example, in the normal case of showing the addDataForm by clickin the home main button
It's okay to always show "Food" as main category and "breakfast" as sub category, so called default category
But if user click edit button on one data to show the addDataForm
It's not okay still show the default category
what we wanna show is the main and sub caregory of the edited data

How are we gonna do this?
We have to make sure the category of the edited data is at the very first element of category array

that's why we need createNewSelectArr helper function

Same logic for sub category

Go to see the detail code implement of createNewSelectArr helper function

Note that we only invoke the helper function if props.edit is true
in other words, user wanna edit the data
*/
