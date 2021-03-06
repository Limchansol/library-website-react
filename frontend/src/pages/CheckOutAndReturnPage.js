import style from "./CheckOutAndReturnPage.module.css";

function CheckOutAndReturnPage() {
  return (
    <>
      <h1 id={style.title}>도서 대여/반납/예약/연장 안내</h1>
      <p id={style.titlePara}>
        대여와 반납은 북악하늘 작은도서관에 직접 오셔야 가능하며, 예약은
        북악하늘 작은도서관 웹사이트에서 할 수 있습니다. <br />
        대여 기간 연장은 온라인과 오프라인 모두에서 가능합니다.
      </p>
      <div className={style.contents}>
        <div className={`${style.checkout} ${style.container}`}>
          <h2>대여</h2>
          <p>북악하늘 작은도서관 현장에서 가능합니다.</p>
          <ul>
            <li>대여: 도서관 회원만 대여 가능합니다.</li>
            <li>대여 권수: 1인당 한 번에 최대 5권까지 가능합니다.</li>
            <li>
              대여 기간: 2주 동안 대여할 수 있으며, 해당 도서를 예약한 사람이
              없는 경우 대여 기간을 1주일 연장할 수 있습니다.
            </li>
          </ul>
        </div>
        <div className={`${style.return} ${style.container}`}>
          <h2>반납</h2>
          <p>북악하늘 작은도서관 현장에서 가능합니다.</p>
          <ul>
            <li>
              반납: 도서관 운영시간 중에 북악하늘 작은도서관에 오시면 반납이
              가능합니다. 반납 후에는 북악하늘 작은도서관 웹사이트의 '나의
              공간'에서 '대여 도서 상태'를 확인해주시기 바랍니다.
            </li>
            <li>연체: 반납 기한을 넘긴다면 연체 일수만큼 대여가 정지됩니다.</li>
            <li>
              분실/훼손: 대여한 도서를 분실하거나 훼손했을 시에는 동일한 도서로
              배상해주셔야 합니다.
            </li>
          </ul>
        </div>
        <div className={`${style.reservation} ${style.container}`}>
          <h2>예약</h2>
          <p>북악하늘 작은도서관 웹사이트에서 가능합니다.</p>
          <ul>
            <li>
              예약: 본인이 대여하고자 하는 도서가 이미 대여 중인 경우, 해당
              도서를 예약한다면 도서가 반납되었을 시 우선적으로 대여할 수
              있습니다. 도서가 반납된다면 회원정보에 기재된 전화번호로 문자를
              드립니다.
            </li>
            <li>
              예약 취소: 북악하늘 작은도서관 웹사이트의 '나의 공간'에서 언제든지
              가능합니다.
            </li>
            <li>
              예약 유지 기간: 이미 대여 중인 예약 도서의 반납일로부터 3일 안에
              도서를 대여해야 합니다. 3일이 지난다면 도서 예약이 자동으로
              취소됩니다.
            </li>
          </ul>
        </div>
        <div className={`${style.extension} ${style.container}`}>
          <h2>연장</h2>
          <p>북악하늘 작은도서관 현장과 웹사이트 모두에서 가능합니다.</p>
          <ul>
            <li>
              연장: 해당 도서를 예약한 사람이 없다면, 대여한 도서의 반납 기한이
              지나기 전에 대여 기간을 1주 연장할 수 있습니다.
            </li>
            <li>연장 가능 횟수: 연장은 한 권당 한 번씩만 가능합니다.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CheckOutAndReturnPage;
