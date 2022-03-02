import { useState } from "react";
import NavItem from "./NavItem";
import style from "./Nav.module.css";

function Nav() {
  const [subNavBg, setSubNavBg] = useState(false);

  const handelSubNavBg = (hoverBool) => {
    setSubNavBg(hoverBool);
  };

  return (
    <nav id={style.headerBottom}>
      <ul className={style.nav}>
        <div
          className={
            subNavBg ? `${style.subNavBg} ${style.isActive}` : style.subNavBg
          }
        ></div>
        <NavItem path="/introduction" handleSubNavBg={handelSubNavBg}>
          북악하늘 소개
        </NavItem>
        <NavItem path="/service-guide" handleSubNavBg={handelSubNavBg}>
          도서관 이용
        </NavItem>
        <NavItem path="/materials" handleSubNavBg={handelSubNavBg}>
          도서관 자료
        </NavItem>
        <NavItem path="/programs" handleSubNavBg={handelSubNavBg}>
          도서관 활동
        </NavItem>
        <NavItem
          path="/notices-and-communication"
          handleSubNavBg={handelSubNavBg}
        >
          알림 및 소통
        </NavItem>
      </ul>
    </nav>
  );
}

export default Nav;
