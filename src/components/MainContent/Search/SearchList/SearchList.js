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
  const nextKey = useRef(0);
  const observer = useRef()

  // fetch the initial data
  useEffect(() => {
    setInitLoading(true);

    fetchTransactionList(nextKey, 10).then((data) => {
      setTransactionList(data.transactions);
      nextKey.current = data.cursor.next_key;
    }).catch((error) => {
      console.error("Error fetching data:", error);
    }).finally(() => {
      setInitLoading(false);
    });
  }, []);

  const lastTransactionRef = useCallback(node => {
    if (initLoading || scrollLoading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || !hasMore || scrollLoading || initLoading) return;

      setScrollLoading(true);
      fetchTransactionList(nextKey, 10).then((data) => {
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
  }, [hasMore, scrollLoading, initLoading])

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
      />
      {mainContent}
    </div>
  );
}

export default SearchList;

async function fetchTransactionList(nextKey, size) {
  try {
    const res = await fetcher(
      `v1/transaction?next_key=${nextKey.current}&size=${size}`,
    );

    return res;
  } catch (error) {
    throw error;
  }
}