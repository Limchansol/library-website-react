import { Link, useLocation, useParams } from "react-router-dom";
import style from "./NoticePage.module.css";

function NoticePage() {
  const notice = useLocation().state.notice;
  const { noticeId } = useParams();

  return (
    <>
      <div className={style["notice"]}>
        <p className={style["notice-info"]}>
          <h3 className={style["notice-title"]}>{notice.title}</h3>
          <span className={style["date"]}>{notice.createdAt}</span>
          <span className={style["writer"]}>{notice.writer}</span>
        </p>
        <p className={style["notice-content"]}>{notice.content}</p>
      </div>
      <Link to="/notices-and-communication/notice">
        <button className={style["back-to-notice-list"]}>목록</button>
      </Link>
    </>
  );
}

export default NoticePage;
