import style from "./Select.module.css";

function Select(props) {
  const className = props.className
    ? `${style.select} ${props.className} capitalize input`
    : `${style.select} capitalize input`;

  return (
    <select
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      className={className}
    >
      {props.children}
    </select>
  );
}

export default Select;
