import { useState } from 'react';
import NavItem from './NavItem';
import './Nav.css';

function Nav() {
  const [subNavBg, setSubNavBg] = useState(false);

  const handelSubNavBg = (hoverBool) => { setSubNavBg(hoverBool); }

  const subNavBgClass = subNavBg ? 'sub-nav-bg is-active' : 'sub-nav-bg';

  return (
    <nav id='header-bottom'>
      <ul className="nav">
        <div className={subNavBgClass}></div>
        <NavItem path="/introduction" handleSubNavBg = {handelSubNavBg}>북악하늘 소개</NavItem>
        <NavItem path="/rules" handleSubNavBg = {handelSubNavBg}>도서관 이용</NavItem>
        <NavItem path="/notice" handleSubNavBg = {handelSubNavBg}>도서관 소식</NavItem>
        <NavItem path="/materials" handleSubNavBg = {handelSubNavBg}>도서관 자료</NavItem>
        <NavItem path="/cafe" handleSubNavBg = {handelSubNavBg}>북악하늘 카페</NavItem>
      </ul>
    </nav>
  );
}

export default Nav;