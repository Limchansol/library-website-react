import axios from "axios";
import { useEffect, useState } from "react";
import img from "../images/img1.png";
import style from "./BookOfTheMonth.module.css";

function BookOfTheMonth() {
  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  const [targetBook, setTragetBook] = useState({
    month: nowMonth,
    title: "",
    writer: "",
    paragraph: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const book = await axios.get(`/api/bookOfTheMonth/${nowMonth}`);
      console.log(book.data);
      setTragetBook(book.data);
    };
    fetchData();
  }, []);

  return (
    <div id={style.BookOfTheMonth}>
      <h2>{nowMonth}월, 이 달의 추천 도서</h2>
      <img src={img} width="200px" height="250px"></img>
      <p>제목: {targetBook.title}</p>
      <p>저자: {targetBook.writer}</p>
      <p>{targetBook.paragraph}</p>
    </div>
  );
}

export default BookOfTheMonth;
