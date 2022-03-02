import style from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <h4>푸터</h4>
      <div>
        <div className={style.connectNumber}>
          <ul>
            <li>주소: 서울시 성북구</li>
            <li>연락처: 070 1234 1234</li>
            <li>관장: </li>
            <li>이메일: email@naver.com</li>
            <li>후원계좌: KB국민은행</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
