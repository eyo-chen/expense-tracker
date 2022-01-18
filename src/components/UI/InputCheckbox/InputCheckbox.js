import style from "./InputCheckbox.module.css";

function InputCheckbox(props) {
  return (
    <div
      className={
        props.classContainer
          ? `${props.classContainer} ${style["input__container"]}`
          : style["input__container"]
      }
    >
      <input
        className={
          props.classInput ? `${props.classInput} ${style.input}` : style.input
        }
        defaultChecked={props.defaultChecked}
        type="checkbox"
        id={props.id}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        data-id={props.dataID}
      />
      <span className={props.classCheck}>{props.icon || ""}</span>
      <label className={props.classLabel} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export default InputCheckbox;
