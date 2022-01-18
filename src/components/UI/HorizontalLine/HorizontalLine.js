import style from "./HorizontalLine.module.css";

function HorizontalLine(props) {
  return (
    <hr
      className={
        props.className ? `${style.line} ${props.className}` : `${style.line}`
      }
    ></hr>
  );
}

export default HorizontalLine;
