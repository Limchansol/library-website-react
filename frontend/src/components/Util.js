import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import "./Util.css";

function getLinkStyle({ isActive }) {
  return {
    fontWeight: isActive ? "bold" : "normal",
  };
}

function Util() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);

  useEffect(() => {
    const logInFetch = async () => {
      try {
        const logInFetched = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token },
        });
      } catch (error) {
        console.log(error);
      }
    };
    logInFetch();
    console.log(loginInfo, "로그인인포");
  }, [loginInfo]);

  const logOut = () => {
    setLoginInfo("");
  };

  return (
    <>
      {loginInfo ? (
        <div id="header-top">
          <ul className="util">
            <li className="util-item" onClick={logOut}>
              로그아웃
            </li>
            <li className="util-item">{loginInfo.name}님</li>
            <NavLink to="/mypage" style={getLinkStyle}>
              <li className="util-item">나의 공간</li>
            </NavLink>
          </ul>
        </div>
      ) : (
        <div id="header-top">
          <ul className="util">
            <NavLink to="/logIn" style={getLinkStyle}>
              <li className="util-item">로그인</li>
            </NavLink>
            <NavLink to="/signUp" style={getLinkStyle}>
              <li className="util-item">회원가입</li>
            </NavLink>
          </ul>
        </div>
      )}
    </>
  );
}
export default Util;
