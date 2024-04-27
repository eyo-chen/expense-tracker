import { useEffect, useState, useRef, useCallback } from "react";
import SearchListInput from "./SearchListInput/SearchListInput";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import styles from "./SearchList.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";
import Loading from "../../../UI/Loading/Loading";

function SearchList(props) {
  const [initLoading, setInitLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [sortState, setSortState] = useState({
    sortBy: "",
    sortDir: "",
  });
  const nextKey = useRef("");
  const observer = useRef()

  // fetch the initial data
  useEffect(() => {
    setInitLoading(true);
    nextKey.current = "";
    
    fetchTransactionList(nextKey, 10, props.searchOption, keyword, sortState).then((data) => {
      setTransactionList(data.transactions);
      nextKey.current = data.cursor.next_key;
    }).catch((error) => {
      console.error("Error fetching data:", error);
    }).finally(() => {
      setHasMore(true);
      setInitLoading(false);
    });
  }, [props.searchOption, keyword, sortState]);

  const lastTransactionRef = useCallback(node => {
    if (initLoading || scrollLoading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      // transactionList.length < 10 is a workaround to prevent the observer from firing when the initial data is less than 10
      if (!entries[0].isIntersecting || !hasMore || scrollLoading || initLoading || transactionList.length < 10) return

      setScrollLoading(true);
      fetchTransactionList(nextKey, 10, props.searchOption, keyword, sortState).then((data) => {
        setTransactionList(prevTransactionList => {
          return [...prevTransactionList, ...data.transactions]
        });
        nextKey.current = data.cursor.next_key;
        setHasMore(data.transactions.length === 10)
      }).catch((error) => {
        console.error("Error fetching data:", error);
      }).finally(() => {
        setScrollLoading(false);
      });
    })
    if (node) observer.current.observe(node)
  }, [hasMore, scrollLoading, initLoading, props.searchOption, keyword, transactionList.length, sortState])

  let mainContent = <p className={styles.empty}>No Data</p>;
  if (initLoading) mainContent = <Loading className={styles["loading"]} />;
  else if (transactionList.length !== 0)
    mainContent = (
      <ExpenseList
        classItemSearch={styles["item--inner"]}
        dataList={transactionList}
        classItem={styles.item}
        lastTransactionRef={lastTransactionRef}
        loading={scrollLoading}
      />
    );

  return (
    <div className={styles.search}>
      <SearchListInput
        searchOptionModalToggler={props.searchOptionModalToggler}
        setKeyword={setKeyword}
        sortState={sortState}
        setSortState={setSortState}
      />
      {mainContent}
    </div>
  );
}

export default SearchList;

async function fetchTransactionList(nextKey, size, searchOption, keyword, sortState) {
  try {
    let endpoint = `v1/transaction?size=${size}`;
    if (nextKey.current) {
      endpoint += `&next_key=${nextKey.current}`;
    }

    if (searchOption.time?.startDate && searchOption.time?.endDate) {
      endpoint += `&start_date=${searchOption.time.startDate}&end_date=${searchOption.time.endDate}`;
    }

    if (searchOption.price?.minPrice && searchOption.price?.maxPrice) {
      if (searchOption.price.maxPrice === "Infinity") {
        endpoint += `&min_price=${searchOption.price.minPrice}`;
      } else {
        endpoint += `&min_price=${searchOption.price.minPrice}&max_price=${searchOption.price.maxPrice}`;
      }
    }

    if (searchOption.categoryList?.length) {
      endpoint += `&main_category_ids=${searchOption.categoryList}`;
    }

    if (keyword) {
      endpoint += `&keyword=${keyword}`;
    }

    if (sortState.sortBy) {
      endpoint += `&sort_by=${sortState.sortBy}&sort_direction=${sortState.sortDir}`;
    }

    const res = await fetcher(endpoint);

    return res;
  } catch (error) {
    throw error;
  }
}