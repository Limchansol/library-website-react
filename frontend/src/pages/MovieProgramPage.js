import axios from "axios";
import { useEffect, useState } from "react";
import MovieSlide from "../components/MovieSlide";
import style from "./MovieProgramPage.module.css";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom";
import { useNavigate } from "react-router-dom";

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
  const [moviePosters, setMoviePosters] = useState([]);
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [isAdmin, setIsAdmin] = useState(false);
  const [season, setSeason] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const nowYear = new Date().getFullYear();
      const season = await axios.get("/api/utils/movieSeason");
      const tempMovieInfo = await axios.get(
        `/api/movies/${nowYear}/${season.data.movieSeason}`
      );
      setProgramInfo(tempMovieInfo.data);
      try {
        let temp = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token?.access },
        });
        if (temp.data.message === "jwt expired") {
          const refreshData = await axios.get("/api/users/checkrefreshjwt", {
            headers: { token: loginInfo.token?.refresh },
          });
          setLoginInfo(refreshData.data);
          temp = await axios.get("/api/users/checkLogIn", {
            headers: { token: refreshData.data.token?.access },
          });
        }
        setIsAdmin(temp.data.isAdmin);
      } catch (error) {
        if (error.response.status === 401) {
          setLoginInfo("");
          sessionStorage.clear();
          alert("로그인이 만료되었습니다. 로그인 페이지로 이동합니다.");
          navigate("/logIn");
        }
      }
    };
    fetchData();
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setProgramInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleMovieArr(ind, name, value) {
    const tempMovie = [...programInfo.movies];
    const tempMovieObj = { ...tempMovie[ind], [name]: value };
    tempMovie[ind] = tempMovieObj;
    setProgramInfo((prev) => ({
      ...prev,
      movies: tempMovie,
    }));
  }

  function handleMoviePosters(posters) {
    setMoviePosters(posters);
  }

  function handleSeasonInput(e) {
    setSeason(e.target.value);
  }

  async function handleSubmit(e) {
    const posters = new FormData();
    moviePosters.forEach((e) => {
      posters.append("moviePosters", e);
    });
    await axios.put(
      `/api/moviePosters/update/${programInfo.year}/${programInfo.season}`,
      posters,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    await axios.put(
      `/api/movies/update/${programInfo.year}/${programInfo.season}`,
      programInfo
    );

    alert("영화 정보가 수정되었습니다.");
    window.location.reload();
    return;
  }

  async function handleSeasonSubmit(e) {
    await axios.put("/api/utils/updateMovieSeason", {
      movieSeason: season,
    });
    alert("영화 시즌이 변경되었습니다.");
    window.location.reload();
    return;
  }

  return (
    <>
      {isAdmin ? (
        <div className={style.pageContainer}>
          <div className={style.programContainer}>
            <h1 className={style.programTitle}>
              {
                <input
                  type="number"
                  name="year"
                  value={programInfo.year}
                  onChange={handleInput}
                  placeholder="년도"
                />
              }
              년 북악하늘 {"<"}영화로 세상 읽기{">"} 시즌
              {
                <input
                  type="number"
                  name="season"
                  value={programInfo.season}
                  onChange={handleInput}
                  placeholder="시즌"
                />
              }
            </h1>
            <p className={style.programInfo}>
              "영화로 세상 읽기" 프로그램 설명 쓰는 자리입니다.
              <br />
              <br />
              ※현재 관리자로 접속하셨습니다. 영화페이지 수정 탭으로 자동접속
              되었습니다.
              <br />
              <br />
              ※일반적인 영화로 세상읽기 페이지를 보시려면 로그아웃 후 다시
              들어와 주세요.
              <br />
              <br />
              ※ 주의사항 ※<br />
              <br />
              1. 반드시 <b>'모든'</b> 영화 이미지를 <b>'한번에' </b>
              넣어주세요. 그렇지 않으면 문제가 발생할 확률이 높습니다.
              <br />
              <br />
              2. 수정할 수 있는 내용을 입력창으로 만들었습니다. 추가하거나
              수정하고자 할때, 연도나 시즌을 반드시 확인하고 제출하여 주세요.
            </p>
          </div>
          <div className={style.seasonContainer}>
            <h2 className={style.seasonTheme}>
              "
              {
                <input
                  type="text"
                  name="theme"
                  value={programInfo.theme}
                  onChange={handleInput}
                  placeholder="테마"
                />
              }
              "
            </h2>
            <p className={style.seasonInfo}>
              {
                <textarea
                  cols="90"
                  rows="4"
                  type="text"
                  name="intro"
                  value={programInfo.intro}
                  onChange={handleInput}
                  placeholder="인트로"
                />
              }
            </p>
            <MovieSlide
              movies={programInfo.movies}
              handleMovieArr={handleMovieArr}
              isAdmin={isAdmin}
              handleMoviePosters={handleMoviePosters}
            />
          </div>
          <div className={style.submitBtns}>
            <button onClick={handleSubmit}>수정/ 추가하기</button>
            <div className={style.changeInput}>
              <label htmlFor="movieSeason">현재 시즌을 입력하세요</label>
              <input
                type="number"
                value={season}
                id="movieSeason"
                placeholder="현재 시즌"
                onChange={handleSeasonInput}
              />
            </div>
            <button onClick={handleSeasonSubmit}>시즌 변경하기</button>
          </div>
        </div>
      ) : (
        <div className={style.pageContainer}>
          <div className={style.programContainer}>
            <h1 className={style.programTitle}>
              {programInfo.year}년 북악하늘 {"<"}영화로 세상 읽기{">"} 시즌
              {programInfo.season}
            </h1>
            <p className={style.programInfo}>
              "영화로 세상 읽기" 프로그램 설명 쓰는 자리입니다.
            </p>
          </div>
          <div className={style.seasonContainer}>
            <h2 className={style.seasonTheme}>"{programInfo.theme}"</h2>
            <p className={style.seasonInfo}>{programInfo.intro}</p>
            <MovieSlide movies={programInfo.movies} isAdmin={false} />
          </div>
        </div>
      )}
    </>
  );
}

export default MovieProgramPage;
