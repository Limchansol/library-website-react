import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../images/img1.png";
import style from "./BookOfTheMonth.module.css";

function BookOfTheMonth() {
  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  const [targetBook, setTargetBook] = useState({
    month: nowMonth,
    title: "",
    writer: "",
    paragraph: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const book = await axios.get(`/api/bookOfTheMonth/${nowMonth}`);
      console.log(book.data);
      setTargetBook(book.data);
    };
    fetchData();
  }, []);

  return (
    <div id={style.BookOfTheMonth}>
      <h2>{nowMonth}월, 이 달의 추천 도서</h2>
      <Link to="/materials/book-recommendation" state={{ book: targetBook }}>
        <img src={img} width="200px" height="250px"></img>
        <p>제목: {targetBook.title}</p>
        <p>저자: {targetBook.writer}</p>
        <p>{targetBook.paragraph}</p>
      </Link>
    </div>
  );
}

export default BookOfTheMonth;
