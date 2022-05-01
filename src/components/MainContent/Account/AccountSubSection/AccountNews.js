import { useEffect, useState } from "react";
import Card from "../../../UI/Card/Card";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import NewsErrorContent from "../../../UI/NewsErrorContent/NewsErrorContent";
import Loading from "../../../UI/Loading/Loading";
import { BiRefresh } from "react-icons/bi";
import { createApi } from "unsplash-js";
import styles from "./AccountNews.module.css";

const api = createApi({
  accessKey: `${process.env.REACT_APP_IMG}`,
});
let index = 0;

function AccountNews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newsArr, setNewsArr] = useState([]);
  const [news, setNews] = useState({});
  const [fetchAgain, setFetchAgain] = useState(1);
  const [newsIndex, setNewsIndex] = useState(0);
  const [imgIsLoading, setImgIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);

      try {
        const data = await fetch(
          `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS}&category=business&language=en`
        );

        if (!data.ok) {
          throw new Error();
        }

        const { results: res } = await data.json();

        if (!res) {
          throw new Error();
        }

        setNewsArr([...newsArr, ...res]);

        const newsObj = res[0];

        let img = newsObj["image_url"];

        if (!img) {
          img = await FetchImage(newsObj.title, setError);
        }

        setNews(getNewsObj(newsObj, img));
      } catch (err) {
        setError(true);
      }

      setIsLoading(false);
    }

    fetchNews();
  }, [fetchAgain]);

  useEffect(() => {
    const imgDom = document.getElementsByTagName("img");

    if (!imgDom[0]) {
      return;
    }

    setImgIsLoading(true);

    function loadEventHandler() {
      setImgIsLoading(false);
    }

    imgDom[0].addEventListener("load", loadEventHandler);

    return () => imgDom[0]?.removeEventListener("load", loadEventHandler);
  }, [news]);

  useEffect(() => {
    const imgDom = document.getElementsByTagName("img");

    if (!imgDom[0]) {
      return;
    }

    setImgIsLoading(true);

    function errorEventHandler() {
      setImgIsLoading(false);
    }

    imgDom[0].addEventListener("error", errorEventHandler);

    return () => imgDom[0]?.removeEventListener("error", errorEventHandler);
  }, [news]);

  async function refreshClickHandler() {
    setIsLoading(true);
    // setNewsIndex((prev) => prev + 1);
    index++;
    if (index === 10) {
      index = 0;
    }

    // if (newsIndex >= fetchAgain * 10) {
    //   if (fetchAgain === 20) {
    //     setNewsIndex(0);
    //   } else {
    //     setFetchAgain((prev) => prev + 1);
    //     return;
    //   }
    // }

    const newsObj = newsArr[index];

    let img = newsObj["image_url"];

    if (!img) {
      img = await FetchImage(newsObj.title, setError);
    }

    setNews(getNewsObj(newsObj, img));

    setIsLoading(false);
  }

  const content = isLoading ? (
    <Loading className={styles.loading} />
  ) : error ? (
    <NewsErrorContent />
  ) : (
    <>
      <div className={styles["title__section"]}>
        <SubTitle className={styles.title}>latest news</SubTitle>
        {imgIsLoading || (
          <BtnIcon
            classText={styles["btn__text"]}
            text="next"
            onClick={refreshClickHandler}
          >
            <BiRefresh className={styles.refresh} />
          </BtnIcon>
        )}
      </div>
      <p title={news.title} className={styles.subTitle}>
        {news.editedTitle}
      </p>
      <div className={styles["img__container"]}>
        {news.img ? (
          <a
            href={news.url}
            target="_blank"
            aria-label="click to go to news page"
          >
            {imgIsLoading ? (
              <Loading
                className={`${styles["loading--img"]} ${styles["loading"]}`}
              />
            ) : (
              <img
                className={styles.img}
                src={news.img}
                alt="latest business news"
                title={news.description}
              />
            )}
          </a>
        ) : (
          <p className={`center--position ${styles.noimg}`}>
            news image is not provided
          </p>
        )}

        <span className={styles.source}>{`source: ${news.source}`}</span>
      </div>
    </>
  );

  return <Card className={styles.card}>{content}</Card>;
}

export default AccountNews;

function getNewsObj(newsObj, img) {
  return {
    title: newsObj.title,
    editedTitle:
      newsObj.title?.length >= 70 && window.innerWidth > 1200
        ? newsObj.title.slice(0, 60) + "....."
        : newsObj.title,
    img,
    url: newsObj.link,
    description: newsObj.description,
    source: newsObj["source_id"],
  };
}

async function FetchImage(title, errHandler) {
  try {
    const result = await api.search.getPhotos({ query: title });

    return getImgUrl(result.response);
  } catch (err) {
    errHandler(true);
  }
}

function getImgUrl(res) {
  const { results } = res;

  for (const result of results) {
    if (!result.urls || !result.urls.small) {
      continue;
    }

    return result.urls.small;
  }

  return false;
}
/*
  const [newsArr, setNewsArr] = useState([]);
  // const [newsIndex, setNewsIndex] = useState(0);
  const [fetchCount, setFetchCount] = useState(1);
  // const [error, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [news, setNews] = useState({
  //   title: "",
  //   img: "",
  //   url: "",
  //   description: "",
  //   source: "",
  // });
  const [imgIsLoading, setImgIsLoading] = useState(false);
  const [noImage, setNoImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const [
    news,
    setFetchAgain,
    setNews,
    newsIndex,
    setNewsIndex,
    isLoading,
    error,
  ] = useFetch();

  // async function getNews() {
  //   setIsLoading(true);

  //   try {
  //     const data = await fetch(
  //       "https://newsdata.io/api/1/news?apikey=pub_6974086be744d7e8ee2efb3d84cd2a39379a&category=business&language=en"
  //     );

  //     if (!data.ok) {
  //       throw new Error();
  //     }

  //     const { results: res } = await data.json();

  //     if (!res) {
  //       throw new Error();
  //     }

  //     setNewsArr([...newsArr, ...res]);

  //     const newsObj = res[0];

  //     let img = newsObj["image_url"];

  //     if (!img) {
  //       img = await FetchImage(newsObj.title, setError);
  //     }

  //     console.log(img);

  //     setNews({
  //       title: newsObj.title,
  //       editedTitle:
  //         newsObj.title?.length >= 70 && window.innerWidth > 1200
  //           ? newsObj.title.slice(0, 60) + "....."
  //           : newsObj.title,
  //       img,
  //       url: newsObj.link,
  //       description: newsObj.description,
  //       source: newsObj.source,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     setIsLoading(false);
  //     setError(true);
  //   }

  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   useFetch();
  // }, []);

  // useEffect(() => {
  //   const imgDom = document.getElementsByTagName("img");

  //   if (!imgDom[0]) {
  //     return;
  //   }

  //   setImgIsLoading(true);

  //   function test() {
  //     setImgIsLoading(false);
  //   }

  //   imgDom[0].addEventListener("load", test);

  //   if (!imgDom[0]) {
  //     return;
  //   }

  //   return () => imgDom[0]?.removeEventListener("load", test);
  // }, [news]);

  async function refreshClickHandler() {
    // setIsLoading(true);

    setNewsIndex((prev) => prev + 1);

    if (newsIndex >= fetchCount * 10) {
      if (fetchCount < 50) {
        setFetchAgain((prev) => prev + 1);
      }
    }

    // const newsObj = newsArr[newsIndex];

    // console.log(newsObj);
    // let imgUrl = newsObj["image_url"];

    // if (!imgUrl) {
    //   imgUrl = await FetchImage(newsObj.title, setError, setImgUrl);
    // }

    // setNews({
    //   title: newsObj.title,
    //   editedTitle:
    //     newsObj.title?.length >= 70 && window.innerWidth > 1200
    //       ? newsObj.title.slice(0, 60) + "....."
    //       : newsObj.title,
    //   img: imgUrl,
    //   url: newsObj.link,
    //   description: newsObj.description,
    //   source: newsObj.source,
    // });

    // setIsLoading(false);
  }
*/
