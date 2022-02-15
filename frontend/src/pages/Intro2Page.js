import entrance from "../images/entrance.jpg";

function Intro2Page() {
  return (
    <>
      <h2>도서관 소개2</h2>
      <div id="contents">
        <div id="directions">
          <h3>오시는 길</h3>
          <img src={entrance} alt="bookarkhaneul_entrance" width="500px" />
          <div className="address">
            <h4>도로명주소</h4>
            <p>(02821) 서울특별시 성북구 북악하늘</p>
            <h4>지번주소</h4>
            <p>(02821) 서울특별시 성북구 북악하늘</p>
          </div>
          <div className="public-transportation">
            <h4>대중교통 이용 방법</h4>
            <p>
              지하철 4호선 성신여대역 6번출구 혹은 6호선 보문역 4번출구로
              나와서, 시내버스 1162를 타고 508 스카이 단지 내 '골드하우스'
              정류장에 내려주세요. <br />
              버스 반대 방향으로 30미터 오시면 북악하늘이 있습니다.
            </p>
          </div>
        </div>
        <div className="connect-number">
          <h4>연락처</h4>
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

export default Intro2Page;
