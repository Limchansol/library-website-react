import style from "./Footer.module.css";
import logo from "../images/main_logo.png";

function Footer() {
  return (
    <footer>
      <div className={style.footerContents}>
        <div className={style.logo}>
          <img src={logo} alt="북악하늘_작은도서관_로고" width="130px" />
        </div>
        <div className={style.contact}>
          <span>서울시 성북구</span>
          <span>연락처: 070 1234 1234</span>
          <span>이메일: email@naver.com</span>
          <span>후원계좌: KB국민은행</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
