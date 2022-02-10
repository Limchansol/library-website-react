import { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  
  const [userInfo, setUserInfo] = useState({
    id: '',
    pw: '',
  });

  const handleUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userInfo.id || !userInfo.pw) return alert('아이디와 비밀번호를 입력해 주세요.');
    console.log(userInfo);
  }

  return (
    <form id="login-form" onSubmit={handleLogin}>
      <input type="text" name="id" value={userInfo.id} onChange={handleUserInfo} className="user-id" placeholder="아이디" autoFocus />
      <input type="password" name="pw" value={userInfo.pw} onChange={handleUserInfo} className="user-pw" placeholder="비밀번호" />
      <button type="submit" className="login-btn">로그인</button>
      <span className="find-pw">비밀번호를 잊어버리셨나요?</span>
    </form>
  );
}

export default LoginPage;