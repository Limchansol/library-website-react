import { Link } from 'react-router-dom';
import navItemsData from '../navItemsData';
import './SubNav.css';

function SubNavList({ currPage, path, hover }) {

  const subNavClass = hover ? 'sub-nav is-active' : 'sub-nav';
  
  return (
    <ul className={subNavClass}>
      {navItemsData[currPage].map((subNavItem) =>  {
        return (
          <Link to={`${path}${subNavItem.address}`} key={subNavItem.title}>
            <li className="sub-nav-item">{subNavItem.title}</li>
          </Link>
        );
      })}
    </ul>
  );
}

export default SubNavList;