import style from "./SubTitle.module.css";

function SubTitle(props) {
  return (
    <h2
      className={
        props.className
          ? `${props.className} ${style.subTitle}`
          : `${style.subTitle}`
      }
      title={props.title}
    >
      {props.children}
    </h2>
  );
}

export default SubTitle;
