import { useState, useEffect } from "react";
import fetcher from "../../../Others/Fetcher/fetcher";
import Common from "./common/common";

function InitialData() {
  const [type, setType] = useState("EXPENSE");
  const [initData, setInitData] = useState({
    expense: [],
    income: [],
  });

  useEffect(() => {
    fetchInitData()
    .then((data) => {
      setInitData(data)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  function categoryChangeHandler(data) {
    if (type === "EXPENSE") {
      setInitData((prevData) => {
        return {
          ...prevData,
          expense: data,
        };
      });
      return;
    }

    setInitData((prevData) => {
      return {
        ...prevData,
        income: data,
      };
    });
  }

  function nextBtnClickHandler() {
    if (type === "EXPENSE") {
      setType("INCOME");
      return;
    }

    // save data to db
  }

  function prevBtnClickHandler() {
    if (type === "INCOME") {
      setType("EXPENSE");
      return;
    }
  }

  const TYPE_TO_INFO = {
    EXPENSE: {
      subTitle: "please customize your main category of expense",
      mainCategoryList: initData.expense,
    },
    INCOME: {
      subTitle: "please customize your main category of income",
      mainCategoryList: initData.income,
    },
  };

  return <>
    <Common
      type={type}
      subTitle={TYPE_TO_INFO[type]?.subTitle}
      mainCategoryList={TYPE_TO_INFO[type]?.mainCategoryList}
      categoryChangeHandler={categoryChangeHandler}
      nextBtnClickHandler={nextBtnClickHandler}
      prevBtnClickHandler={prevBtnClickHandler}
    />
  </>

}

export default InitialData;

async function fetchInitData() {
  try {
    const resp = await fetcher("v1/init-data", "GET");
    return resp.init_data;
  } catch (error) {
    throw error;
  }
}