import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import style from "./Util.module.css";

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
    window.location.reload();
  };

  return (
    <div id={style["header-top"]}>
      {loginInfo ? (
        <ul id={style.util}>
          <li className={style["util-user"]}>{loginInfo.name}님</li>
          {loginInfo.isAdmin && (
            <NavLink to="/administrator" style={getLinkStyle}>
              <li className={style["util-item"]}>웹사이트 관리</li>
            </NavLink>
          )}
          <NavLink to="/mypage" style={getLinkStyle}>
            <li className={style["util-item"]}>나의 공간</li>
          </NavLink>
          <li className={style["util-item"]} onClick={logOut}>
            로그아웃
          </li>
        </ul>
      ) : (
        <ul id={style.util}>
          <NavLink to="/logIn" style={getLinkStyle}>
            <li className={style["util-item"]}>로그인</li>
          </NavLink>
          <NavLink to="/signUp" style={getLinkStyle}>
            <li className={style["util-item"]}>회원가입</li>
          </NavLink>
        </ul>
      )}
    </div>
  );
}
export default Util;
