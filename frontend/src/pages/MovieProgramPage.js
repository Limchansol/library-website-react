import axios from "axios";
import { useEffect, useState } from "react";
import MovieSlide from "../components/MovieSlide";
import style from "./MovieProgramPage.module.css";

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
    <div className={style.pageContainer}>
      <div className={style.programContainer}>
        <h2 className={style.programTitle}>
          {programInfo.year}년 북악하늘 {"<"}영화로 세상 읽기{">"} 시즌
          {programInfo.season}
        </h2>
        <p className={style.programInfo}>
          "영화로 세상 읽기" 프로그램 설명 쓰는 자리입니다.
        </p>
      </div>
      <div className={style.seasonContainer}>
        <h2 className={style.seasonTheme}>"{programInfo.theme}"</h2>
        <p className={style.seasonInfo}>{programInfo.intro}</p>
        <MovieSlide movies={programInfo.movies} />
      </div>
    </div>
  );
}

export default MovieProgramPage;
