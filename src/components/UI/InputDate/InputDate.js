function InputDate(props) {
  const classNameInput = props.classInput
    ? `${props.classInput} input`
    : `input`;

  return (
    <>
      <label htmlFor={props.id} className={props.classLabel}>
        {props.label}
      </label>
      <input
        value={props.value}
        className={classNameInput}
        onChange={props.onChange}
        type="date"
        id={props.id}
        name={props.name}
        max={props.max}
        min={props.min}
        required={true}
        placeholder="mm/dd/yyyy"
        disabled={props.disabled}
      ></input>
    </>
  );
}

export default InputDate;
