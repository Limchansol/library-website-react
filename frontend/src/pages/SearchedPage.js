import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Book from "../components/Book";
import LoadMoreBtn from "../components/LoadMoreBtn";

function SearchedPage() {
  const { category, keyword } = useLocation().state;
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [cursor, setCursor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const LIMIT = 7;

  const fetchData = async (cursor) => {
    let result;
    try {
      setIsLoading(true);
      result = await axios.get(
        `api/books?${category}=${encodeURIComponent(
          keyword
        )}&limit=${LIMIT}&cursor=${cursor ? cursor : ""}`
      ); //keyword에 인코딩 필요!
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      return;
    } finally {
      setIsLoading(false);
    }
    const booksRes = result;
    const {
      books,
      paging: { nextCursor },
    } = booksRes.data;
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
      {cursor && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} isLoading={isLoading} />
      )}
    </div>
  );
}

export default SearchedPage;
