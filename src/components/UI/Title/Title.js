import style from "./Title.module.css";

function Title(props) {
  return (
    <h2
      className={
        props.className ? `${style.title} ${props.className}` : `${style.title}`
      }
    >
      {props.children}
    </h2>
  );
}

export default Title;
