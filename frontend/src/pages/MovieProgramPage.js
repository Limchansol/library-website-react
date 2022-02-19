import MovieSlide from "../components/MovieSlide";

function MovieProgramPage() {
  const programInfo = {
    year: 2022,
    season: 1,
    theme: "국민의 주권, 선거 그리고 민주주의",
    intro:
      "선거는 국민이 참여하는 민주주의의 근간이자 핵심입니다. 유권자는 가장 올바르고 적당한 인물을 선출할 권리와 의무를 갖습니다. 그렇다면 우리는 어떤 기준과 어떤 가치관으로 정치를 보고, 어떻게 선거에 참여해야 할까요? 영화와 함께 생각해봅시다.",
    movies: [
      {
        number: 1,
        title: "대통령의 연인 (The American President, 1995)",
        director: "롭 라이너",
        date: "1월 11일(화)",
        storyLine:
          "1영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
      {
        number: 2,
        title: "불워스 (Bulworth, 1998)",
        director: "워렌 비티",
        date: "1월 18일(화)",
        storyLine:
          "2영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
      {
        number: 3,
        title: "스윙 보트 (Swing Vote, 2008)",
        director: "조슈아 마이클 스턴",
        date: "1월 25일(화)",
        storyLine:
          "3영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
      {
        number: 4,
        title: "킹메이커 (The Ides of March, 2011)",
        director: "조지 클루니",
        date: "2월 8일(화)",
        storyLine:
          "4영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
      {
        number: 5,
        title: "선거 캠페인 (The Campaign, 2011)",
        director: "제이 로치",
        date: "2월 15일(화)",
        storyLine:
          "5영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
    ],
  };

  return (
    <div className="page-container">
      <div className="program-container">
        <h3 className="program-title">
          {programInfo.year}년 북악하늘 {"<"}영화로 세상 읽기{">"} 시즌
          {programInfo.season}
        </h3>
        <p className="program-info">
          "영화로 세상 읽기" 프로그램 설명 쓰는 자리입니다.
        </p>
      </div>
      <div className="season-container">
        <h2 className="season-theme">"{programInfo.theme}"</h2>
        <p className="season-info">{programInfo.intro}</p>
        <MovieSlide movies={programInfo.movies} />
      </div>
    </div>
  );
}

export default MovieProgramPage;
