import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchedPage() {
  const category = useLocation().state.category;
  const keyword = useLocation().state.keyword;
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [cursor, setCursor] = useState();
  const LIMIT = 7;

  // 서버에서 find 처리하면 이 함수는 필요없을듯
  function filterByKeyword(category, keyword, items) {
    const lowered = keyword.toLowerCase();
    let filteredItems;
    if (category === "all") {
      filteredItems = items.filter(
        (item) =>
          item.title.toLowerCase().includes(lowered) ||
          item.writer.toLowerCase().includes(lowered) ||
          item.publisher.toLowerCase().includes(lowered) ||
          item.ISBN.toLowerCase().includes(lowered) ||
          item.keyword.toLowerCase().includes(lowered)
      );
    } else {
      filteredItems = items.filter((item) =>
        item[category].toLowerCase().includes(lowered)
      );
    }
    return filteredItems;
  }

  const fetchData = async (cursor) => {
    const booksRes = await axios.get(
      `api/books?${category}=${encodeURIComponent(
        keyword
      )}&limit=${LIMIT}&cursor=${cursor ? cursor : ""}`
    ); //keyword에 인코딩 필요!
    const {
      books,
      paging: { nextCursor },
    } = booksRes.data;
    // const wantedBooks = filterByKeyword(category, keyword, books);
    if (!cursor) {
      setSelectedBooks(books);
    } else {
      setSelectedBooks((prev) => [...prev, ...books]);
    }
    setCursor(nextCursor);
  };

  useEffect(() => {
    fetchData();
  }, [category, keyword]);

  const handleLoadMore = () => {
    fetchData(cursor);
  };

  if (!keyword || selectedBooks.length === 0) {
    return (
      <>
        <div>자료1페이지</div>
        <p>해당하는 자료가 없습니다.</p>
      </>
    );
  }

  return (
    <div className="searched-books">
      {selectedBooks.length !== 0 &&
        selectedBooks.map((book, i) => {
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
  );
}

export default SearchedPage;
