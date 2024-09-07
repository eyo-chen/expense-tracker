export function setAccessToken(token) {
  localStorage.setItem("eaccessToken", token);
}

export function setRefreshToken(token) {
  localStorage.setItem("erefreshToken", token);
}

export default function setToken(token) {
  localStorage.setItem("erefreshToken", token.refresh_token);
  localStorage.setItem("eaccessToken", token.access_token);
}