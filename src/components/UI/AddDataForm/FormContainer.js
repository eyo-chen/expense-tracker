import style from "./FormContainer.module.css";
function FormContainer(props) {
  return (
    <div
      className={
        props.className
          ? `${style.container} ${props.className}`
          : `${style.container}`
      }
    >
      {props.children}
    </div>
  );
}

export default FormContainer;
