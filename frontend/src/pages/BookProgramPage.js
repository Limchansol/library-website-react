import { useState } from "react";
import "./BookProgramPage.css";

function BookProgramPage() {
  const [bookProgram, setBookProgram] = useState("bookStudy");

  return (
    <div className="book-programs">
      <div className="titles">
        <ul>
          <li>북스터디</li>
          <li>북스타트</li>
        </ul>
      </div>
      {bookProgram === "bookStudy" ? <div>북스터디</div> : <></>}
      {bookProgram === "bookStart" ? <div>북스타트</div> : <></>}
    </div>
  );
}

export default BookProgramPage;
