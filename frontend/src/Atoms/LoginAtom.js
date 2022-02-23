import { atom, selector } from "recoil";

export const loginBool = selector({
  key: "loggedin",
  get: ({ get }) => {
    const loginBool = get(loginUserInfo);
    if (!loginBool) return false;
    return true;
  },
});

export const loginUserInfo = atom({
  key: "loggedUser",
  default: "",
});
