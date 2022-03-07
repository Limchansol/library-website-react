import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginBool, loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import style from "./LogInPage.module.css";

function LogInPage() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
  });
  const isLoggedIn = useRecoilValue(loginBool);
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [logInFailed, setLogInFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const $password = useRef();

  const handleUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.id || !userInfo.password)
      return alert("아이디와 비밀번호를 입력해 주세요.");
    const fetchData = async () => {
      try {
        const fetchedData = await axios.post("/api/users/logIn", userInfo);
        // 새로고침해도 로그인 유지되게 하려면 세션 스토리지에 저장.
        // 문자열로만 저장할 수 있으므로 JSON.stringify
        sessionStorage.setItem("user", JSON.stringify(fetchedData.data));
        setLoginInfo(fetchedData.data);
        navigate("/", { replace: true });
      } catch (error) {
        setLogInFailed(true);
        setUserInfo((prev) => ({
          ...prev,
          password: "",
        }));
        $password.current.focus();
        console.log(error);
      } finally {
        console.log("로그인 요청 axios finally문");
      }
    };
    fetchData();
    return console.log(userInfo);
  };

  return (
    <form id={style["login-form"]} onSubmit={handleSubmit}>
      <div className={style.container}>
        <input
          type="text"
          name="id"
          value={userInfo.id}
          onChange={handleUserInfo}
          className={style["user-id"]}
          placeholder="아이디"
          autoFocus
        />
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleUserInfo}
          ref={$password}
          className={style["user-pw"]}
          placeholder="비밀번호"
        />
        {logInFailed && (
          <span id={style["wrong-info"]}>
            아이디나 비밀번호가 올바르지 않습니다.
          </span>
        )}
      </div>

      <button type="submit" id={style["login-btn"]}>
        로그인
      </button>
      <div id={style["find-info"]}>
        <span id={style["find-id"]}>아이디 찾기</span>
        <span className={style.partition}>|</span>
        <span id={style["find-pw"]}>비밀번호 찾기</span>
      </div>
    </form>
  );
}

export default LogInPage;
