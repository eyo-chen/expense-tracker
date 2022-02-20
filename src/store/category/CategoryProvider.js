import { useReducer, useState, useEffect } from "react";
import CategoryContext from "./category--context";
import { db, auth } from "../../firebase-config";

import { onSnapshot, doc, updateDoc } from "firebase/firestore";

import style from "./CategoryProvider.module.css";
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
import createInitialData from "../../Others/CreateInitialData/createInitialData";

function CategoryProvider(props) {
  const user = auth.currentUser;
  let userID = "dcwecwe";
  if (user) {
    const { displayName, email } = user;
    userID = `${email}${displayName.split(" ").join("")}`;
  }
  const userDocRef = doc(db, "users", userID);

  const [categoryExpense, setCategoryExpense] = useState({});
  const [categoryIncome, setCategoryIncome] = useState({});
  const [iconArr, setIconArr] = useState([]);
  const [iconObj, setIconObj] = useState({});

  useEffect(() => {
    if (!user) return;
    onSnapshot(userDocRef, (snapshot) => {
      const { categoryExpense, categoryIncome, iconArr, iconObj } =
        snapshot.data();

      setCategoryExpense(categoryExpense);
      setCategoryIncome(categoryIncome);
      setIconArr(iconArr);
      setIconObj(iconObj);
    });
  }, [user]);

  // const [categoryState, categoryDispatch] = useReducer(reducer, {
  //   categoryExpense: EXPENSE_CATEGORY,
  //   categoryIncome: INCOME_CATEGORY,
  //   iconObj,
  //   iconArr,
  // });

  async function removeMainCategory(value, type) {
    const icon = iconObj[value];
    const newIconArr = [...iconArr, icon];
    const newIconObj = { ...iconObj };
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
      });
    else
      await updateDoc(userDocRef, {
        categoryIncome: newMainCategory,
        iconArr: newIconArr,
        iconObj: newIconObj,
      });
  }

  async function removeSubCategory(value, type, mainCategory) {
    const newMainCategory = {
      ...(type === "expense" ? categoryExpense : categoryIncome),
    };
    newMainCategory[mainCategory] = newMainCategory[mainCategory].filter(
      (category) => category !== value
    );

    if (type === "expense")
      await updateDoc(userDocRef, {
        categoryExpense: newMainCategory,
      });
    else if (type === "income")
      await updateDoc(userDocRef, {
        categoryIncome: newMainCategory,
      });
  }

  async function addMainCategory(value, iconIndex, type) {
    const icon = iconArr[iconIndex];
    const newIconArr = iconArr.filter(
      (icon, index) => index !== Number(iconIndex)
    );
    const newIconObj = { ...iconObj };
    newIconObj[value] = icon;

    const newMainCategory = {
      ...(type === "expense" ? categoryExpense : categoryIncome),
    };
    newMainCategory[value] = [];

    if (type === "expense")
      await updateDoc(userDocRef, {
        categoryExpense: newMainCategory,
        iconArr: newIconArr,
        iconObj: newIconObj,
      });
    else
      await updateDoc(userDocRef, {
        categoryIncome: newMainCategory,
        iconArr: newIconArr,
        iconObj: newIconObj,
      });
  }

  async function addSubCategory(value, type, mainCategory) {
    const newMainCategory = {
      ...(type === "expense" ? categoryExpense : categoryIncome),
    };
    newMainCategory[mainCategory] = [...newMainCategory[mainCategory], value];

    if (type === "expense")
      await updateDoc(userDocRef, {
        categoryExpense: newMainCategory,
      });
    else if (type === "income")
      await updateDoc(userDocRef, {
        categoryIncome: newMainCategory,
      });
  }

  const contextInitialObj = {
    categoryExpense,
    categoryIncome,
    iconObj,
    iconArr,
    removeMainCategory,
    removeSubCategory,
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

function encodeSvg(reactElement) {
  return (
    "data:image/svg+xml," +
    escape(ReactDOMServer.renderToStaticMarkup(reactElement))
  );
}

const iconObj = {
  food: <IoFastFoodSharp className={style.icon} />,
  clothing: <IoIosShirt className={style.icon} />,
  housing: <GiFamilyHouse className={style.icon} />,
  transportation: <AiFillCar className={style.icon} />,
  education: <ImBook className={style.icon} />,
  entertainment: <IoLogoGameControllerB className={style.icon} />,
  salary: <RiMoneyDollarCircleFill className={style.icon} />,
  investment: <BsTrophy className={style.icon} />,
  bonus: <RiHandCoinFill className={style.icon} />,
  stock: <AiOutlineStock className={style.icon} />,
  others: <FiAlignCenter className={style.icon} />,
};

const iconArr = [
  <BsFillHeartFill className={style.icon} />,
  <BsExclamationOctagonFill className={style.icon} />,
  <BsTrophy className={style.icon} />,
  <BsFillAwardFill className={style.icon} />,
  <BsFillBriefcaseFill className={style.icon} />,
  <BsFillEnvelopeOpenFill className={style.icon} />,
  <FaAlipay className={style.icon} />,
  <FaCcAmazonPay className={style.icon} />,
  <FaCcApplePay className={style.icon} />,
  <FaGooglePlusSquare className={style.icon} />,
  <FaLine className={style.icon} />,
  <FaSpotify className={style.icon} />,
  <FaAddressCard className={style.icon} />,
  <FaCameraRetro className={style.icon} />,
  <FaCat className={style.icon} />,
  <FaChild className={style.icon} />,
  <FaCut className={style.icon} />,
  <FaFlushed className={style.icon} />,
  <FaGlasses className={style.icon} />,
  <FaHandsHelping className={style.icon} />,
  <FaGuitar className={style.icon} />,
  <FaKey className={style.icon} />,
  <FaMapMarkedAlt className={style.icon} />,
  <FaPhone className={style.icon} />,
  <FaUserGraduate className={style.icon} />,
  <RiVidicon2Fill className={style.icon} />,
  <RiPlaneLine className={style.icon} />,
  <RiPingPongFill className={style.icon} />,
  <RiMentalHealthFill className={style.icon} />,
  <RiCake2Fill className={style.icon} />,
  <RiCakeFill className={style.icon} />,
  <RiBilliardsFill className={style.icon} />,
  <RiUmbrellaFill className={style.icon} />,
  <RiHandHeartFill className={style.icon} />,
  <MdAudiotrack className={style.icon} />,
  <IoAmericanFootball className={style.icon} />,
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
      /*
      No matter it's expense or income, iconObj and iconArr are always the same
      The only difference is category object data
      */
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
