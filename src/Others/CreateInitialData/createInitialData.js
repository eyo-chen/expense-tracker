import { IoFastFoodSharp } from "react-icons/io5";
import { IoIosShirt } from "react-icons/io";
import { GiFamilyHouse, GiHealthNormal } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { ImBook } from "react-icons/im";
import { IoLogoGameControllerB } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiHandCoinFill, RiBillFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { FiAlignCenter, FiGift } from "react-icons/fi";
import { BiFile } from "react-icons/bi";

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
import { CgUser } from "react-icons/cg";

import ReactDOMServer from "react-dom/server";

function encodeSvg(reactElement) {
  return (
    "data:image/svg+xml," +
    escape(ReactDOMServer.renderToStaticMarkup(reactElement))
  );
}

const categoryExpense = {
  food: [
    "breakfast",
    "brunch",
    "lunch",
    "dinner",
    "groceries",
    "snack",
    "drink",
  ],
  clothing: ["clothes", "pants", "shoes", "accessories", "underwear"],
  housing: ["rent", "property taxes", "household repairs"],
  transportation: [
    "bus",
    "MRT",
    "uber",
    "taxi",
    "gasoline",
    "parking fees",
    "repairs",
    "maintenance",
  ],
  education: ["books", "course"],
  entertainment: [
    "phone games",
    "video games",
    "computer games",
    "subscription bill",
    "party",
    "vacations",
    "movies",
  ],
  debt: ["personal loans", "student loans", "credit cards"],
  gifts: [
    "birthday",
    "anniversary",
    "wedding",
    "christmas",
    "special occasion",
    "charities",
  ],
  healthcare: [
    "primary care",
    "dental care",
    "urgent care",
    "medications",
    "medical devices",
  ],
  insurance: [
    "health insurance",
    "auto insurance",
    "life insurance",
    "disability insurance",
  ],
  utilities: ["electricity", "water", "garbage", "phones", "cable", "internet"],
  others: ["others"],
};

const mainCategoryExpense = [
  "food",
  "transportation",
  "utilities",
  "housing",
  "clothing",
  "entertainment",
  "gifts",
  "education",
  "insurance",
  "debt",
  "healthcare",
  "others",
];

const categoryIncome = {
  salary: ["salary", "bonus"],
  investment: ["stock"],
  others: ["others"],
};

const mainCategoryIncome = ["salary", "investment", "others"];

const iconObj = {
  food: <IoFastFoodSharp />,
  clothing: <IoIosShirt />,
  housing: <GiFamilyHouse />,
  transportation: <AiFillCar />,
  education: <ImBook />,
  entertainment: <IoLogoGameControllerB />,
  gifts: <FiGift />,
  healthcare: <GiHealthNormal />,
  utilities: <RiBillFill />,
  insurance: <BiFile />,
  debt: <CgUser />,
  salary: <RiMoneyDollarCircleFill />,
  investment: <BsTrophy />,
  others: <FiAlignCenter />,
};

const iconArr = [
  <IoFastFoodSharp />,
  <IoIosShirt />,
  <GiFamilyHouse />,
  <AiFillCar />,
  <ImBook />,
  <IoLogoGameControllerB />,
  <FiGift />,
  <GiHealthNormal />,
  <RiBillFill />,
  <BiFile />,
  <CgUser />,
  <RiMoneyDollarCircleFill />,
  <BsTrophy />,
  <FiAlignCenter />,
  <AiOutlineStock />,
  <RiHandCoinFill />,
  <BsFillHeartFill />,
  <BsExclamationOctagonFill />,
  <BsTrophy />,
  <BsFillAwardFill />,
  <BsFillBriefcaseFill />,
  <BsFillEnvelopeOpenFill />,
  <FaAlipay />,
  <FaCcAmazonPay />,
  <FaCcApplePay />,
  <FaGooglePlusSquare />,
  <FaLine />,
  <FaSpotify />,
  <FaAddressCard />,
  <FaCameraRetro />,
  <FaCat />,
  <FaChild />,
  <FaCut />,
  <FaFlushed />,
  <FaGlasses />,
  <FaHandsHelping />,
  <FaGuitar />,
  <FaKey />,
  <FaMapMarkedAlt />,
  <FaPhone />,
  <FaUserGraduate />,
  <RiVidicon2Fill />,
  <RiPlaneLine />,
  <RiPingPongFill />,
  <RiMentalHealthFill />,
  <RiCake2Fill />,
  <RiCakeFill />,
  <RiBilliardsFill />,
  <RiUmbrellaFill />,
  <RiHandHeartFill />,
  <MdAudiotrack />,
  <IoAmericanFootball />,
];

const newIconObj = {};
const newIconArr = [];

for (const [key, value] of Object.entries(iconObj)) {
  newIconObj[key] = encodeSvg(value);
}

iconArr.forEach((icon) => {
  newIconArr.push(encodeSvg(icon));
});

function createInitialData() {
  return [
    categoryExpense,
    categoryIncome,
    newIconObj,
    newIconArr,
    mainCategoryExpense,
    mainCategoryIncome,
  ];
}

export default createInitialData;