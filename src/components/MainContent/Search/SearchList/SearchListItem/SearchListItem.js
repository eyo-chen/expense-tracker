import { Fragment } from "react";
// import { v4 as uuidv4 } from "uuid";

// import style from "./SearchListItem.module.css";
// import ExpenseItem from "../../../../UI/ExpenseItem/ExpenseItem";

// const EXPENSE_DATA = [
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "breakfast",
//     time: "18 June, 20",
//     description: "Burger",
//     money: "50",
//   },
//   {
//     category: "expense",
//     mainCate: "clothing",
//     subCate: "t-shirt",
//     time: "9 June, 20",
//     money: "100",
//   },
//   {
//     category: "expense",
//     mainCate: "housing",
//     subCate: "bill",
//     time: "9 June, 20",
//     money: "500",
//   },
//   {
//     category: "expense",
//     mainCate: "transportation",
//     subCate: "bus",
//     time: "18 June, 20",
//     description: "Burger",
//     money: "10",
//   },
//   {
//     category: "income",
//     mainCate: "salary",
//     subCate: "salary",
//     time: "9 June, 20",
//     money: "3000",
//   },
//   {
//     category: "expense",
//     mainCate: "housing",
//     subCate: "bill",
//     time: "9 June, 20",
//     money: "500",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "dinner",
//     time: "18 June, 20",
//     description: "Burger",
//     money: "110",
//   },
//   {
//     category: "income",
//     mainCate: "stock",
//     subCate: "stock",
//     time: "9 June, 20",
//     money: "100",
//   },
//   {
//     category: "expense",
//     mainCate: "education",
//     subCate: "book",
//     time: "9 June, 20",
//     money: "50",
//   },
//   {
//     category: "income",
//     mainCate: "salary",
//     subCate: "salary",
//     time: "9 June, 20",
//     money: "1000",
//   },
//   {
//     category: "expense",
//     mainCate: "entertainment",
//     subCate: "video games",
//     time: "18 June, 20",
//     description: "Burger",
//     money: "110",
//   },
//   {
//     category: "income",
//     mainCate: "bonus",
//     subCate: "bonus",
//     time: "9 June, 20",
//     money: "500",
//   },
//   {
//     category: "expense",
//     mainCate: "food",
//     subCate: "BreakFast",
//     time: "18 June, 20",
//     description: "Burger",
//     money: "110",
//   },
//   {
//     category: "income",
//     mainCate: "others",
//     subCate: "others",
//     time: "9 June, 20",
//     money: "100",
//   },
// ];

// function SearchListItem(props) {
//   const expenseItem = EXPENSE_DATA.map((expense, i) => {
//     return (
//       <Fragment key={uuidv4()}>
//         <ExpenseItem
//           category={expense.category}
//           mainCate={expense.mainCate}
//           subCate={expense.subCate}
//           time={expense.time}
//           description={expense.description}
//           money={expense.money}
//         />
//         {i === EXPENSE_DATA.length - 1 || (
//           <hr className={style["item__line"]}></hr>
//         )}
//       </Fragment>
//     );
//   });

//   return (
//     <div className={style.item}>
//       <ul className={style["item__container"]}>{expenseItem}</ul>
//     </div>
//   );
// }

// export default SearchListItem;
