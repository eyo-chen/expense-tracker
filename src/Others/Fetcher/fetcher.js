import axios from "axios";
import getToken from "../GetToken/getToken";

async function fetcher(endpoint, method, data) {
  const host = process.env.REACT_APP_API_HOST || "localhost";
  const port = process.env.REACT_APP_API_PORT || "4000";
  const url = `http://${host}:${port}/${endpoint}`;

  try {
    const resp = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken()
      },
      withCredentials: false
    });

    return resp.data
  }
  catch (error) {
    const errorObj = {
      status: error.response.status,
      data: error.response.data,
    }
    throw errorObj;
  }
}

export default fetcher;
