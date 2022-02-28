function BookStart() {
  return (
    <>
      <h2>북스타트</h2>
      <div>
        <p>
          <span>북스타트</span>는 아이들을 위한 <span>북악하늘 작은도서관</span>
          의 상시 프로그램 중 하나입니다.
        </p>
        <div className="about-bookStart container">
          <h4>북스타트란?</h4>
          <div>
            정릉동 508단지는 지역 특성상 아이들에게 그다지 좋은 환경이 아니기
            때문에 아이들이 많지 않습니다.
            <br />
            하지만 여전히 이곳에도 아이들이 있고, 이들을 위해 좋은 교육을 제공할
            수 있는 기회가 필요합니다.
            <br />
            <span>북스타트</span>는 아이들에게 그러한 기회를 제공하는
            프로그램입니다.
            <br />
            북스타트 전문 활동가 선생님과 같이하는 북스타트를 통해 부모님과
            아이들이 함께 여러 활동을 즐길 수 있습니다.
          </div>
        </div>
        <div className="bookStart-activity container">
          <h4>북스타트 활동</h4>
          <div>
            '북스타트'라는 이름에 걸맞게 친구들과 함께 책을 읽기도 하고, '물감
            찍기', '제기차기' 등 다양한 놀이를 즐기기도 합니다.
          </div>
        </div>
        <div className="bookStart-hours container">
          <h4>북스타트 활동 시간</h4>
          <div>
            북악하늘 작은도서관의 북스타트는{" "}
            <span>매월 셋째주 토요일 11시</span>에 진행됩니다.
            <br />* 현재는 코로나로 인해 잠정적으로 중단되었습니다.
          </div>
        </div>
        <br />
        <button>신청하기</button>
      </div>
    </>
  );
}

export default BookStart;
