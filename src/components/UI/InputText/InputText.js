import style from "./InputText.module.css";

function InputText(props) {
  const classNameContainer = props.classInputContainer
    ? `${style["input__container"]} ${props.classInputContainer}`
    : `${style["input__container"]}`;

  const classNameLabel = props.classLabel
    ? `${style.label} ${props.classLabel}`
    : `${style.label}`;

  const classNameInput = props.classInput
    ? `${style.input} ${props.classInput}`
    : `${style.input}`;

  return (
    <div className={classNameContainer}>
      <label htmlFor={props.id} className={classNameLabel}>
        {props.label}
      </label>
      <input
        value={props.value}
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        className={classNameInput}
        data-id={props.dataID}
      />
    </div>
  );
}

export default InputText;
