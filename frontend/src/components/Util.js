import { NavLink } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginBool, loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import "./Util.css";
import { useEffect, useState } from "react";

function getLinkStyle({ isActive }) {
  return {
    fontWeight: isActive ? "bold" : "normal",
  };
}

function Util() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const isLoggedIn = useRecoilValue(loginBool);

  useEffect(() => {
    const logInFetch = async () => {
      try {
        const logInFetched = await axios.get(`/api/users/checkLogIn`, {
          headers: { token: loginInfo.token },
        }); //headers에 토큰 넣어서 보내는 방법
        setLoginInfo(logInFetched.data);
      } catch (error) {
        console.log(error);
      }
    };
    logInFetch();
  }, [loginInfo]);

  const logOut = () => {
    // setIsLoggedIn(false); 이거 왜 필요하지??
    setLoginInfo("");
  };

  return (
    <>
      {isLoggedIn ? (
        <div id="header-top">
          <ul className="util">
            <li className="util-item" onClick={logOut}>
              로그아웃
            </li>
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
