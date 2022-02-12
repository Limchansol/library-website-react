import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import logoImg from '../images/main_logo.png';
import './Search.css';

function Search() {

  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get('keyword');
  const [keyword, setKeyword] = useState(initKeyword || '');

  const handleSubmit = () => {
    setSearchParams(keyword ? { keyword } : {});
    console.log('dlfdjska');
    }

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
    console.log(keyword, '입력즉시 나오는 키워드');
  }

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
        <input type="search" value={keyword} onChange={handleInputChange}  className="search-input" placeholder="원하는 도서를 검색하세요." required autoComplete='off' />
        <Link to={`/searched?keyword=${keyword}`} state={{keyword: keyword}}>
          <button className="search-btn" onClick={handleSubmit}>검색</button>
        </Link>
      </form>
    </div>
  );
}

export default Search;