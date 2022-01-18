const TODAY = new Date();
const YEAR = TODAY.getFullYear() + "";
const MONTH =
  TODAY.getMonth() + 1 >= 10
    ? TODAY.getMonth() + 1 + ""
    : "0" + (TODAY.getMonth() + 1);
const DAY = TODAY.getDate() + "";

const timeObj = { TODAY, YEAR, MONTH, DAY };

export default timeObj;
