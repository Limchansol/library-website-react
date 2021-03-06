import { Link } from "react-router-dom";
import style from "./Warn.module.css";

function Warn() {
  return (
    <div id={style.warning}>
      <div>로그인 후 이용할 수 있는 서비스입니다.</div>
      <Link to="/logIn">
        <button className={style["to-login"]}>로그인</button>
      </Link>
    </div>
  );
}

export default Warn;
