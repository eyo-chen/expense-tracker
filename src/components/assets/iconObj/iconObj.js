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
import style from "./iconObj.module.css";

const iconObj = {
  food: <IoFastFoodSharp className={style.icon} />,
  clothing: <IoIosShirt className={style.icon} />,
  housing: <GiFamilyHouse className={style.icon} />,
  transportation: <AiFillCar className={style.icon} />,
  education: <ImBook className={style.icon} />,
  entertainment: <IoLogoGameControllerB className={style.icon} />,
  salary: <RiMoneyDollarCircleFill className={style.icon} />,
  bonus: <RiHandCoinFill className={style.icon} />,
  stock: <AiOutlineStock className={style.icon} />,
  others: <FiAlignCenter className={style.icon} />,
};

export default iconObj;
