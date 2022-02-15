import { NavLink } from 'react-router-dom';
import './Util.css';

function getLinkStyle({ isActive }) {
  return {
    fontWeight: isActive ? 'bold' : 'normal',
  }
}

function Util() {
  return (
    <div id="header-top">
      <ul className="util">
      <NavLink to="/logIn" style={getLinkStyle}><li className="util-item">로그인</li></NavLink>
      <NavLink to="/signUp" style={getLinkStyle}><li className="util-item">회원가입</li></NavLink>
      <NavLink to="/mypage" style={getLinkStyle}><li className="util-item">나의 공간</li></NavLink>
      </ul>
    </div>
  );
}

export default Util;