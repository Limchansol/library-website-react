import { useRef, useState } from "react";
import movie1Poster from "../images/img1.png";
import movie2Poster from "../images/img2.png";
import movie3Poster from "../images/img3.png";
import movie4Poster from "../images/img4.png";
import movie5Poster from "../images/img5.png";
import style from "./MovieSlide.module.css";

function MovieSlide({ movies }) {
  const movieCnt = movies.length;
  const [currIndex, setCurrIndex] = useState(1);
  const screen = useRef();
  const moviePosters = [
    movie1Poster,
    movie2Poster,
    movie3Poster,
    movie4Poster,
    movie5Poster,
  ];

  const handleSlideScroll = () => {
    // 포지션이 현재 .movie 세로길이 1.5배 이상 되면 다음 .movie로 넘어감
    const scrollPosition = screen.current.scrollTop;
    if (scrollPosition < 130) {
      setCurrIndex(1);
      return;
    }
    if (scrollPosition < 260 + 130) {
      setCurrIndex(2);
      return;
    }
    if (scrollPosition < 260 * 2 + 130) {
      setCurrIndex(3);
      return;
    }
    if (scrollPosition < 260 * 3 + 130) {
      setCurrIndex(4);
      return;
    }
    setCurrIndex(5);
  };

  // 1번 영화 scrollTop = 0
  const toPreviousMovie = () => {
    setCurrIndex((prev) => prev - 1);
    screen.current.scrollTop = 260 * (currIndex - 2);
  };
  const toNextMovie = () => {
    setCurrIndex((prev) => prev + 1);
    screen.current.scrollTop = 260 * currIndex;
  };

  return (
    <div className={style.movieSlides} style={{ position: "relative" }}>
      <div
        className={style.slideScreen}
        onScroll={handleSlideScroll}
        ref={screen}
      >
        <div className={style.movieContainer}>
          <div className={`${style.movie} ${style.start}`}></div>
          {movies.map((movie, i) => {
            return (
              <div
                className={
                  currIndex === i + 1
                    ? `${style.movie} ${style.current}`
                    : style.movie
                }
                key={movie.number}
              >
                <img
                  className={style.moviePoster}
                  src={moviePosters[i]}
                  alt={movie.title}
                  width="200px"
                />
                <div className={style.movieContent}>
                  <span className={style.date}>{movie.date}</span>
                  <h4 className={style.movieTitle}>{movie.title}</h4>
                  <p className={style.movieInfo}>
                    감독: {movie.director}
                    <br />
                    줄거리: {movie.storyLine}
                  </p>
                </div>
              </div>
            );
          })}
          <div className={`${style.movie} ${style.end}`}></div>
        </div>
      </div>
      {currIndex > 1 && (
        <button className={style.previousBtn} onClick={toPreviousMovie}>
          이전으로
        </button>
      )}
      {currIndex < movieCnt && (
        <button className={style.nextBtn} onClick={toNextMovie}>
          이후로
        </button>
      )}
    </div>
  );
}

export default MovieSlide;
