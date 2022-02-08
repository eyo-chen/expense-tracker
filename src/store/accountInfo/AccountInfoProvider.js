import { useState } from "react";
import AccountInfoContext from "./accountInfo--context";

function AccountInfoProvider(props) {
  const [accountInfo, setAccountInfo] = useState({
    name: "Ryotsu Kankichi",
    email: "dscvwevew@gmail.com",
  });

  return (
    <AccountInfoContext.Provider value={{ accountInfo, setAccountInfo }}>
      {props.children}
    </AccountInfoContext.Provider>
  );
}

export default AccountInfoProvider;
