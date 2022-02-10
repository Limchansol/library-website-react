import Util from './Util';
import Search from './Search';
import Nav from './Nav';
import './Header.css';

function Header() {
  return (
    <header>
      <Util />
      <Search />
      <Nav />
    </header>
  )
}

export default Header;