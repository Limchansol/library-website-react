import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/main_logo.png';
import './Search.css';

function Search() {

  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e) => { setKeyword(e.target.value); }

  return (
    <div id='header-middle'>
      <h1 className="logo">
        <Link to="/"><img src={logoImg} alt="북악하늘_작은도서관" height="80px" /></Link>
      </h1>
      <form className="search-form">
        <select className="search-criteria">
          <option value="all">통합</option>
          <option value="title">제목</option>
          <option value="writer">지은이</option>
          <option value="publisher">출판사</option>
          <option value="ISBN">ISBN</option>
        </select>
        <input type="search" value={keyword} onChange={handleInputChange} className="search-input" placeholder="원하는 도서를 검색하세요." required autoComplete='off' />
        <Link to={`/searched?keyword=${keyword}`} state={{keyword: keyword}}>
          <button className="search-btn">검색</button>
        </Link>
      </form>
    </div>
  );
}

export default Search;