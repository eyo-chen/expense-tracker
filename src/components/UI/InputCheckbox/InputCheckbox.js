import styles from "./InputCheckbox.module.css";

function InputCheckbox(props) {
  const classContainer = props.classContainer
    ? `${props.classContainer} ${styles["input__container"]}`
    : styles["input__container"];

  const classInput = props.classInput
    ? `${props.classInput} ${styles.input}`
    : styles.input;

  const classLabel = props.classLabel
    ? `${props.classLabel} ${styles.label}`
    : `${styles.label}`;

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
        aria-label={props.ariaLabel}
      />
      <span className={`${props.classCheck} transition--25`}>
        {props.icon || ""}
      </span>
      <label className={classLabel} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export default InputCheckbox;
