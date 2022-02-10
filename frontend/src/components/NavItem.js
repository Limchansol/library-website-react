import { useState } from 'react';
import SubNav from './SubNav';
import './NavItem.css';

function NavItem({ path, handleSubNavBg, children }) {

  const [hover, setHover] = useState(false);
  const appear = () => { setHover(true); handleSubNavBg(true); }
  const disappear = () => { setHover(false); handleSubNavBg(false); }
  
  return (
    <li className="nav-item" onMouseEnter={appear} onMouseLeave={disappear}>
      <span>{children}</span>
      <SubNav currPage={children} path={path} hover={hover}/>
    </li>
  );
}

export default NavItem;