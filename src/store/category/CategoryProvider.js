import { useState, useEffect } from "react";
import CategoryContext from "./category--context";
import createUserID from "../../Others/CreateUserID/createUserID";
import useErrorModal from "../../Others/Custom/useErrorModal";
import { db } from "../../firebase-config";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";

function CategoryProvider(props) {
  const [categoryProviderVal, setCategoryProviderVal] = useState({
    categoryExpense: {},
    categoryIncome: {},
    mainCategoryExpense: [],
    mainCategoryIncome: [],
    iconArr: {},
    iconObj: {},
  });
  const {
    categoryExpense,
    categoryIncome,
    iconArr,
    iconObj,
    mainCategoryExpense,
    mainCategoryIncome,
  } = categoryProviderVal;

  const [, setErrorModal] = useErrorModal();
  const [user, userID] = createUserID();
  const userDocRef = doc(db, "users", userID);

  useEffect(() => {
    if (!user) return;
    onSnapshot(userDocRef, (snapshot) => {
      if (!snapshot["_document"]) return;

      const {
        categoryExpense,
        categoryIncome,
        iconArr,
        iconObj,
        mainCategoryExpense,
        mainCategoryIncome,
      } = snapshot.data();

      setCategoryProviderVal({
        categoryExpense,
        categoryIncome,
        iconArr,
        iconObj,
        mainCategoryExpense,
        mainCategoryIncome,
      });
    });
  }, [user]);

  async function deleteMainCategory(value, type) {
    const icon = iconObj[value];
    const newIconArr = [...iconArr, icon];
    const newIconObj = { ...iconObj };
    const newMainCategoryArr = (
      type === "expense" ? mainCategoryExpense : mainCategoryIncome
    ).filter((category) => category !== value);
    const newMainCategory = {
      ...(type === "expense" ? categoryExpense : categoryIncome),
    };
    delete newMainCategory[value];
    delete newIconObj[value];

    if (type === "expense")
      await updateDoc(userDocRef, {
        categoryExpense: newMainCategory,
        iconArr: newIconArr,
        iconObj: newIconObj,
        mainCategoryExpense: newMainCategoryArr,
      }).catch((err) => setErrorModal(true));
    else
      await updateDoc(userDocRef, {
        categoryIncome: newMainCategory,
        iconArr: newIconArr,
        iconObj: newIconObj,
        mainCategoryIncome: newMainCategoryArr,
      }).catch((err) => setErrorModal(true));
  }

  async function deleteSubCategory(value, type, mainCategory) {
    const newMainCategory = {
      ...(type === "expense" ? categoryExpense : categoryIncome),
    };
    newMainCategory[mainCategory] = newMainCategory[mainCategory].filter(
      (category) => category !== value
    );

    if (type === "expense")
      await updateDoc(userDocRef, {
        categoryExpense: newMainCategory,
      }).catch((err) => setErrorModal(true));
    else if (type === "income")
      await updateDoc(userDocRef, {
        categoryIncome: newMainCategory,
      }).catch((err) => setErrorModal(true));
  }

  async function addMainCategory(value, iconIndex, type) {
    const icon = iconArr[iconIndex];
    const newIconArr = iconArr.filter(
      (icon, index) => index !== Number(iconIndex)
    );
    const newIconObj = { ...iconObj };
    newIconObj[value] = icon;

    const newMainCategoryArr = [
      ...(type === "expense" ? mainCategoryExpense : mainCategoryIncome),
      value,
    ];

    const newMainCategory = {
      ...(type === "expense" ? categoryExpense : categoryIncome),
    };
    newMainCategory[value] = [];

    if (type === "expense")
      await updateDoc(userDocRef, {
        categoryExpense: newMainCategory,
        iconArr: newIconArr,
        iconObj: newIconObj,
        mainCategoryExpense: newMainCategoryArr,
      }).catch((err) => setErrorModal(true));
    else
      await updateDoc(userDocRef, {
        categoryIncome: newMainCategory,
        iconArr: newIconArr,
        iconObj: newIconObj,
        mainCategoryIncome: newMainCategoryArr,
      }).catch((err) => setErrorModal(true));
  }

  async function addSubCategory(value, type, mainCategory) {
    const newMainCategory = {
      ...(type === "expense" ? categoryExpense : categoryIncome),
    };
    newMainCategory[mainCategory] = [...newMainCategory[mainCategory], value];

    if (type === "expense")
      await updateDoc(userDocRef, {
        categoryExpense: newMainCategory,
      }).catch((err) => setErrorModal(true));
    else if (type === "income")
      await updateDoc(userDocRef, {
        categoryIncome: newMainCategory,
      }).catch((err) => setErrorModal(true));
  }

  const contextInitialObj = {
    categoryExpense,
    categoryIncome,
    iconObj,
    iconArr,
    mainCategoryExpense,
    mainCategoryIncome,
    deleteMainCategory,
    deleteSubCategory,
    addMainCategory,
    addSubCategory,
  };

  return (
    <CategoryContext.Provider value={contextInitialObj}>
      {props.children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;

/*
  // const [categoryExpense, setCategoryExpense] = useState({});
  // const [categoryIncome, setCategoryIncome] = useState({});
  // const [iconArr, setIconArr] = useState([]);
  // const [iconObj, setIconObj] = useState({});

      // setCategoryExpense(categoryExpense);
      // setCategoryIncome(categoryIncome);
      // setIconArr(iconArr);
      // setIconObj(iconObj);
*/
/*
import { IoFastFoodSharp } from "react-icons/io5";
import { IoIosShirt } from "react-icons/io";
import { GiFamilyHouse } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { ImBook } from "react-icons/im";
import { IoLogoGameControllerB } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiHandCoinFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { FiAlignCenter } from "react-icons/fi";
import {
  BsFillHeartFill,
  BsExclamationOctagonFill,
  BsTrophy,
  BsFillAwardFill,
  BsFillBriefcaseFill,
  BsFillEnvelopeOpenFill,
} from "react-icons/bs";

import {
  FaAlipay,
  FaCcAmazonPay,
  FaCcApplePay,
  FaGooglePlusSquare,
  FaLine,
  FaSpotify,
  FaAddressCard,
  FaCameraRetro,
  FaCat,
  FaChild,
  FaCut,
  FaFlushed,
  FaGlasses,
  FaHandsHelping,
  FaGuitar,
  FaKey,
  FaMapMarkedAlt,
  FaPhone,
  FaUserGraduate,
  FaUserSlash,
} from "react-icons/fa";

import {
  RiVidicon2Fill,
  RiPlaneLine,
  RiPingPongFill,
  RiMentalHealthFill,
  RiCake2Fill,
  RiCakeFill,
  RiBilliardsFill,
  RiUmbrellaFill,
  RiHandHeartFill,
} from "react-icons/ri";

import { MdAudiotrack } from "react-icons/md";
import { IoAmericanFootball } from "react-icons/io5";

import ReactDOMServer from "react-dom/server";

function encodeSvg(reactElement) {
  return (
    "data:image/svg+xml," +
    escape(ReactDOMServer.renderToStaticMarkup(reactElement))
  );
}

const iconObj = {
  food: <IoFastFoodSharp className={styles.icon} />,
  clothing: <IoIosShirt className={styles.icon} />,
  housing: <GiFamilyHouse className={styles.icon} />,
  transportation: <AiFillCar className={styles.icon} />,
  education: <ImBook className={styles.icon} />,
  entertainment: <IoLogoGameControllerB className={styles.icon} />,
  salary: <RiMoneyDollarCircleFill className={styles.icon} />,
  investment: <BsTrophy className={styles.icon} />,
  bonus: <RiHandCoinFill className={styles.icon} />,
  stock: <AiOutlineStock className={styles.icon} />,
  others: <FiAlignCenter className={styles.icon} />,
};

const iconArr = [
  <BsFillHeartFill className={styles.icon} />,
  <BsExclamationOctagonFill className={styles.icon} />,
  <BsTrophy className={styles.icon} />,
  <BsFillAwardFill className={styles.icon} />,
  <BsFillBriefcaseFill className={styles.icon} />,
  <BsFillEnvelopeOpenFill className={styles.icon} />,
  <FaAlipay className={styles.icon} />,
  <FaCcAmazonPay className={styles.icon} />,
  <FaCcApplePay className={styles.icon} />,
  <FaGooglePlusSquare className={styles.icon} />,
  <FaLine className={styles.icon} />,
  <FaSpotify className={styles.icon} />,
  <FaAddressCard className={styles.icon} />,
  <FaCameraRetro className={styles.icon} />,
  <FaCat className={styles.icon} />,
  <FaChild className={styles.icon} />,
  <FaCut className={styles.icon} />,
  <FaFlushed className={styles.icon} />,
  <FaGlasses className={styles.icon} />,
  <FaHandsHelping className={styles.icon} />,
  <FaGuitar className={styles.icon} />,
  <FaKey className={styles.icon} />,
  <FaMapMarkedAlt className={styles.icon} />,
  <FaPhone className={styles.icon} />,
  <FaUserGraduate className={styles.icon} />,
  <RiVidicon2Fill className={styles.icon} />,
  <RiPlaneLine className={styles.icon} />,
  <RiPingPongFill className={styles.icon} />,
  <RiMentalHealthFill className={styles.icon} />,
  <RiCake2Fill className={styles.icon} />,
  <RiCakeFill className={styles.icon} />,
  <RiBilliardsFill className={styles.icon} />,
  <RiUmbrellaFill className={styles.icon} />,
  <RiHandHeartFill className={styles.icon} />,
  <MdAudiotrack className={styles.icon} />,
  <IoAmericanFootball className={styles.icon} />,
];

const EXPENSE_CATEGORY = {
  food: ["breakfast", "brunch", "lunch", "dinner", "snack", "drink"],
  clothing: ["clothes", "pants", "shoes", "accessories", "underwear"],
  housing: [
    "rent",
    "water  bill",
    "electricity bill",
    "gas bill",
    "cable bill",
    "internet bill",
  ],
  transportation: ["gasoline", "parking", "maintenance"],
  education: ["books", "course"],
  entertainment: ["video games", "computer games", "party"],
  others: ["others"],
};

const INCOME_CATEGORY = {
  salary: ["salary", "bonus"],
  investment: ["stock"],
  bonus: ["bonus"],
  others: ["others"],
};

function reducer(state, action) {
  switch (action.type) {
    case "REMOVE_MAIN_CATEGORY": {
      if (action.category === "expense") {
        const categoryExpense = { ...state.categoryExpense };

        delete categoryExpense[action.value];

        return { ...state, categoryExpense };
      } else {
        const categoryIncome = { ...state.categoryIncome };

        delete categoryIncome[action.value];

        return { ...state, categoryIncome };
      }
    }

    case "REMOVE_SUB_CATEGORY": {
      if (action.category === "expense") {
        const categoryExpense = { ...state.categoryExpense };

        categoryExpense[action.mainCategory] = categoryExpense[
          action.mainCategory
        ].filter((element) => element !== action.value);

        return { ...state, categoryExpense };
      } else {
        const categoryIncome = { ...state.categoryIncome };

        categoryIncome[action.mainCategory] = categoryIncome[
          action.mainCategory
        ].filter((element) => element !== action.value);

        return { ...state, categoryIncome };
      }
    }

    case "ADD_MAIN_CATEGORY": {
      
      No matter it's expense or income, iconObj and iconArr are always the same
      The only difference is category object data
      
      const iconObj = { ...state.iconObj };
      iconObj[action.value] = state.iconArr[action.iconIndex];
      const iconArr = state.iconArr.filter(
        (element, index) => index + "" !== action.iconIndex
      );

      // expense data
      if (action.category === "expense") {
        const categoryExpense = { ...state.categoryExpense };
        categoryExpense[action.value] = [];

        return { ...state, categoryExpense, iconObj, iconArr };
      }
      // income data
      else {
        const categoryIncome = { ...state.categoryIncome };
        categoryIncome[action.value] = [];

        return { ...state, categoryIncome, iconObj, iconArr };
      }
    }

    case "ADD_SUB_CATEGORY": {
      if (action.category === "expense") {
        const categoryExpense = { ...state.categoryExpense };

        categoryExpense[action.mainCategory] = categoryExpense[
          action.mainCategory
        ].concat(action.value);

        return { ...state, categoryExpense };
      } else {
        const categoryIncome = { ...state.categoryIncome };

        categoryIncome[action.mainCategory] = categoryIncome[
          action.mainCategory
        ].concat(action.value);

        return { ...state, categoryIncome };
      }
    }

    default:
      break;
  }
}

  // const [categoryState, categoryDispatch] = useReducer(reducer, {
  //   categoryExpense: EXPENSE_CATEGORY,
  //   categoryIncome: INCOME_CATEGORY,
  //   iconObj,
  //   iconArr,
  // });
*/
// function encodeSvg(reactElement) {
//   return (
//     "data:image/svg+xml," +
//     escape(ReactDOMServer.renderToStaticMarkup(reactElement))
//   );
// }
// console.log(encodeSvg(<BiFile />));
