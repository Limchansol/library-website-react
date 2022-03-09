import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./BookOfTheMonth.module.css";

function BookOfTheMonth({ month }) {
  const now = new Date();
  const nowMonth = month ? month : now.getMonth() + 1;
  const [targetBook, setTragetBook] = useState({
    month: nowMonth,
    title: "",
    writer: "",
    paragraph: "",
    bookImg: { data: "", contentType: "" },
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const book = await axios.get(`/api/bookOfTheMonth/${nowMonth}`, {
          cancelToken: source.token,
        });
        setTragetBook(book.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => source.cancel("페이지 이동으로 api요청이 취소되었습니다.");
  }, [nowMonth]);

  return (
    <div id={style.BookOfTheMonth}>
      <h2>{nowMonth}월, 이 달의 추천 도서</h2>
      <Link to="/materials/book-recommendation" state={{ book: targetBook }}>
        <img
          src={`data:${targetBook.bookImg.contentType};base64, ${targetBook.bookImg.data}`}
          width="200px"
          height="250px"
        ></img>
        <p>제목: {targetBook.title}</p>
        <p>저자: {targetBook.writer}</p>
        <p>{targetBook.paragraph}</p>
      </Link>
    </div>
  );
}

export default BookOfTheMonth;
