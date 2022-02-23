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

const categoryExpense = {
  food: ["breakfast", "brunch", "lunch", "dinner", "snack", "drink"],
  clothing: ["clothes", "pants", "shoes", "accessories", "underwear"],
  housing: [
    "rent",
    "phone bill",
    "water  bill",
    "electricity bill",
    "gas bill",
    "cable bill",
    "internet bill",
  ],
  transportation: [
    "bus",
    "MRT",
    "uber",
    "taxi",
    "gasoline",
    "parking",
    "maintenance",
  ],
  education: ["books", "course"],
  entertainment: [
    "phone games",
    "video games",
    "computer games",
    "subscription bill",
    "party",
  ],
  others: ["others"],
};

const categoryIncome = {
  salary: ["salary", "bonus"],
  investment: ["stock"],
  others: ["others"],
};

const iconObj = {
  food: <IoFastFoodSharp />,
  clothing: <IoIosShirt />,
  housing: <GiFamilyHouse />,
  transportation: <AiFillCar />,
  education: <ImBook />,
  entertainment: <IoLogoGameControllerB />,
  salary: <RiMoneyDollarCircleFill />,
  investment: <BsTrophy />,
  others: <FiAlignCenter />,
};

const iconArr = [
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
  return [categoryExpense, categoryIncome, newIconObj, newIconArr];
}

export default createInitialData;
