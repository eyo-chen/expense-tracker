import { useState, useEffect } from "react";
import UserInfoContext from "./userInfo--context";
import { getAccessToken } from "../../Others/GetToken/getToken";
import fetcher from "../../Others/Fetcher/fetcher";

function UserInfoProvider(props) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      return;
    }

    getUserInfo().then((data) => {
      setUserInfo(data);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoProvider;

async function getUserInfo() {
  try {
    const response = await fetcher("v1/user", "GET", null);
    return response
  }
  catch (error) {
    throw error;
  }
}