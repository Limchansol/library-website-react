import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginBool, loginUserInfo } from "../Atoms/LoginAtom.js";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import "./LogInPage.css";

function LogInPage() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
  });
  const isLoggedIn = useRecoilValue(loginBool);
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [logInFailed, setLogInFailed] = useState(false);
  const navigate = useNavigate();
  // const $password = useRef(); 라고 해보자
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
        console.log(fetchedData);
        setLoginInfo(fetchedData.data);
        console.log(isLoggedIn, loginInfo);
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
    <form id="login-form" onSubmit={handleSubmit}>
      <div className="container">
        <input
          type="text"
          name="id"
          value={userInfo.id}
          onChange={handleUserInfo}
          className="user-id"
          placeholder="아이디"
          autoFocus
        />
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleUserInfo}
          ref={$password}
          className="user-pw"
          placeholder="비밀번호"
        />
        {logInFailed && (
          <span className="login-failed">
            아이디나 비밀번호가 올바르지 않습니다.
          </span>
        )}
      </div>

      <button type="submit" className="login-btn">
        로그인
      </button>
      <div className="find-info">
        <span className="find-id">아이디 찾기</span>
        <span className="find-bar">|</span>
        <span className="find-pw">비밀번호 찾기</span>
      </div>
    </form>
  );
}

export default LogInPage;
