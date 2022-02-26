import { useEffect, useState } from "react";
import axios from "axios";
import "./SubjectSearchPage.css";

function SubjectSearchPage() {
  const subject = [
    "총류",
    "철학",
    "종교",
    "사회과학",
    "자연과학",
    "기술과학",
    "예술",
    "언어",
    "문학",
    "역사",
  ];
  const [kdc, setKdc] = useState("");
  const [kdcBooks, setKdcBooks] = useState([]);
  const [cursor, setCursor] = useState();
  const LIMIT = 7;

  const fetchBookForSubj = async (limit, cursor) => {
    const subNum = subject.findIndex((a) => a === kdc);
    const subjBooksRes = await axios.get(
      `/api/books/subject?subNum=${subNum}&limit=${limit}&cursor=${
        cursor ? cursor : ""
      }`
    );
    console.log(subjBooksRes, "리스폰스");
    const {
      books,
      paging: { nextCursor },
    } = subjBooksRes.data;
    if (!cursor) {
      setKdcBooks(books);
    } else {
      setKdcBooks((prev) => [...prev, ...books]);
    }
    console.log(books, "책들");
    console.log(cursor, "현재 커서");
    console.log(nextCursor, "다음커서");
    setCursor(nextCursor);
  };

  // const findSubjectNumber = (kdc, cursor) => {
  //   const subnum = subject.findIndex((a) => a === kdc);
  //   fetchBookForSubj(subnum, cursor, LIMIT);
  // };

  // 더보기
  const handleLoadMore = () => {
    console.log(cursor, " 커서");
    fetchBookForSubj(LIMIT, cursor);
    // findSubjectNumber(kdc, cursor);
  };

  // 주제별 버튼 누르면 kdc state 바꿈
  const handleKdcChange = (e) => {
    setKdc(e.target.id);
  };

  // kdc 바뀔 때마다 실행
  useEffect(() => {
    fetchBookForSubj(LIMIT); // 커서는 리셋해야 하니까 전달 안함
  }, [kdc]);

  return (
    <>
      <div id="subjectButton">
        {subject.map((e, i) => {
          return (
            <button id={e} key={i} onClick={handleKdcChange}>
              {e}
            </button>
          );
        })}
      </div>
      <div className="searched-books">
        {kdcBooks.length !== 0 &&
          kdcBooks.map((book, i) => {
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
}

export default SubjectSearchPage;
