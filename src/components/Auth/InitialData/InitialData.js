import { useState, useEffect } from "react";
import fetcher from "../../../Others/Fetcher/fetcher";
import Common from "./common/common";

function InitialData(props) {
  const [type, setType] = useState("expense");
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
    if (type === "expense") {
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

  return <>
    <Common
      mainCategoryList={initData.expense}
      categoryChangeHandler={categoryChangeHandler}
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