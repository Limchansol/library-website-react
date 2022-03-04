import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Book from "../components/Book";
import LoadMoreBtn from "../components/LoadMoreBtn";

function SearchedPage() {
  const { category, keyword } = useLocation().state;
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [cursor, setCursor] = useState();
  const LIMIT = 7;

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
          return <Book book={book} key={i} index={i + 1} />;
        })}
      {cursor && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
    </div>
  );
}

export default SearchedPage;
