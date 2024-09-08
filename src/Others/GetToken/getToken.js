export function getAccessToken() {
  const rawToken = localStorage.getItem("eaccessToken");
  if (!rawToken) {
    return "";
  }

  return "Bearer " + rawToken;
}

export function getRefreshToken() {
  return localStorage.getItem("erefreshToken");
}
