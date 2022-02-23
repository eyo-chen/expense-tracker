import styles from "./Title.module.css";

function Title(props) {
  const className = props.className
    ? `${styles.title} ${props.className} uppercase`
    : `${styles.title} uppercase`;

  return <h1 className={className}>{props.children}</h1>;
}

export default Title;
