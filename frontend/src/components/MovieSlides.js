import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "./MovieSlides.module.css";

function MovieSlides({ movies, handleMovieArr, isAdmin, handleMoviePosters }) {
  const movieCnt = movies?.length;
  const [currIndex, setCurrIndex] = useState(1);
  const screen = useRef();
  const [newPoster, setNewPoster] = useState(Array(5).fill(null));
  const [moviePosters, setMoviePosters] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const nowYear = new Date().getFullYear();
        const season = await axios.get("/api/utils/movieSeason", {
          cancelToken: source.token,
        });
        const posters = await axios.get(
          `/api/moviePosters/${nowYear}/${season.data.movieSeason}`,
          { cancelToken: source.token }
        );
        setMoviePosters(posters.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => source.cancel("페이지 이동으로 api요청이 취소되었습니다.");
  }, []);

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

  function handleInput(e) {
    const { ind } = e.target.dataset;
    const { name, value } = e.target;
    handleMovieArr(ind, name, value);
  }

  function handlePoster(e) {
    const {
      dataset: { ind },
      files,
    } = e.target;
    const temp = [...newPoster];
    temp[ind] = files[0];
    handleMoviePosters(temp);
    setNewPoster(temp);
  }

  return (
    <>
      {isAdmin ? (
        // 관리자 화면
        <div className={style.movieSlides} style={{ position: "relative" }}>
          <div
            className={style.slideScreen}
            onScroll={handleSlideScroll}
            ref={screen}
          >
            <div className={style.movieContainer}>
              <div className={`${style.movie} ${style.start}`}></div>
              {movies?.map?.((movie, i) => {
                return (
                  <div
                    className={
                      currIndex === i + 1
                        ? `${style.movie} ${style.current}`
                        : style.movie
                    }
                    key={movie.number}
                  >
                    <input
                      type="file"
                      data-ind={i}
                      accept="image/*"
                      onChange={handlePoster}
                    />
                    {newPoster[i] && (
                      <img
                        className={style.moviePoster}
                        src={URL.createObjectURL(newPoster[i])}
                        alt="이미지 미리보기"
                        width="200px"
                      />
                    )}

                    <div className={style.movieContent}>
                      <span className={style.date}>
                        {
                          <input
                            type="text"
                            name="date"
                            value={movie.date}
                            onChange={handleInput}
                            placeholder="날짜"
                            data-ind={i}
                          />
                        }
                      </span>
                      <h4 className={style.movieTitle}>
                        {
                          <input
                            type="text"
                            name="title"
                            value={movie.title}
                            onChange={handleInput}
                            placeholder="제목"
                            data-ind={i}
                          />
                        }
                      </h4>
                      <p className={style.movieInfo}>
                        감독:{" "}
                        {
                          <input
                            type="text"
                            name="director"
                            value={movie.director}
                            onChange={handleInput}
                            placeholder="감독"
                            data-ind={i}
                          />
                        }
                        <br />
                        줄거리:{" "}
                        {
                          <textarea
                            cols="45"
                            rows="4"
                            name="storyLine"
                            value={movie.storyLine}
                            onChange={handleInput}
                            placeholder="줄거리"
                            data-ind={i}
                          />
                        }
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
      ) : (
        // 일반 사용자 화면
        <div className={style.movieSlides} style={{ position: "relative" }}>
          <div
            className={style.slideScreen}
            onScroll={handleSlideScroll}
            ref={screen}
          >
            <div className={style.movieContainer}>
              <div className={`${style.movie} ${style.start}`}></div>
              {movies?.map?.((movie, i) => {
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
                      src={`data:${moviePosters[i]?.contentType};base64, ${moviePosters[i]?.data}`}
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
      )}
    </>
  );
}

export default MovieSlides;
