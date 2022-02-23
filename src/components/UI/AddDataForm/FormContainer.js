import styles from "./FormContainer.module.css";
function FormContainer(props) {
  return (
    <div
      className={
        props.className
          ? `${styles.container} ${props.className}`
          : `${styles.container}`
      }
    >
      {props.children}
    </div>
  );
}

export default FormContainer;
