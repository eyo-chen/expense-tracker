import Button from "../Button/Button";

function FormBtn(props) {
  return (
    <div className={props.classNameContainer}>
      <Button
        type="button"
        className={props.classNameCancel}
        onClick={props.cancelClickHandler}
      >
        cancel
      </Button>
      <Button
        type="submit"
        className={props.classNameAdd}
        disabled={props.isValid}
      >
        {props.initialObj ? "edit" : "add"}
      </Button>
    </div>
  );
}

export default FormBtn;
