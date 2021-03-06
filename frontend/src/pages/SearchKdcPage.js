import { useEffect, useState } from "react";
import axios from "axios";
import Book from "../components/Book";
import LoadMoreBtn from "../components/LoadMoreBtn";
import 총류 from "../images/총류.png";
import 철학 from "../images/철학.png";
import 문학 from "../images/문학.png";
import 기술과학 from "../images/기술과학.png";
import 사회과학 from "../images/사회과학.png";
import 언어 from "../images/언어.png";
import 역사 from "../images/역사.png";
import 예술 from "../images/예술.png";
import 자연과학 from "../images/자연과학.png";
import 종교 from "../images/종교.png";
import style from "./SearchKdcPage.module.css";

function SearchKdcPage() {
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
  const subjectImg = [
    총류,
    철학,
    종교,
    사회과학,
    자연과학,
    기술과학,
    예술,
    언어,
    문학,
    역사,
  ];
  const [kdc, setKdc] = useState("");
  const [kdcBooks, setKdcBooks] = useState([]);
  const [cursor, setCursor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const LIMIT = 7;

  const fetchBookForSubj = async (limit, cursor) => {
    const subNum = subject.findIndex((a) => a === kdc);
    let result;
    try {
      setIsLoading(true);
      result = await axios.get(
        `/api/books/subject?subNum=${subNum}&limit=${limit}&cursor=${
          cursor ? cursor : ""
        }`
      );
    } catch (error) {
      console.log("주제별 검색 오류", error);
      return;
    } finally {
      setIsLoading(false);
    }
    const subjBooksRes = result;
    const {
      books,
      paging: { nextCursor },
    } = subjBooksRes.data;
    if (!cursor) {
      setKdcBooks(books);
    } else {
      setKdcBooks((prev) => [...prev, ...books]);
    }
    setCursor(nextCursor);
  };

  // 더보기
  const handleLoadMore = () => {
    fetchBookForSubj(LIMIT, cursor);
  };

  // 주제별 버튼 누르면 kdc state 바꿈
  const handleKdcChange = (e) => {
    setKdc(e.currentTarget.id); //currentTarget으로 해야된다. 그냥 target으로 하면 이벤트가 일어난 바로 그 target을 가리키기 때문!
  };

  // kdc 바뀔 때마다 실행
  useEffect(() => {
    fetchBookForSubj(LIMIT); // 커서는 리셋해야 하니까 전달 안함
  }, [kdc]);

  return (
    <>
      <div id={style.titleText}>
        <h1>주제별 검색</h1>
        <p>
          당신이 흥미를 느끼는 주제의 더 많은 책을 검색하세요!
          <br />책 속을 주제와 함께 여행해 봅시다.
        </p>
      </div>
      <div id={style.subjectButtons}>
        {subject.map((e, i) => {
          return (
            <div id={e} className={style.btn} onClick={handleKdcChange} key={i}>
              <img src={subjectImg[i]} height="100px" width="100px" />
              <span className={style.btnName}>{e}</span>
            </div>
          );
        })}
      </div>
      <div className={style.searchedBooks}>
        {kdc && <h2>{kdc} 도서</h2>}
        <div className={style.bookList}>
          {kdcBooks.length !== 0 &&
            kdcBooks.map((book, i) => {
              return <Book book={book} key={i} index={i + 1} />;
            })}
        </div>
        {cursor && (
          <LoadMoreBtn handleLoadMore={handleLoadMore} isLoading={isLoading} />
        )}
      </div>
    </>
  );
}

export default SearchKdcPage;
