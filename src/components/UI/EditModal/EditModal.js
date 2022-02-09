import { Fragment } from "react";
import ReactDOM from "react-dom";
import style from "./EditModal.module.css";

function EditModal(props) {
  let className = `${style.modal} capitalize center--flex `;
  if (props.type === "expense") className += `${style["modal--blue"]}`;
  if (props.type === "income") className += `${style["modal--pink"]}`;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={className}>{props.value} successfully</div>,
        document.querySelector("#modal")
      )}
    </Fragment>
  );
}

export default EditModal;
