import { useState } from "react";
import BookStart from "../components/BookStart";
import BookStudy from "../components/BookStudy";
import "./BookProgramPage.css";

function BookProgramPage() {
  const [bookProgram, setBookProgram] = useState("bookStudy");

  const handleBookStudyClick = () => setBookProgram("bookStudy");
  const handleBookStartClick = () => setBookProgram("bookStart");

  const bookStudyTitleClass =
    bookProgram === "bookStudy"
      ? "book-program-title is-active"
      : "book-program-title";
  const bookStartTitleClass =
    bookProgram === "bookStart"
      ? "book-program-title is-active"
      : "book-program-title";

  return (
    <div className="book-programs">
      <div className="titles">
        <ul>
          <li className={bookStudyTitleClass} onClick={handleBookStudyClick}>
            북스터디
          </li>
          <li className={bookStartTitleClass} onClick={handleBookStartClick}>
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
