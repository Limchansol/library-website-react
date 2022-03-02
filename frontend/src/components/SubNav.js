import { Link } from "react-router-dom";
import navItemsData from "../navItemsData";
import style from "./SubNav.module.css";

function SubNavList({ currPage, path, hover }) {
  return (
    <ul className={hover ? `${style.subNav} ${style.isActive}` : style.subNav}>
      {navItemsData[currPage].map((subNavItem) => {
        return (
          <Link to={`${path}${subNavItem.address}`} key={subNavItem.title}>
            <li className={style.subNavItem}>{subNavItem.title}</li>
          </Link>
        );
      })}
    </ul>
  );
}

export default SubNavList;
