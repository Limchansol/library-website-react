import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import img from "../images/img1.png";
import style from "./BookOfThisMonthPage.module.css";

function BookOfThisMonthPage() {
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const sentBook = useLocation().state?.targetBook; // 홈 화면 이달의 책 링크 타고 넘어왔을 경우
  const [book, setBook] = useState({
    month: thisMonth,
    title: "책제목은 이것이다",
    writer: "라라라",
    paragraph:
      "머리가 아프다 왜 이러지 오늘 아침부터 수업듣고 학교 갔다와서 그런가 \n 오 머리아파 으으으으으으 코딩 어렵다 알고리즘 공부는 언제해 공부할게 너무 많네 으! 이거 여기서 줄바꿈 어떻게 해 왜 역슬래시n 안 먹지 왜왜 왜인가 왜 왜ㅐㅐㅐㅐ 검색해봐야 하나 ",
  });

  // useEffect(() => {
  //   if (sentBook) {
  //     setBook(sentBook);
  //   } else {
  //     const fetchBook = async () => {
  //       const bookRes = await axios.get(`/api/bookOfTheMonth/${thisMonth}`);
  //       setBook(bookRes.data);
  //       console.log(bookRes.data, "책");
  //     };
  //     fetchBook();
  //   }
  // }, []);

  return (
    <div id={style.bookRecommendation}>
      <h1 className={style.mainTitle}>이달의 추천 도서</h1>
      <div className={style.mainContents}>
        <img
          src={img}
          alt="이달의_추천_도서_이미지"
          className={style.bookImg}
          width="200px"
        />
        제목: {book.title}
        <br />
        <br />
        지은이: {book.writer}
        <br />
        <br />책 정보: {book.paragraph}
      </div>
    </div>
  );
}

export default BookOfThisMonthPage;
