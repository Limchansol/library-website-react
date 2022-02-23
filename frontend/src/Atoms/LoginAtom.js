import { atom, selector } from "recoil";

const isLoggedIn = atom({
  key: "loggedin",
  default: false,
});

export default isLoggedIn;
