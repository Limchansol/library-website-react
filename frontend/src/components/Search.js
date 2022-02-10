import { Link, useSearchParams } from 'react-router-dom';
import books from '../books';
import logoImg from '../images/main_logo.png';
import './Search.css';

function Search() {

  function filterByKeyword(items, keyword) {
    const lowered = keyword.toLowerCase();
    return (
      items.filter((item) => (
        item.title.toLowerCase().includes(lowered)
        || item.keyword.toLowerCase().includes(lowered)
      ))
    );
  }

  function getBooks(keyword) {
    if (!keyword) return books;
    return filterByKeyword(keyword, books);
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
        <input type="search" className="search-input" placeholder="원하는 도서를 검색하세요." required autoComplete='off' />
        <button className="search-btn">검색</button>
      </form>
    </div>
  );
}

export default Search;