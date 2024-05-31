export default function getToken () {
  const rawToken = localStorage.getItem("etoken");
  if (!rawToken) {
    return "";
  }

  return "Bearer " + rawToken;
}