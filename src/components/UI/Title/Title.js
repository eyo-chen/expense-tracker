import style from "./Title.module.css";

function Title(props) {
  const className = props.className
    ? `${style.title} ${props.className} uppercase`
    : `${style.title} uppercase`;

  return <h1 className={className}>{props.children}</h1>;
}

export default Title;
