import axios from "axios";
import { getAccessToken, getRefreshToken } from "../GetToken/getToken";
import setToken from "../SetToken/setToken";

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
}

function addSubscriber(cb) {
  refreshSubscribers.push(cb);
}

async function refreshTokenAndRetry(retryOriginalRequest) {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const refreshToken = getRefreshToken();
      const url = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const response = await axios.get(`${url}/v1/user/token?refresh_token=${refreshToken}`);
      const newToken = response.data;
      setToken(newToken);
      onRefreshed(newToken);
      isRefreshing = false;
      return retryOriginalRequest();
    } catch (error) {
      isRefreshing = false;
      throw error;
    }
  }
  return new Promise(resolve => {
    addSubscriber(() => {
      resolve(retryOriginalRequest());
    });
  });
}

async function fetcher(endpoint, method, data, retryCount = 0) {
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const url = `${baseUrl}/${endpoint}`;

  try {
    const resp = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": getAccessToken()
      },
      withCredentials: false
    });

    return resp.data;
  } catch (error) {
    if (error.response && error.response.status === 401 &&
        error.response.data.error === "token has invalid claims: token is expired" &&
        retryCount < 1) {
      return refreshTokenAndRetry(() => fetcher(endpoint, method, data, retryCount + 1));
    }

    const errorObj = {
      status: error.response.status,
      data: error.response.data,
    };
    throw errorObj;
  }
}

export default fetcher;
