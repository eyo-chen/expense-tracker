import styles from "./SubTitle.module.css";

function SubTitle(props) {
  const className = props.className
    ? `${props.className} ${styles.subTitle} capitalize`
    : `${styles.subTitle} capitalize`;

  return (
    <h2 className={className} title={props.title}>
      {props.children}
    </h2>
  );
}

export default SubTitle;
