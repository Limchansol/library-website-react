import { useState } from "react";
import movie1Poster from "../images/img1.png";
import movie2Poster from "../images/img2.png";
import movie3Poster from "../images/img3.png";
import movie4Poster from "../images/img4.png";
import movie5Poster from "../images/img5.png";
import "./MovieSlide.css";

function MovieSlide({ movies }) {
  const movieCnt = movies.length;
  const [currIndex, setCurrIndex] = useState(1);
  const containerLocation = {
    transform: `translateY(${-260 * (currIndex - 1)}px)`,
  };

  const toPreviousMovie = () => {
    setCurrIndex((prev) => prev - 1);
  };
  const toNextMovie = () => {
    setCurrIndex((prev) => prev + 1);
  };

  const movie1Class = currIndex === 1 ? "movie current" : "movie";
  const movie2Class = currIndex === 2 ? "movie current" : "movie";
  const movie3Class = currIndex === 3 ? "movie current" : "movie";
  const movie4Class = currIndex === 4 ? "movie current" : "movie";
  const movie5Class = currIndex === 5 ? "movie current" : "movie";
  const movieProperty = [
    [movie1Class, movie1Poster],
    [movie2Class, movie2Poster],
    [movie3Class, movie3Poster],
    [movie4Class, movie4Poster],
    [movie5Class, movie5Poster],
  ];

  return (
    <div className="slide-screen">
      <div className="movie-container" style={containerLocation}>
        <div className="movie start">s</div>
        {movies.map((movie, i) => {
          return (
            <div className={movieProperty[i][0]} key={movie.number}>
              <img
                className="movie-poster"
                src={movieProperty[i][1]}
                alt={movie.title}
                width="200px"
              />
              <div className="movie-content">
                <span className="date">{movie.date}</span>
                <h4 className="movie-title">{movie.title}</h4>
                <p className="movie-info">
                  감독: {movie.director}
                  <br />
                  줄거리: {movie.storyLine}
                </p>
              </div>
            </div>
          );
        })}
        <div className="movie end">e</div>
      </div>
      {currIndex > 1 && (
        <button className="previous-btn" onClick={toPreviousMovie}>
          이전으로
        </button>
      )}
      {currIndex < movieCnt && (
        <button className="next-btn" onClick={toNextMovie}>
          이후로
        </button>
      )}
    </div>
  );
}

export default MovieSlide;
