import style from "./InputCheckbox.module.css";

function InputCheckbox(props) {
  const classContainer = props.classContainer
    ? `${props.classContainer} ${style["input__container"]}`
    : style["input__container"];

  const classInput = props.classInput
    ? `${props.classInput} ${style.input}`
    : style.input;

  return (
    <div className={classContainer}>
      <input
        className={classInput}
        defaultChecked={props.defaultChecked}
        type="checkbox"
        id={props.id}
        name={props.id}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        data-id={props.dataID}
      />
      <span className={`${props.classCheck} transition--25`}>
        {props.icon || ""}
      </span>
      <label className={props.classLabel} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export default InputCheckbox;
