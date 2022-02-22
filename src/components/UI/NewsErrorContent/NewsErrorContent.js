import SubTitle from "../SubTitle/SubTitle";
import styles from "./NewsErrorContent.module.css";

function NewsErrorContent() {
  return (
    <div>
      <SubTitle className={styles.title}>unable to get content</SubTitle>
      <p className={styles.text}>
        An unknown error occurred. Try to reload the page first. Please contact
        me if this continues.
      </p>
    </div>
  );
}

export default NewsErrorContent;
