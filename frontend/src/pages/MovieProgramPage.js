import axios from "axios";
import { useEffect, useState } from "react";
import MovieSlide from "../components/MovieSlide";

function MovieProgramPage() {
  const [programInfo, setProgramInfo] = useState({
    year: 0,
    season: 0,
    theme: "",
    intro: "",
    movies: [
      {
        number: 1,
        title: "",
        director: "",
        date: "",
        storyLine: "",
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      const tempMovieInfo = await axios.get("/api/movies");
      console.log(tempMovieInfo);
      setProgramInfo(tempMovieInfo.data[0]); //받아온 데이터의 첫번째에 시즌에 관한 정보가 들어있다. 추후 수정하기
    };
    fetchData();
  }, []);
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
