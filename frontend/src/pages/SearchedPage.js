import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchedPage() {
  const keyword = useLocation().state.keyword;
  const [selectedBooks, setSelectedBooks] = useState([]);

  function filterByKeyword(keyword, items) {
    const lowered = keyword.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowered) ||
        item.keyword.toLowerCase().includes(lowered)
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await axios.get("api/books");
      const books = fetchedData.data;
      const wantedBooks = filterByKeyword(keyword, books);
      setSelectedBooks(wantedBooks);
    };
    fetchData();
  }, [keyword]);

  if (!keyword) {
    return (
      <>
        <div>자료1페이지</div>
        <p>해당하는 자료가 없습니다.</p>
      </>
    );
  }

  return (
    <>
      {selectedBooks.map((book) => {
        return (
          <div className="book" key={book.ISBN}>
            <h3>책 제목: {book.title}</h3>
            <p>글쓴이: {book.writer}</p>
            <p>출판사: {book.publisher}</p>
          </div>
        );
      })}
    </>
  );
}

export default SearchedPage;
