import { useEffect, useState, useRef, useCallback } from "react";
import SearchListInput from "./SearchListInput/SearchListInput";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import styles from "./SearchList.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";

function SearchList(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const nextKey = useRef("");
  const observer = useRef()
  let mainContent = <p className={styles.empty}>No Data</p>;

  useEffect(() => {
    fetchTransactionList(nextKey, 10).then((data) => {
      setTransactionList(data.transactions);
      nextKey.current = data.cursor.next_key;
      
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  const lastTransactionRef = useCallback(node => {
    // if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      console.log("hasMore", hasMore);
      if (!entries[0].isIntersecting || !hasMore) return;

      fetchTransactionList(nextKey, 10).then((data) => {
        setTransactionList(prevTransactionList => {
          return [...prevTransactionList, ...data.transactions]
        });
        nextKey.current = data.cursor.next_key;
        setHasMore(data.transactions.length === 10)
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });

    })
    if (node) observer.current.observe(node)
  }, [hasMore])

  if (transactionList.length !== 0)
    mainContent = (
      <ExpenseList
        classItemSearch={styles["item--inner"]}
        dataList={transactionList}
        classItem={styles.item}
        lastTransactionRef={lastTransactionRef}
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
    let endpoint = `v1/transaction?size=${size}`;
    if (nextKey.current) {
      endpoint = `v1/transaction?next_key=${nextKey.current}&size=${size}`;
    }

    const res = await fetcher(endpoint);

    return res;
  } catch (error) {
    throw error;
  }
}