function Button(props) {
  return (
    <button
      type={props.type}
      className={`btn ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      data-id={props.dataID}
    >
      {props.children}
    </button>
  );
}

export default Button;
