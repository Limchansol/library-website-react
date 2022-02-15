function Rule1Page() {
  return (
    <>
      <h2>도서관 이용 안내</h2>
      <div id="contents">
        <div id="service-users" className="container">
          <h3>이용 대상</h3>
          <ul>
            <li>자료 열람을 원하는 누구나 이용 가능합니다.</li>
            <li>
              단, 대출/예약 등 일부 서비스는 북악하늘 작은도서관 회원만 이용
              가능합니다.
            </li>
          </ul>
        </div>
        <div id="service-hours" className="container">
          <h3>이용 시간</h3>
          <p>
            이용 시간은 조금씩 변동될 수 있으며, <br /> 문의 시 협의 하에 이용
            시간 일시적으로 변동 가능합니다.
          </p>
          <table>
            <tr>
              <td></td>
              <td>하절기(4월 ~ 10월)</td>
              <td>동절기(11월 ~3월)</td>
            </tr>
            <tr>
              <td>여는 시간</td>
              <td>오전 11:30</td>
              <td>오후 12:30</td>
            </tr>
            <tr>
              <td>닫는 시간</td>
              <td>오후 21:00</td>
              <td>오후 20:00</td>
            </tr>
          </table>
        </div>
        <div id="closed-day">
          <h3>휴관일</h3>
          <ul>
            <li>매주 월요일과 일요일</li>
            <li>법정 공휴일</li>
            <li>기타 관장이 필요하다고 인정하는 날 미리 공지 후 휴관</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Rule1Page;
