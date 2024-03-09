import axios from "axios";
import getToken from "../GetToken/getToken";

async function fetcher(endpoint, method, data) {
  const url = `http://localhost:4000/${endpoint}`;

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
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetcher;
