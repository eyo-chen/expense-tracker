import styles from "./InputRadio.module.css";

function InputRadio(props) {
  const classNameContainer = props.classContainer
    ? `${props.classContainer} ${styles["radio__container"]}`
    : `${styles["radio__container"]}`;

  const classNameCheck = props.classCheck
    ? `${props.classCheck} transition--25`
    : `transition--25`;

  const classNameInside = props.classInside
    ? `${props.classInside} ${styles.inside} transition--25`
    : `${styles.inside} transition--25`;

  const classNameInput = props.classInput
    ? `${props.classInput} ${styles.input}`
    : `${styles.input}`;

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
        disabled={props.disabled}
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
