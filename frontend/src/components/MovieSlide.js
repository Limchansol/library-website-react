import movie1 from "../images/img1.png";
import movie2 from "../images/img2.png";
import movie3 from "../images/img3.png";
import movie4 from "../images/img4.png";
import movie5 from "../images/img5.png";
import "./MovieSlide.css";

function MovieSlide({ movies }) {
  console.log(movies);
  return (
    <>
      <div className="movie-container">
        <div className="movie">
          <img
            className="movie-poster"
            src={movie1}
            alt="대통령의_연인_포스터"
            width="200px"
          />
          <div className="movie-content">
            <span className="date">{movies[0].date}</span>
            <h4 className="movie-title">{movies[0].title}</h4>
            <p className="movie-info">
              감독: {movies[0].director}
              <br />
              줄거리: {movies[0].storyLine}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieSlide;
