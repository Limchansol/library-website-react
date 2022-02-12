import './GreetingsPage.css';

function GreetingsPage() {
  return (
    <div className="greetings">
      <p>
        <strong style={{ fontSize: '30px' }}>북악하늘</strong>은 정릉동 508단지를 중심으로 건강하고 온정 있는 지역사회 공동체를 만들어가자는 생각으로 생겨났습니다.
        <br /><br />
        현재 이곳(508단지)에는 상업시설뿐 아니라 사회복지와 문화적 시설이 거의 전무한 상태입니다. 서울 한복판에 있으면서도 도시적 이점을 누리지 못하며, 베드타운(bed town)의 역할만 감당할 뿐입니다. 때문에 하나님 나라의 복음 안에서 사회·문화적 필요를 충족하고 이웃과의 건전한 만남을 통해 활기찬 우리 동네가 만들어지기를 소망하는 마음으로 소통의 공간(場)인 카페형 작은도서관을 시작하였습니다.
        <br />
        <table className='meaning-table'>
          <caption>'북악하늘'의 의미</caption>
          <tr>
            <td>명칭</td>
            <td>사회적 의미</td>
            <td>기독교적 의미</td>
          </tr>
          <tr>
            <td className='category'>북(Book)</td>
            <td>악(樂, ark)</td>
            <td>하늘</td>
          </tr>
          <tr>
            <td className='category'>악(樂 ark)</td>
            <td>독서와 음악과 즐거움</td>
            <td>구원의 방주와 언약궤, 희락</td>
          </tr>
          <tr>
            <td className='category'>하늘</td>
            <td>하늘과 맞닿은 북악스카이웨이</td>
            <td>하나님의 나라</td>
          </tr>
          <tr>
            <td className='category'>문화공간 북악하늘</td>
            <td>각종 문화 활동과 커뮤니티를 통해
              지역사회의 문화 창달과
              삶의 질을 향상시킴
            </td>
            <td>문화를 통한 하나님 나라의 전파.
              건강한 기독교 문화의 토대 위에
              대안공동체로서의 역할을 감당
            </td>
          </tr>
          <tr>
            <td className='category'>북악하늘 교회</td>
            <td>열린 교회로서
              지역사회와 더불어 존재하며 삶을 공유함
            </td>
            <td>복음주의적인 하나님 말씀의 선포를 통해
              구원의 방주 역할을 담당하며
              삶속에서 성령의 열매(희락)를 맺음
            </td>
          </tr>
        </table>
      </p>
    </div>

  );
}

export default GreetingsPage;