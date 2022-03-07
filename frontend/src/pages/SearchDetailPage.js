import { useState } from "react";
import axios from "axios";
import Book from "../components/Book";
import LoadMoreBtn from "../components/LoadMoreBtn";
import style from "./SearchDetailPage.module.css";

function SearchDetailPage() {
  const [detailedSearchValue, setDetailedSearchValue] = useState({
    title: "",
    writer: "",
    isbn: "",
    publisher: "",
  });
  const [detailedBooks, setDetailedBooks] = useState([]);
  const [cursor, setCursor] = useState();
  const LIMIT = 7;

  const handleDetailedSearchValue = (e) => {
    const { id, value } = e.target;
    setDetailedSearchValue({
      ...detailedSearchValue,
      [id]: value,
    });
  };

  const fetchDetailedBook = async (
    title = "",
    writer = "",
    isbn = "",
    publisher = "",
    cursor
  ) => {
    const encodedQuery = [
      encodeURIComponent(title),
      encodeURIComponent(writer),
      encodeURIComponent(isbn),
      encodeURIComponent(publisher),
    ];
    const detailedRes = await axios.get(
      `/api/books/detailed?title=${encodedQuery[0]}&writer=${
        encodedQuery[1]
      }&isbn=${encodedQuery[2]}&publisher=${
        encodedQuery[3]
      }&limit=${LIMIT}&cursor=${cursor ? cursor : ""}`
    );
    const {
      books,
      paging: { nextCursor },
    } = detailedRes.data;
    if (!cursor) {
      setDetailedBooks(books);
    } else {
      setDetailedBooks((prev) => [...prev, ...books]);
    }
    setCursor(nextCursor);

    return books;
  };

  const detailedSearch = (e) => {
    e.preventDefault();
    const { title, writer, isbn, publisher } = detailedSearchValue;
    const books = fetchDetailedBook(title, writer, isbn, publisher);
  };

  const handleLoadMore = () => {
    const { title, writer, isbn, publisher } = detailedSearchValue;
    fetchDetailedBook(title, writer, isbn, publisher, cursor);
  };

  return (
    <>
      <div id={style.detailedSearchText}>
        <h1>상세검색이란?</h1>
        <p>
          한 번에 여러 개의 요소를 검색할 수 있고, 그것에 <strong>모두 </strong>
          해당하는 책을 보여줍니다.
          <br />
          가령, 저자를 'ㄱ', 도서명을 'ㄴ'으로 검색하면 저자가 ㄱ이면서 도서명이
          ㄴ인 책을 보여줍니다.
        </p>
      </div>
      <form id={style.detailedSearchForm} onSubmit={detailedSearch}>
        <div className={style.container}>
          <label htmlFor="title">도서명: </label>
          <input
            type="text"
            id="title"
            onChange={handleDetailedSearchValue}
            value={detailedSearchValue.title}
          />
        </div>
        <br />
        <div className={style.container}>
          <label htmlFor="writer">저자: </label>
          <input
            type="text"
            id="writer"
            onChange={handleDetailedSearchValue}
            value={detailedSearchValue.writer}
          />
        </div>
        <br />
        <div className={style.container}>
          <label htmlFor="isbn">ISBN: </label>
          <input
            type="text"
            id="isbn"
            onChange={handleDetailedSearchValue}
            value={detailedSearchValue.isbn}
          />
        </div>
        <br />
        <div className={style.container}>
          <label htmlFor="publisher">출판사: </label>
          <input
            type="text"
            id="publisher"
            onChange={handleDetailedSearchValue}
            value={detailedSearchValue.publisher}
          />
        </div>
        <br />
        <button id={style.searchButton}>검색하기</button>
      </form>
      <div className={style.showBooks}>
        {detailedBooks.length !== 0 &&
          detailedBooks.map((book, i) => {
            return <Book book={book} key={i} index={i + 1} />;
          })}
        {cursor && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
      </div>
    </>
  );
} //추후 수정

export default SearchDetailPage;
