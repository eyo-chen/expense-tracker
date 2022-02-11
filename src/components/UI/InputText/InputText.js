function InputText(props) {
  const classNameLabel = props.classLabel
    ? `${props.classLabel} capitalize`
    : `capitalize`;

  const classNameInput = props.classInput
    ? `${props.classInput} input`
    : `input`;

  return (
    <>
      <label htmlFor={props.id} className={classNameLabel}>
        {props.label}
      </label>
      <input
        name={props.name}
        value={props.value}
        type={props.type ? props.type : "text"}
        id={props.id}
        onBlur={props.onBlur}
        onChange={props.onChange}
        className={classNameInput}
        data-id={props.dataID}
        aira-label="text"
      />
    </>
  );
}

export default InputText;
