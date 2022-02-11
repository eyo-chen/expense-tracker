function Button(props) {
  return (
    <button
      type={props.type}
      className={`btn ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      data-id={props.dataID}
      aria-label={props.ariaLabel}
      tabIndex="0"
    >
      {props.children}
    </button>
  );
}

export default Button;
