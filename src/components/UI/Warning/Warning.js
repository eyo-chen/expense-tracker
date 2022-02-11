import { AiFillWarning } from "react-icons/ai";
import style from "./Warning.module.css";

function Warning(props) {
  const classNameWarning = props.index
    ? `${style.warning} ${props.className} ${style["warning--show"]} capitalize transition--25`
    : `${style.warning} ${props.className} capitalize transition--25`;

  return (
    <strong className={classNameWarning}>
      {<AiFillWarning aria-label="warning" />} {props.children}
    </strong>
  );
}

export default Warning;
