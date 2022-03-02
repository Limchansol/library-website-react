import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./NoticeListPage.module.css";
import axios from "axios";

function NoticeListPage() {
  // 나중에는 서버에서 받아올 것
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const notices = await axios.get("/api/notices");
      setNoticeList(notices.data);
    };
    fetchData();
  }, []);

  return (
    <div id="notice-list-page">
      <h1 className={style["page-title"]}>공지사항</h1>
      <div className={style["list-title"]}>
        <span className={style["number"]}>번호</span>
        <span className={style["title"]}>제목</span>
        <span className={style["writer"]}>작성자</span>
      </div>
      <div className={style["notice-list"]}>
        {noticeList
          ?.slice?.()
          ?.reverse?.()
          ?.map?.((notice) => {
            return (
              <Link to={notice?.id} key={notice?.id} state={{ notice: notice }}>
                <div className={style["notice-item"]}>
                  <span className={style["number"]}>{notice.id}</span>
                  <span className={style["title"]}>{notice.title}</span>
                  <span className={style["writer"]}>{notice.writer}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default NoticeListPage;
