import { useState } from "react";
import axios from "axios";
import "./DetailedSearchPage.css";

function DetailedSearchPage() {
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
    console.log(books);
  };

  const handleLoadMore = () => {
    const { title, writer, isbn, publisher } = detailedSearchValue;
    fetchDetailedBook(title, writer, isbn, publisher, cursor);
  };

  return (
    <>
      <div id="detailedSearchtext">
        <h1>상세검색이란?</h1>
        <p>
          한 번에 여러 개의 요소를 검색할 수 있고, 그것에 <strong>모두 </strong>
          해당하는 책을 보여줍니다.
          <br />
          가령, 저자를 'ㄱ', 도서명을 'ㄴ'으로 검색하면 저자가 ㄱ이면서 도서명이
          ㄴ인 책을 보여줍니다.
        </p>
      </div>
      <div id="detailedSearchForm">
        <form onSubmit={detailedSearch}>
          <label htmlFor="title">도서명: </label>
          <input
            type="text"
            id="title"
            onChange={handleDetailedSearchValue}
            value={detailedSearchValue.title}
          />
          <br />
          <label htmlFor="writer">저자: </label>
          <input
            type="text"
            id="writer"
            onChange={handleDetailedSearchValue}
            value={detailedSearchValue.writer}
          />
          <br />
          <label htmlFor="isbn">ISBN: </label>
          <input
            type="text"
            id="isbn"
            onChange={handleDetailedSearchValue}
            value={detailedSearchValue.isbn}
          />
          <br />
          <label htmlFor="publisher">출판사: </label>
          <input
            type="text"
            id="publisher"
            onChange={handleDetailedSearchValue}
            value={detailedSearchValue.publisher}
          />
          <br />
          <button id="searchButton">검색</button>
        </form>
      </div>
      <div className="show-books">
        {detailedBooks.length !== 0 &&
          detailedBooks.map((book, i) => {
            return (
              <div className="book" key={i}>
                <h3>책 제목: {book.title}</h3>
                <p>글쓴이: {book.writer}</p>
                <p>출판사: {book.publisher}</p>
              </div>
            );
          })}
        {cursor && (
          <button className="load-more" onClick={handleLoadMore}>
            더보기
          </button>
        )}
      </div>
    </>
  );
} //추후 수정

export default DetailedSearchPage;
