import axios from 'axios';
import { useEffect, useState } from 'react';
import './SignupPage.css';

function SignupPage() {

  const [signupInfo, setSignupInfo] = useState({
    id: '',
    pw: '',
    name: '',
    gender: 'not-selected',
    yyyy: '',
    mm: '',
    dd: '',
    mobile: '',
    email: '',
  });

  const handleSignupInfo = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }   
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const fetchedData = await axios.post("api/users/signUp", signupInfo);
        console.log(fetchedData);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('회원가입 요청 axios finally문');
      }
    }
    fetchData();
    return console.log(signupInfo);
  }

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <fieldset>
        <div id="id" className="info">
          <label htmlFor="id">아이디</label>
          <input type="text" name="id" id="id" value={signupInfo.id} onChange={handleSignupInfo} className="user-info" autoFocus required minLength="5" maxLength="20" />
          <span className="message">5~20자의 영문 소문자, 숫자, 특수기호(_),(-)만 사용 가능합니다.</span>
        </div>
        <div id="pw" className="info">
          <label htmlFor="pw">비밀번호</label>
          <input type="password" name="pw" id="pw" value={signupInfo.pw} onChange={handleSignupInfo} className="user-info" required minLength="8" maxLength="16" />
          <span className="message">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
        </div>
        <div id="pw2" className="info">
          <label htmlFor="pw2">비밀번호 확인</label>
          <input type="password" name="pw2" id="pw2" className="user-info" required minLength="8" maxLength="16" />
          <span className="message">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
        </div>
      </fieldset>
      <fieldset>
        <div id="name" className="info">
          <label htmlFor="name">이름</label>
          <input type="text" name="name" id="name" value={signupInfo.name} onChange={handleSignupInfo} className="user-info" required minLength="1" maxLength="30" />
          <span className="message">한글이나 영문 대 소문자를 사용하세요.</span>
        </div>
        <div id="gender-container" className="info">
          <label htmlFor="gender">성별</label>
          <select id="gender" name="gender" value={signupInfo.gender} onChange={handleSignupInfo} className="user-info">
            <option value="not-selected">성별</option>
            <option value="male">남자</option>
            <option value="female">여자</option>
            <option value="free">선택 안 함</option>
          </select>
          <span className="message"></span>
        </div>
        <div id="bd" className="info">
          <label htmlFor="birthdate">생년월일</label>
          <div id="birthdate" className="container">
            <input type="text" name="yyyy" id="yyyy" value={signupInfo.yyyy} onChange={handleSignupInfo} className="user-info user-bd" placeholder="년 (4자리)" required minLength="4" maxLength="4" />
            <input type="text" name="mm" id="mm" value={signupInfo.mm} onChange={handleSignupInfo} className="user-info user-bd" placeholder="월 (2자리)" required minLength="2" maxLength="2" />
            <input type="text" name="dd" id="dd" value={signupInfo.dd} onChange={handleSignupInfo} className="user-info user-bd" placeholder="일 (2자리)" required minLength="2" maxLength="2" />
          </div>
          <span className="message"></span>
        </div>
        <div id="mobile" className="info">
          <label htmlFor="mobile">휴대전화</label>
          <input type="tel" name="mobile" id="mobile" value={signupInfo.cp} onChange={handleSignupInfo} className="user-info" placeholder="숫자만 입력해 주세요." required minLength="11" maxLength="11" />
        </div>
        <div id="email" className="info">
          <label htmlFor="email">이메일</label>
          <input type="email" name="email" id="email" value={signupInfo.email} onChange={handleSignupInfo} className="user-info" required />
        </div>
      </fieldset>
      <button id="signup-btn">회원가입</button>
    </form>
          );
}

          export default SignupPage;