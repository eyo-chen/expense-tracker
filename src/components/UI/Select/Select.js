function Select(props) {
  return (
    <select
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      className={`${props.className} capitalize input`}
      value={props.value}
    >
      {props.children}
    </select>
  );
}

export default Select;
