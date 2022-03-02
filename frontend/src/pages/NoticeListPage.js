import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./NoticeListPage.module.css";
import { useRecoilState } from "recoil";
import axios from "axios";
import { loginUserInfo } from "../Atoms/LoginAtom";

function NoticeListPage() {
  // 나중에는 서버에서 받아올 것
  const [noticeList, setNoticeList] = useState([]);
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [isAdmin, setIsAdmin] = useState(false);
  const [removeNumber, setRemoveNumber] = useState("0");

  const [newNotice, setNewNotice] = useState({
    id: "3",
    title: "",
    content: "",
    writer: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const notices = await axios.get("/api/notices");
      setNoticeList(notices.data);
      const loginRes = await axios.get("/api/users/checkLogIn", {
        headers: { token: loginInfo.token },
      });
      setIsAdmin(loginRes?.data?.isAdmin);
      setNewNotice((prev) => ({
        ...prev,
        writer: loginRes?.data?.name,
      }));
    };
    fetchData();
  }, []);

  function handleNewNotice(e) {
    const { name, value } = e.target;
    setNewNotice((prev) => ({
      ...prev,
      [name]: value,
      createdAt: new Date(),
      id: noticeList.length + 1,
    }));
  }

  function handleRemoveNumber(e) {
    const { value } = e.target;
    setRemoveNumber(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isAdmin) return;
    await axios.post("/api/notices/addNotice", newNotice);
  }

  async function handleRemoveSubmit(e) {
    e.preventDefault();
    if (!isAdmin) return;
    await axios.delete(`/api/notices/removeNotice/${removeNumber}`);
  }

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
      {isAdmin ? (
        <div id={style.noticeForAdmin}>
          <div id={style.newNotice}>
            <form id={style.newNoticeForm} onSubmit={handleSubmit}>
              <div id={style.titleBox}>
                <label htmlFor="title">제목</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newNotice.title}
                  onChange={handleNewNotice}
                  placeholder="제목을 적어주세요."
                />
              </div>
              <textarea
                name="content"
                id="content"
                cols="80"
                rows="15"
                value={newNotice.content}
                onChange={handleNewNotice}
                placeholder="공지사항을 적어주세요."
              ></textarea>
              <button className={style.newNoticeBtn}>공지 등록</button>
            </form>
          </div>

          <div id={style.removeNotice}>
            <form id={style.removeNoticeForm} onSubmit={handleRemoveSubmit}>
              <label htmlFor="removeNum">삭제할 공지</label>
              <input
                type="text"
                name="removeNum"
                id="removeNum"
                value={removeNumber}
                onChange={handleRemoveNumber}
                placeholder="삭제할 공지의 번호를 적어주세요."
              />
              <button className={style.removeNoticeBtn}>공지 삭제</button>
            </form>
          </div>
        </div>
      ) : undefined}
    </div>
  );
}

export default NoticeListPage;
