import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import img from "../images/img1.png";
import style from "./BookOfThisMonthPage.module.css";

function BookOfThisMonthPage() {
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const [book, setBook] = useState({
    month: thisMonth,
    title: "",
    writer: "",
    paragraph: "",
    bookImg: { data: "", contentType: "" },
  });

  const sentBook = useLocation().state?.book;

  useEffect(() => {
    if (sentBook?.bookImg?.data) {
      setBook(sentBook);
      return;
    } // 제대로 랜더링 된 이달의 책 링크 타고 넘어왔을 경우
    const source = axios.CancelToken.source();
    const fetchBook = async () => {
      try {
        const bookRes = await axios.get(`/api/bookOfTheMonth/${thisMonth}`, {
          cancelToken: source.token,
        });
        setBook(bookRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
    return () => source.cancel("페이지 이동으로 api요청이 취소되었습니다.");
  }, []);

  return (
    <div id={style.bookRecommendation}>
      <h1 className={style.mainTitle}>이달의 추천 도서</h1>
      <div className={style.mainContents}>
        <img
          src={`data:${book.bookImg.contentType};base64, ${book.bookImg.data}`}
          alt="이달의_추천_도서_이미지"
          className={style.bookImg}
          width="200px"
          height="250px"
        />
        <b>제목:</b> {book.title}
        <br />
        <br />
        <b>지은이:</b> {book.writer}
        <br />
        <br />
        {book.paragraph}
      </div>
    </div>
  );
}

export default BookOfThisMonthPage;
