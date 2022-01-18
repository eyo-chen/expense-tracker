import style from "./Select.module.css";

function Select(props) {
  return (
    <select
      onChange={props.onChange}
      className={`${style.select} ${
        props.className ? `${props.className}` : ""
      }`}
    >
      {props.children}
    </select>
  );
}

export default Select;
