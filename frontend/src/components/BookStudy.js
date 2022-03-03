import style from "./BookStudy.module.css";

function BookStudy() {
  return (
    <div id={style.bookStudy}>
      <h1 className={style.title}>북스터디</h1>
      <div className={style.mainContents}>
        <p>
          <span>북스터디</span>는 청소년과 성인을 위한{" "}
          <span>북악하늘 작은도서관</span>의 상시 프로그램 중 하나입니다.
        </p>
        <div id="about" className={style.container}>
          <h2 className={style.subtitle}>북악하늘의 북스터디는?</h2>
          <div className={style.content}>
            북악하늘 작은도서관에서는 책 한 권을 선정하여 매주, 혹은 격주에 한
            번씩 북스터디를 합니다.
          </div>
        </div>
        <div id="hours" className={style.container}>
          <h2 className={style.subtitle}>북스터디 일정</h2>
          <div className={style.content}>
            북악하늘 작은도서관의 북스터디는 <span>격주 토요일</span>에
            진행됩니다.
            <br />
            현재는 『책제목』이라는 책으로 북스터디를 진행하고 있습니다.
          </div>
        </div>
        <div id="participate" className={style.container}>
          <h2 className={style.subtitle}>북스터디 참여 방법</h2>
          <div className={style.content}>
            새로운 북스터디가 시작되기 전, 함께 책을 읽을 사람을 찾는 글이{" "}
            <b>공지사항</b>에 올라갑니다.
            <br />
            북스터디에 참여하고 싶으시다면, 신청 기한에 맞추어 아래에 있는{" "}
            <b>신청하기</b> 버튼을 눌러주세요.
            <button className={style.apply}>신청하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookStudy;
