import style from "./BookStart.module.css";

function BookStart() {
  return (
    <>
      <h2 className={style.title}>북스타트</h2>
      <div className={style.bookStart}>
        <p>
          <span>북스타트</span>는 아이들을 위한 <span>북악하늘 작은도서관</span>
          의 상시 프로그램 중 하나입니다.
        </p>
        <div id="about" className={style.container}>
          <h3 className={style.subtitle}>북스타트란?</h3>
          <div className={style.content}>
            정릉동 508단지는 지역 특성상 아이들에게 그다지 좋은 환경이 아니기
            때문에 아이들이 많지 않습니다.
            <br />
            하지만 여전히 이곳에도 아이들이 있고, 이들을 위해 좋은 교육을 제공할
            수 있는 기회가 필요합니다.
            <br />
            <span>북스타트</span>는 지역과 성북구청, 성북문화재단이 함께 펼치는
            지역사회 문화 운동이자 사회적 육아 지원 프로그램으로, 아이들이 책과
            놀이 활동을 할 기회를 제공합니다.
            <br />
            북스타트 활동가 선생님과 같이하는 북스타트를 통해 부모님과 아이들이
            함께 여러 활동을 즐길 수 있습니다.
          </div>
        </div>
        <div id="activity" className={style.container}>
          <h3 className={style.subtitle}>북스타트 활동</h3>
          <div className={style.content}>
            '북스타트'라는 이름에 걸맞게 친구들과 함께 책을 읽기도 하고, '물감
            찍기', '제기차기' 등 다양한 놀이를 즐기기도 합니다.
          </div>
        </div>
        <div id="hours" className={style.container}>
          <h3 className={style.subtitle}>북스타트 활동 시간</h3>
          <div className={style.content}>
            북악하늘 작은도서관의 북스타트는{" "}
            <span>매월 셋째주 토요일 11시</span>에 진행됩니다.
            <br />* 현재는 코로나로 인해 잠정적으로 중단되었습니다.
          </div>
        </div>
        <div id="participate" className={style.container}>
          <h3 className={style.subtitle}>북스타트 참여 방법</h3>
          <div className={style.content}>
            새로운 북스타트가 시작되기 전, 함께 참여할 아이들을 찾는 글이{" "}
            <b>공지사항</b>에 올라갑니다.
            <br />
            북스타트에 참여하고 싶으시다면, 신청 기한에 맞추어 아래에 있는{" "}
            <b>신청하기</b> 버튼을 눌러주세요.
            <button className={style.apply}>신청하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookStart;
