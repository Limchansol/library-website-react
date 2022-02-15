import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchedPage() {
  const category = useLocation().state.category;
  const keyword = useLocation().state.keyword;
  const [selectedBooks, setSelectedBooks] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await axios.get("api/books");
      const books = fetchedData.data;
      const wantedBooks = filterByKeyword(category, keyword, books);
      setSelectedBooks(wantedBooks);
    };
    fetchData();
  }, [category, keyword]);

  if (!keyword || selectedBooks.length === 0) {
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
