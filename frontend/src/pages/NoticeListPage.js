import { Link } from "react-router-dom";
import "./NoticeListPage.css";

function NoticeListPage() {
  // 나중에는 서버에서 받아올 것
  const noticeList = [
    {
      id: "1",
      title: "2022년 영화로 세상 읽기 시즌1 시작합니다!",
      content:
        "2022년 영화로 세상 읽기 시즌1을 시작합니다. 이번 시즌 주제는 '선거'입니다. '영화로 세상읽기'는 누구나 참여할 수 있는 프로그램입니다. 화요일 저녁 7시 30분까지 북악하늘 작은도서관으로 오세요!",
      createdAt: "2022-02-22",
      writer: "chans",
    },
    {
      id: "2",
      title: "북악하늘 공지",
      content:
        "뭐라고 써야 할지 모르겠지만 아무튼 이것은 공지입니다. 쓸 내용이 없어서 고민입니다. 이 내용에서 줄바꿈을 하고 싶으면 어떻게 해야 하지. 아직도 갈 길이 멀다. 모르는게 이미 산더미인데 하면 할수록 내가 뭔가를 알고 있기는 한 건가 싶다. ㅠㅠㅠㅠㅠㅠㅠㅠ",
      createdAt: "2022-02-23",
      writer: "chans",
    },
  ];

  return (
    <>
      <h2 className="notice-list-page">공지사항 리스트 페이지</h2>
      <div className="notice-list">
        {noticeList.map((notice) => {
          return (
            <Link to={notice.id} key={notice.id} state={{ notice: notice }}>
              <div className="notice-item">
                <span className="number">{notice.id}</span>
                <span className="title">{notice.title}</span>
                <span className="writer">{notice.writer}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default NoticeListPage;
