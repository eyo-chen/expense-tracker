import style from "./InputRadio.module.css";

function InputRadio(props) {
  return (
    <div
      className={
        props.classContainer
          ? `${props.classContainer} ${style["radio__container"]}`
          : `${style["radio__container"]}`
      }
    >
      <input
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        className={
          props.classInput
            ? `${props.classInput} ${style.input}`
            : `${style.input}`
        }
      />
      <div
        className={
          props.classCheck
            ? `${props.classCheck} ${style.check}`
            : `${style.check}`
        }
      >
        <div
          className={
            props.classInside
              ? `${props.classInside} ${style.inside}`
              : `${style.inside}`
          }
        ></div>
      </div>

      <label className={props.classLabel} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export default InputRadio;
