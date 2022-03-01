import { Link, useLocation, useParams } from "react-router-dom";
import style from "./NoticePage.module.css";

function NoticePage() {
  const notice = useLocation().state.notice;
  const { noticeId } = useParams();

  return (
    <>
      <div className={style["notice"]}>
        <div className={style["notice-info"]}>
          <h2 className={style["notice-title"]}>{notice.title}</h2>
          <span className={style["date"]}>{notice.createdAt}</span>
          <span className={style["writer"]}>{notice.writer}</span>
        </div>
        <p className={style["notice-content"]}>{notice.content}</p>
      </div>
      <Link to="/notices-and-communication/notice">
        <button className={style["back-to-notice-list"]}>목록</button>
      </Link>
    </>
  );
}

export default NoticePage;
