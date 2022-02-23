import { useState } from "react";
import axios from "axios";
import "./LogInPage.css";
import { loginBool, loginUserInfo } from "../Atoms/LoginAtom.js";
import { useRecoilState, useRecoilValue } from "recoil";

function LogInPage() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
  });
  const isLoggedIn = useRecoilValue(loginBool);
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);

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
      } catch (error) {
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
        className="user-pw"
        placeholder="비밀번호"
      />
      <button type="submit" className="login-btn">
        로그인
      </button>
      <span className="find-id">아이디 찾기</span>
      <span className="find-bar">|</span>
      <span className="find-pw">비밀번호 찾기</span>
    </form>
  );
}

export default LogInPage;
