import { useEffect, useState } from "react";
import Card from "../../../UI/Card/Card";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import NewsErrorContent from "../../../UI/NewsErrorContent/NewsErrorContent";
import Loading from "../../../UI/Loading/Loading";
import { BiRefresh } from "react-icons/bi";
import styles from "./AccountNews.module.css";

const newsArr = [];
let newsIndex = 0;

function AccountNews() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState({
    title: "",
    img: "",
    url: "",
    description: "",
    source: "",
  });

  useEffect(() => {
    async function getNews() {
      setIsLoading(true);

      try {
        const data = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5295e93382ff4fd1a92c1256f5843d3f"
        );

        if (data.status !== 200) {
          throw new Error();
        }
        const res = await data.json();

        if (!res) {
          throw new Error();
        }
        newsArr.push(...res.articles);

        setNews({
          title: newsArr[0].title,
          editedTitle:
            newsArr[0].title?.length >= 70 && window.innerWidth > 1200
              ? newsArr[0].title.slice(0, 60) + "....."
              : newsArr[0].title,

          img: newsArr[0].urlToImage,
          url: newsArr[0].url,
          description: newsArr[0].description,
          source: newsArr[0].source.name,
        });
      } catch (err) {
        setIsLoading(false);
        setError(true);
      }

      setIsLoading(false);
    }

    getNews();
  }, []);

  function refreshClickHandler() {
    newsIndex++;
    if (newsIndex === 20) newsIndex = 0;

    setNews({
      title: newsArr[newsIndex].title,
      editedTitle:
        newsArr[newsIndex].title.length >= 70 && window.innerWidth > 1200
          ? newsArr[newsIndex].title.slice(0, 60) + "....."
          : newsArr[newsIndex].title,
      img: newsArr[newsIndex].urlToImage,
      url: newsArr[newsIndex].url,
      description: newsArr[newsIndex].description,
      source: newsArr[newsIndex].source.name,
    });
  }

  const content = isLoading ? (
    <Loading className={styles.loading} />
  ) : error ? (
    <NewsErrorContent />
  ) : (
    <>
      <div className={styles["title__section"]}>
        <SubTitle className={styles.title}>latest news</SubTitle>
        <BtnIcon
          classText={styles["btn__text"]}
          text="next"
          onClick={refreshClickHandler}
        >
          <BiRefresh className={styles.refresh} />
        </BtnIcon>
      </div>
      <p title={news.title} className={styles.subTitle}>
        {news.editedTitle}
      </p>
      <div className={styles["img__container"]}>
        <a
          href={news.url}
          target="_blank"
          aria-label="click to go to news page"
        >
          <img
            className={styles.img}
            src={news.img}
            alt="latest business news"
            title={news.description}
          />
        </a>
        <span className={styles.source}>{`source: ${news.source}`}</span>
      </div>
    </>
  );

  return <Card className={styles.card}>{content}</Card>;
}

export default AccountNews;
