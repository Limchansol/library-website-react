import "./GreetingsPage.css";

function GreetingsPage() {
  return (
    <div className="greetings">
      <p className="intro">
        <strong style={{ fontSize: "30px" }}>북악하늘</strong>은 정릉동
        508단지를 중심으로 건강하고 온정 있는 지역사회 공동체를 만들어가자는
        생각으로 생겨났습니다.
        <br />
        현재 이곳(508단지)에는 상업시설뿐 아니라 사회복지와 문화적 시설이 거의
        전무한 상태입니다. 서울 한복판에 있으면서도 도시적 이점을 누리지 못하며,
        베드타운(bed town)의 역할만 감당할 뿐입니다. 때문에 하나님 나라의 복음
        안에서 사회·문화적 필요를 충족하고 이웃과의 건전한 만남을 통해 활기찬
        우리 동네가 만들어지기를 소망하는 마음으로 소통의 공간(場)인 카페형
        작은도서관을 시작하였습니다.
      </p>
      <table className="meaning-table">
        <caption>'북악하늘'의 의미</caption>
        <thead>
          <tr>
            <td>명칭</td>
            <td>사회적 의미</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="category">북(Book)</td>
            <td>악(樂, ark)</td>
          </tr>
          <tr>
            <td className="category">악(樂 ark)</td>
            <td>독서와 음악과 즐거움</td>
          </tr>
          <tr>
            <td className="category">하늘</td>
            <td>하늘과 맞닿은 북악스카이웨이</td>
          </tr>
          <tr>
            <td className="category">문화공간 북악하늘</td>
            <td>
              각종 문화 활동과 커뮤니티를 통해 지역사회의 문화 창달과 삶의 질을
              향상시킴
            </td>
          </tr>
        </tbody>
      </table>
      <div className="purpose">
        <h2>북악하늘의 목적</h2>
        <ul>
          <li>
            한 잔의 차를 마시며 몸과 마음에 편안한 쉼을 제공하는 <b>공간</b>
          </li>
          <li>
            책을 읽고 마음껏 생각에 잠기며 상상의 나래를 펼치는 <b>공간</b>
          </li>
          <li>
            작은 문화행사와 인문학 콘서트를 통해 끊임없는 배움의 기쁨이 커가는
            <b>공간</b>
          </li>
          <li>
            지역주민들이 각자의 의견을 개진하며 소통하는 <b>공간</b>
          </li>
          <li>
            소그룹 모임을 통해 자신을 돌아보며 삶을 나누는 <b>공간</b>
          </li>
          <li>
            활발한 문화활동을 통해 자기계발을 도모하는 <b>공간</b>
          </li>
          <li>
            작은 소품들을 전시하며 소소한 기쁨을 이웃과 공유하는 <b>공간</b>
          </li>
          <li>
            영화를 보며 사회를 이해하고, 세상을 보는 안목을 넓히는 <b>공간</b>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GreetingsPage;
