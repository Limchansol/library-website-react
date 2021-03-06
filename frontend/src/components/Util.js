import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // useEffect(() => {
  //   const logInFetch = async () => {
  //     try {
  //       let logInRes = await axios.get("/api/users/checkLogIn", {
  //         headers: { token: loginInfo.token?.access },
  //       });
  // if (loginRes.data.message === "jwt expired") {
  //   const refreshData = await axios.get("/api/users/checkrefreshjwt", {
  //     headers: { token: loginInfo.token?.refresh },
  //   });
  //   setLoginInfo(refreshData.data);
  //   loginRes = await axios.get("/api/users/checkLogIn", {
  //     headers: { token: refreshData.data.token?.access },
  //   });
  // }
  //     } catch (error) {
  //       if (error.response.status === 401) {
  //   setLoginInfo("");
  //   sessionStorage.clear();
  //   alert("로그인이 만료되었습니다. 로그인 페이지로 이동합니다.");
  //   navigate("/logIn");
  // }
  //     }
  //   };
  //   logInFetch();
  // }, [loginInfo]);

  const logOut = () => {
    // 로그아웃시 리코일과 세션 스토리지 초기화 후 새로고침
    setLoginInfo("");
    sessionStorage.clear();
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
