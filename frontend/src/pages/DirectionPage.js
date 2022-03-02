import Map from "../components/Map";
import style from "./DirectionPage.module.css";

function DirectionPage() {
  return (
    <>
      <h1 id={style.title}>오시는 길</h1>
      <div id={style.contents}>
        <div id={style.directions}>
          <h2>상세 지도</h2>
          <Map />
          <div className={`${style.address} ${style.paragraph}`}>
            <h2>도로명주소</h2>
            <p>(02821) 서울특별시 성북구 북악하늘</p>
            <h2>지번주소</h2>
            <p>(02821) 서울특별시 성북구 북악하늘</p>
          </div>
          <div className={`${style.publicTransportation} ${style.paragraph}`}>
            <h2>대중교통 이용 방법</h2>
            <p>
              지하철 4호선 성신여대역 6번출구 혹은 6호선 보문역 4번출구로
              나와서, 시내버스 1162를 타고 508 스카이 단지 내 '골드하우스'
              정류장에 내려주세요. <br />
              버스 반대 방향으로 30미터 오시면 북악하늘이 있습니다.
            </p>
          </div>
        </div>
        <div className={`${style.connectNumber} ${style.paragraph}`}>
          <h2>연락처</h2>
          <p>
            북악하늘: 070-0000-0000
            <br />
            임명진 관장: 010-0000-0000
            <br />
            팩스: 02-000-0000
            <br />
            이메일: email@naver.com
            <br />
            블로그: www.blog.naver.com
          </p>
        </div>
      </div>
    </>
  );
}

export default DirectionPage;
