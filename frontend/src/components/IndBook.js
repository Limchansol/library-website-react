import style from "./IndBook.module.css";

function IndBook({ book, setZoomBook }) {
  return (
    <div className={style.indBook} onClick={() => setZoomBook(book)}>
      <h4 className={style.indBookTitle}>{book?.title}</h4>
    </div>
  );
}

export default IndBook;
