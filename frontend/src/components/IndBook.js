import { useState } from "react";
import style from "./IndBook.module.css";

function IndBook({ book }) {
  const [zoom, setZoom] = useState(false);

  const toggleZoom = () => setZoom((prev) => (prev ? false : true));

  const removeIndBook = () => {
    const confirmRemove = window.confirm(
      `관심도서에서 『${book?.title}』을(를) 삭제하시겠습니까?`
    );
  };

  return (
    <div
      className={`${style.indBook} ${zoom ? style.zoom : ""}`}
      onClick={toggleZoom}
    >
      {!zoom ? (
        <h4 className={style.indBookPreview}>{book?.title}</h4>
      ) : (
        <div>
          <h5 className={style.indBookTitle}>{book?.title}</h5>
          <span>
            {book?.writer} <span className={style.bar}> | </span>「
            {book?.publisher}」
          </span>
          <button className={style.remove} onClick={removeIndBook}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default IndBook;
