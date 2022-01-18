import { AiFillWarning } from "react-icons/ai";
import style from "./Warning.module.css";

function Warning(props) {
  return (
    <p
      className={
        props.index
          ? `${style.warning} ${props.className} ${style["warning--show"]}`
          : `${style.warning} ${props.className}`
      }
    >
      {<AiFillWarning />} {props.children}
    </p>
  );
}

export default Warning;
