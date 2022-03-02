import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/main_logo.png";
import style from "./Search.module.css";

function Search() {
  const [category, setCategory] = useState("all");
  const [keyword, setKeyword] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div id={style.headerMiddle}>
      <h1 className={style.logo}>
        <Link to="/">
          <img src={logoImg} alt="북악하늘_작은도서관" height="80px" />
        </Link>
      </h1>
      <form className={style.searchForm}>
        <select
          className={style.searchCriteria}
          onChange={handleCategoryChange}
        >
          <option value="all">통합</option>
          <option value="title">제목</option>
          <option value="writer">지은이</option>
          <option value="publisher">출판사</option>
          <option value="ISBN">ISBN</option>
        </select>
        <input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          className={style.searchInput}
          placeholder="원하는 도서를 검색하세요."
          required
          autoComplete="off"
        />
        <Link
          to={`/searched?${category}=${keyword}`}
          state={{ keyword: keyword, category: category }}
        >
          <button className={style.searchBtn}>검색</button>
        </Link>
      </form>
    </div>
  );
}

export default Search;
