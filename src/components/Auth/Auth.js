import { useState } from "react";
import Welcom from "./Welcom/Welcome";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

function Auth() {
  const [authState, setAuthState] = useState("welcome");

  const KEY_TO_COMPONENT = {
    welcome: <Welcom setAuthState={setAuthState} />,
    signup : <Signup setAuthState={setAuthState} />,
    login  : <Login setAuthState={setAuthState} />
  };

  return KEY_TO_COMPONENT[authState];
}


export default Auth;
