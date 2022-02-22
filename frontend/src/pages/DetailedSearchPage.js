import axios from "axios";
import { useState } from "react";
import "./DetailedSearchPage.css";

function DetailedSearchPage() {
  const [detailedSearchValue, setDetailedSearchValue] = useState({
    title: "",
    writer: "",
    isbn: "",
    publisher: "",
  });

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
    publisher = ""
  ) => {
    const encodedQuery = [
      encodeURIComponent(title),
      encodeURIComponent(writer),
      encodeURIComponent(isbn),
      encodeURIComponent(publisher),
    ];
    const books = await axios.get(
      `/api/books/detailed?title=${encodedQuery[0]}&writer=${encodedQuery[1]}&isbn=${encodedQuery[2]}&publisher=${encodedQuery[3]}`
    );
    return books;
  };

  const detailedSearch = (e) => {
    e.preventDefault();
    const { title, writer, isbn, publisher } = detailedSearchValue;
    const books = fetchDetailedBook(title, writer, isbn, publisher);
    console.log(books);
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
    </>
  );
} //추후 수정

export default DetailedSearchPage;
