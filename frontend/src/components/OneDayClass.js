import style from "./OneDayClass.module.css";

function OneDayClass() {
  return (
    <>
      <h1 className={style.title}>원데이 클래스</h1>
      <div id={style["oneday-class"]}>
        <p>
          <span>원데이 클래스</span>는 자신이 직접 무언가를 만들고 싶어하는
          이들을 위한
          <br />
          <span>북악하늘 작은도서관</span>의 상시 프로그램 중 하나입니다.
        </p>
        <div id="about" className={style.container}>
          <h2 className={style.subtitle}>북악하늘의 원데이 클래스는?</h2>
          <div className={style.content}>
            원데이 클래스는 하루에 일정 시간 동안 일회성으로 이루어지는
            수업입니다.
            <br />
            북악하늘 작은도서관에서는 한 달에 한 번, 테마를 정해 원데이 클래스가
            열립니다.
          </div>
        </div>
        <div id="hours" className={style.container}>
          <h2 className={style.subtitle}>원데이 클래스 일정</h2>
          <div className={style.content}>
            북악하늘 작은도서관의 원데이 클래스는 주로 <span>토요일</span>에
            진행됩니다.
          </div>
        </div>
        <div id="participate" className={style.container}>
          <h2 className={style.subtitle}>원데이 클래스 참여 방법</h2>
          <div className={style.content}>
            새로운 원데이 클래스가 열리기 전, 함께 즐거운 체험을 할 사람을 찾는
            글이 <b>알림</b>에 올라갑니다.
            <br />
            원데이 클래스에 참여하고 싶으시다면, 신청 기한에 맞추어 아래에 있는{" "}
            <b>신청하기</b> 버튼을 눌러주세요.
            <button className={style.apply} disabled>
              신청하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneDayClass;
