import { auth } from "./../../firebase-config";

function createUserID() {
  const user = auth.currentUser;
  let userID = "oyeoye000000@gmail.comYOO";
  if (user) {
    const { displayName, email } = user;
    userID = `${email}${displayName.split(" ").join("")}`;
  }

  return [user, userID];
}

export default createUserID;
