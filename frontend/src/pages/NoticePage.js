import { Link, useLocation, useParams } from "react-router-dom";
import "./NoticePage.css";

function NoticePage() {
  const notice = useLocation().state.notice;
  const { noticeId } = useParams();

  return (
    <>
      <h2>공지사항 페이지</h2>
      <div className="notice">
        <h3 className="notice-title">{notice.title}</h3>
        <p className="notice-info">
          <span className="date">{notice.createdAt}</span>
          <span className="writer">{notice.writer}</span>
        </p>
        <p className="notice-content">{notice.content}</p>
      </div>
      <Link to="/notices-and-communication/notice">
        <button className="back-to-notice-list">목록</button>
      </Link>
    </>
  );
}

export default NoticePage;
