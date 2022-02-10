import Button from "../Button/Button";
import style from "./AddDataForm.module.css";

function FormBtn(props) {
  const classAddBtn = `${style.btn} uppercase transition--25 ${
    !props.isValid || props.isTooLarge ? `btn--invalid` : `btn--valid`
  }`;

  return (
    <div className={style["btn__container"]}>
      <Button
        type="button"
        className={`${style.btn} uppercase transition--25 btn--valid`}
        onClick={props.addDataFormModalToggler}
      >
        cancel
      </Button>
      <Button
        type="submit"
        className={classAddBtn}
        disabled={!props.isValid || props.isTooLarge}
      >
        {props.oldExpenseData ? "edit" : "add"}
      </Button>
    </div>
  );
}

export default FormBtn;
