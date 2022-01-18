import style from "./InputText.module.css";

function InputText(props) {
  return (
    <div
      className={
        props.classInputContainer
          ? `${style["input__container"]} ${props.classInputContainer}`
          : `${style["input__container"]}`
      }
    >
      <label
        htmlFor={props.id}
        className={
          props.classLabel
            ? `${style.label} ${props.classLabel}`
            : `${style.label}`
        }
      >
        {props.label}
      </label>
      <input
        value={props.value}
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        className={
          props.classInput
            ? `${style.input} ${props.classInput}`
            : `${style.input}`
        }
        data-id={props.dataID}
      />
    </div>
  );
}

export default InputText;
