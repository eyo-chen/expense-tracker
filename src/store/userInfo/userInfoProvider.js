import { useState, useEffect } from "react";
import UserInfoContext from "./userInfo--context";
import { getAccessToken } from "../../Others/GetToken/getToken";
import fetcher from "../../Others/Fetcher/fetcher";

function UserInfoProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      return;
    }

    setLoading(true);
    getUserInfo().then((data) => {
      setUserInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, loading }}>
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