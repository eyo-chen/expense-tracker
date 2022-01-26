import style from "./SubTitle.module.css";

function SubTitle(props) {
  const className = props.className
    ? `${props.className} ${style.subTitle} capitalize`
    : `${style.subTitle} capitalize`;

  return (
    <h2 className={className} title={props.title}>
      {props.children}
    </h2>
  );
}

export default SubTitle;
