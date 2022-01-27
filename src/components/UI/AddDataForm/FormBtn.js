import Button from "../Button/Button";

function FormBtn(props) {
  return (
    <div className={props.classContainer}>
      <Button
        type="button"
        className={props.classCancel}
        onClick={props.addDataFormModalToggler}
      >
        cancel
      </Button>
      <Button type="submit" className={props.classAdd} disabled={props.isValid}>
        {props.oldExpenseData ? "edit" : "add"}
      </Button>
    </div>
  );
}

export default FormBtn;
