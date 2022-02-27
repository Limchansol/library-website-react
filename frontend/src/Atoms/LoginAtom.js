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
}); //주의! 여기에는 토큰과 기본적인 정보만이 들어있음. 구체적인 데이터는 이 토큰으로 요청하고 각각의 컴포넌트에서 받아올 것!
