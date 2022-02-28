import { useState } from "react";
import BookStart from "../components/BookStart";
import BookStudy from "../components/BookStudy";
import style from "./BookProgramPage.module.css";

function BookProgramPage() {
  const [bookProgram, setBookProgram] = useState("bookStudy");

  const handleBookStudyClick = () => setBookProgram("bookStudy");
  const handleBookStartClick = () => setBookProgram("bookStart");

  const bookStudyTitleClass = bookProgram === "bookStudy" ? "is-active" : "";
  const bookStartTitleClass = bookProgram === "bookStart" ? "is-active" : "";

  return (
    <div className={style["book-programs"]}>
      <div className={style.titles}>
        <ul>
          <li
            className={`${style.title} ${style[bookStudyTitleClass]}`}
            onClick={handleBookStudyClick}
          >
            북스터디
          </li>
          <li
            className={`${style.title} ${style[bookStartTitleClass]}`}
            onClick={handleBookStartClick}
          >
            북스타트
          </li>
        </ul>
      </div>
      {bookProgram === "bookStudy" && <BookStudy />}
      {bookProgram === "bookStart" && <BookStart />}
    </div>
  );
}

export default BookProgramPage;
