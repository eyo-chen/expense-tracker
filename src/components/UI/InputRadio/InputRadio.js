import style from "./InputRadio.module.css";

function InputRadio(props) {
  const classNameContainer = props.classContainer
    ? `${props.classContainer} ${style["radio__container"]}`
    : `${style["radio__container"]}`;

  const classNameCheck = props.classCheck
    ? `${props.classCheck} transition--25`
    : `transition--25`;

  const classNameInside = props.classInside
    ? `${props.classInside} ${style.inside} transition--25`
    : `${style.inside} transition--25`;

  const classNameInput = props.classInput
    ? `${props.classInput} ${style.input}`
    : `${style.input}`;

  return (
    <div className={classNameContainer}>
      <input
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        className={classNameInput}
        aria-label={props.ariaLabel}
      />
      <div className={classNameCheck}>
        <div className={classNameInside}></div>
      </div>

      <label className={props.classLabel} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export default InputRadio;
