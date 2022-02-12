import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

function SearchedPage() {
  console.log(useLocation(), "로케이션");
  const _keyword = useLocation().state?.keyword;
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword");
  const [keyword, setKeyword] = useState(initKeyword || "");
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
    setKeyword(_keyword || "");
    setSearchParams(keyword ? { keyword } : {});
    const fetchData = async () => {
      const {
        data: { books },
      } = await axios.get("api/books");
      console.log(books);
      const wantedBooks = filterByKeyword(keyword, books);
      setSelectedBooks(wantedBooks);
    };
    fetchData();
  }, []);

  if (!keyword) {
    return (
      <>
        <div>자료1페이지</div>
        <p>해당하는 자료가 없습니다.</p>
      </>
    );
  }

  console.log("키워드 잇음");

  console.log(selectedBooks);

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
