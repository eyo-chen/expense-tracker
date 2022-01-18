import style from "./FormContainer.module.css";
function FormContainer(props) {
  return (
    <div className={`${style.container} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default FormContainer;
