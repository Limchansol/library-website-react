import { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';

function CheckMessage({ message, color = '#8c7b75'}) {
  return (
    <span className="message" style={{color: `${color}`}}>{message}</span>
  );
}

function SignupPage() {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    id: '',
    password: '',
    phone: '',
    gender: 'not-selected',
    yyyy: '',
    mm: '',
    dd: '',
    email: '',
  });

  const [infoValidity, setInfoValidity] = useState({
    name: [false, "한글이나 영문 대 소문자를 사용하세요.", ],
    id: [false, "5~20자의 영문 소문자, 숫자, 특수기호(_),(-)만 사용 가능합니다."],
    password: [false, "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."],
    password2: [false, "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."],
    phone: [false, ""], 
    gender: [false, ""],
    birthDate: [false, ""],
    email: [false, ""],
  });


  const checkId = (value) => {
    console.log('체크 아이디');
    let validity;
    let message;
    let color;
    if (!value) {
      message = '필수 정보입니다.'
      validity = false;
      color = 'tomato';
    } else if (value.length < 5 || value.length > 20) {
      validity = false;
      message = '5~20자의 영문 소문자, 숫자, 특수기호(_),(-)만 사용 가능합니다.'
      color = 'tomato';
    } else if (value.length >= 5 && value.length <= 20) {
      validity = true;
      message = '사용 가능한 아이디입니다.';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      id: [validity, message, color],
    }));
  }

  // 비밀번호 확인 함수도 같이 넣어야 함
  const checkPassword = (value) => {
    console.log('체크패스퉈드');
    let validity;
    let message;
    let color;
    if (!value) {
      validity = false;
      message = '필수 정보입니다.'
      color = 'tomato';
    } else if (value.length < 8 || value.length > 16) {
      validity = false;
      message = '8~16자의 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
      color = 'tomato';
    } else {
      validity = true;
      message = '사용 가능한 비밀번호입니다.';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      password: [validity, message, color],
    }));
  }

  const doubleCheckPassword = (e) => {
    console.log('비번2');
    let validity;
    let message;
    let color;
    if (e.target.value === signupInfo.password) {
      validity = true;
      message = '비밀번호가 일치합니다.';
      color = '#795548';
    } else {
      validity = false;
      message = '비밀번호가 일치하지 않습니다.';
      color = 'tomato';
    }
    setInfoValidity((prev) => ({
      ...prev,
      password2: [validity, message, color],
    }));
  }

  const checkName = (value) => {
    console.log('이름');
    let validity;
    let message;
    let color;
    if (!value) {
      validity = false;
      message = '필수 정보입니다.';
      color = 'tomato';
    } else if (value.length > 30) {
      validity = false;
      message = '1~30자 한글이나 영문 대 소문자를 사용하세요.';
      color = 'tomato';
    } else {
      validity = true;
      message = '';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      name: [validity, message, color],
    }));
  }

  const checkGender = (value) => {
    console.log('성별');
    let validity;
    let message;
    let color;
    if (value === 'not-selected') {
      validity = false;
      message = '필수 정보입니다.';
      color = 'tomato';
    } else {
      validity = true;
      message = '';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      gender: [validity, message, color],
    }));
  }

  const checkYear = (value) => {
    console.log('year');
    let validity;
    let message;
    let color;
    if (!value) {
      validity = false;
      message = '필수 정보입니다.';
      color = 'tomato';
    } else if (value.length !== 4 || isNaN(Number(value))) {
      validity = false;
      message = '생년월일을 다시 확인해 주세요.';
      color = 'tomato'; 
    } else {
      validity = true;
      message = '';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      birthDate: [validity, message, color],
    }));
  }

  const checkMonth = (value) => {
    console.log('month');
    let validity;
    let message;
    let color;
    if (!value) {
      validity = false;
      message = '필수 정보입니다.';
      color = 'tomato';
    } else if (Number(value) < 1 || Number(value) > 12 || value.length !== 2) {
      validity = false;
      message = '생년월일을 다시 확인해 주세요.';
      color = 'tomato'; 
    } else {
      validity = true;
      message = '';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      birthDate: [validity, message, color],
    }));
  }

  const checkDay = (value) => {
    console.log('day');
    let validity;
    let message;
    let color;
    if (!value) {
      validity = false;
      message = '필수 정보입니다.';
      color = 'tomato';
    } else if (Number(value) < 1 || Number(value) > 31 || value.length !== 2) {
      validity = false;
      message = '생년월일을 다시 확인해 주세요.';
      color = 'tomato'; 
    } else {
      validity = true;
      message = '';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      birthDate: [validity, message, color],
    }));
  }

  const checkPhone = (value) => {
    console.log('핸드폰');
    let validity;
    let message;
    let color;
    if (!value) {
      validity = false;
      message = '필수 정보입니다.';
      color = 'tomato';
    } else if (value.length !== 11 || isNaN(Number(value))) {
      validity = false;
      message = '휴대폰 번호를 다시 확인해 주세요.';
      color = 'tomato'; 
    } else {
      validity = true;
      message = '';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      phone: [validity, message, color],
    }));
  }

  const checkEmail = (value) => {
    console.log('이메일');
    let validity;
    let message;
    let color;
    if (!value) {
      validity = false;
      message = '필수 정보입니다.';
      color = 'tomato';
    } else if (!value.includes('@') || !value[value.indexOf('@') + 1]) {
      validity = false;
      message = '이메일 형식을 다시 확인해 주세요.';
      color = 'tomato';
    } else {
      validity = true;
      message = '';
      color = '#795548';
    }
    setInfoValidity((prev) => ({
      ...prev,
      email: [validity, message, color],
    }));
  }

  const handleSignupInfo = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    switch (name) {
      case 'id':
        checkId(value);
        break;
      case 'password':
        checkPassword(value);
        break;
      case 'name':
        checkName(value);
        break;
      case 'gender':
        checkGender(value);
        break;
      case 'yyyy':
        checkYear(value);
        break;
      case 'mm':
        checkMonth(value);
        break;
      case 'dd':
        checkDay(value);
        break;
      case 'phone':
        checkPhone(value);
        break;
      case 'email':
        checkEmail(value);
        break;
      default:
        break;
    }

  }   
  
  // false인 애들만 골라서 메시지 띄워놓기
  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = Object.values(infoValidity).every((value) => value[0] === true);
    if (!valid) {

      alert('양식을 다시 확인해 주세요.');
      return;
    }
    const fetchData = async () => {
      try {
        const fetchedData = await axios.post("http://localhost:5000/api/users/signUp", signupInfo);
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
        <div id="id-container" className="info">
          <label htmlFor="id">아이디</label>
          <input type="text" name="id" id="id" value={signupInfo.id} onChange={handleSignupInfo} className="user-info" autoFocus minLength="5" maxLength="20" />
          <CheckMessage message={infoValidity.id[1]} color={infoValidity.id[2]} />
        </div>
        <div id="password-container" className="info">
          <label htmlFor="pw">비밀번호</label>
          <input type="password" name="password" id="password" value={signupInfo.password} onChange={handleSignupInfo} className="user-info" minLength="8" maxLength="16" />
          <CheckMessage message={infoValidity.password[1]} color={infoValidity.password[2]}/>
        </div>
        <div id="password2-container" className="info">
          <label htmlFor="password2">비밀번호 확인</label>
          <input type="password" name="password2" id="password2" onChange={doubleCheckPassword} className="user-info" minLength="8" maxLength="16" />
          <CheckMessage message={infoValidity.password2[1]} color={infoValidity.password2[2]}/>
        </div>
      </fieldset>
      <fieldset>
        <div id="name-container" className="info">
          <label htmlFor="name">이름</label>
          <input type="text" name="name" id="name" value={signupInfo.name} onChange={handleSignupInfo} className="user-info" minLength="1" maxLength="30" />
          <CheckMessage message={infoValidity.name[1]} color={infoValidity.name[2]} />
        </div>
        <div id="gender-container" className="info">
          <label htmlFor="gender">성별</label>
          <select id="gender" name="gender" value={signupInfo.gender} onChange={handleSignupInfo} className="user-info">
            <option value="not-selected">성별</option>
            <option value="male">남자</option>
            <option value="female">여자</option>
            <option value="free">선택 안 함</option>
          </select>
          <CheckMessage message={infoValidity.gender[1]} color={infoValidity.gender[2]} />
        </div>
        <div id="birthdate-container" className="info">
          <label htmlFor="birthdate">생년월일</label>
          <div id="birthdate" className="container">
            <input type="text" name="yyyy" id="yyyy" value={signupInfo.yyyy} onChange={handleSignupInfo} className="user-info user-bd" placeholder="년 (4자리)" minLength="4" maxLength="4" />
            <input type="text" name="mm" id="mm" value={signupInfo.mm} onChange={handleSignupInfo} className="user-info user-bd" placeholder="월 (2자리)" minLength="2" maxLength="2" />
            <input type="text" name="dd" id="dd" value={signupInfo.dd} onChange={handleSignupInfo} className="user-info user-bd" placeholder="일 (2자리)" minLength="2" maxLength="2" />
          </div>
          <CheckMessage message={infoValidity.birthDate[1]} color={infoValidity.birthDate[2]} />
        </div>
        <div id="phone-container" className="info">
          <label htmlFor="phone">휴대전화</label>
          <input type="tel" name="phone" id="phone" value={signupInfo.phone} onChange={handleSignupInfo} className="user-info" placeholder="숫자만 입력해 주세요." minLength="11" maxLength="11" />
          <CheckMessage message={infoValidity.phone[1]} color={infoValidity.phone[2]} />
        </div>
        <div id="email-container" className="info">
          <label htmlFor="email">이메일</label>
          <input type="email" name="email" id="email" value={signupInfo.email} onChange={handleSignupInfo} className="user-info" />
          <CheckMessage message={infoValidity.email[1]} color={infoValidity.email[2]}/>
        </div>
      </fieldset>
      <button id="signup-btn">회원가입</button>
    </form>
          );
}

export default SignupPage;