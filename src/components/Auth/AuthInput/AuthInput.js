import InputText from "../../UI/InputText/InputText";
import Warning from "../../UI/Warning/Warning";
import styles from "./Authinput.module.css";

function AuthInput(props) {
  const classLabel = props.classLabel
    ? `${props.classLabel} ${styles.label}`
    : `${styles.label}`;

  const classInput = props.classInput
    ? `${props.classInput} ${styles.input}`
    : `${styles.input}`;

  return (
    <div className={styles.container}>
      <InputText
        name={props.name}
        id={props.id}
        label={props.label}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        classInput={classInput}
        classLabel={classLabel}
      />
      <Warning index={props.isInValid} className={styles.warning}>
        {props.warningText}
      </Warning>
    </div>
  );
}

export default AuthInput;