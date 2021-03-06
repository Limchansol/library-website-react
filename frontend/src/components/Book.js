import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import style from "./Book.module.css";
import BookRentalBtn from "./BookRentalBtn.js";

function checkLogin(loginInfo, navigate) {
  if (!loginInfo) {
    const confirmMoveToLogin = window.confirm(
      "로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?"
    );
    if (!confirmMoveToLogin) return false;
    return navigate("/logIn");
  }
  return true;
}

function moveToMyPage(message, navigate) {
  const confirmMoveToMyPage = window.confirm(
    `${message} '나의 공간'으로 이동하시겠습니까?`
  );
  if (!confirmMoveToMyPage) return;
  return navigate("/myPage");
}

function Book({ book, index }) {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [bookState, setBookstate] = useState("대여 가능");
  const navigate = useNavigate();

  // 리렌더링이 너무 많이 일어남 왜지?

  useEffect(() => {
    if (book.state === "none") {
      setBookstate("대여 가능");
    } else if (book.state === "rental") {
      setBookstate("대여 중 / 예약 가능");
    } else if (book.state === "reservation") {
      setBookstate("대여 중 / 예약 중");
    } else if (book.state === "ready") {
      setBookstate("예약 중");
    } else {
      setBookstate(book.state);
      console.log("도서 상태가 정상적으로 처리되지 않았습니다.");
    }
  }, [book.state]);

  const onClickReservation = async () => {
    if (!checkLogin(loginInfo, navigate)) return;

    const confirmReservation = window.confirm(
      `『${book.title}』을 예약하시겠습니까?\n\n예약하신 도서는 도서 반납 알림 문자 수신일로부터 3일 내에 대여해야 하며, 3일 이후에는 예약이 자동으로 취소됩니다.`
    );
    if (!confirmReservation) return;

    // 이곳에 예약 코드 작성
    try {
      let loginRes = await axios.put(
        "/api/users/bookstateUpdate",
        {
          reservedBooks: book._id,
        },
        {
          headers: { token: loginInfo.token?.access },
        }
      );
      if (loginRes.data.message === "jwt expired") {
        const refreshData = await axios.get("/api/users/checkrefreshjwt", {
          headers: { token: loginInfo.token?.refresh },
        });
        setLoginInfo(refreshData.data);
        await axios.put(
          "/api/users/bookstateUpdate",
          {
            reservedBooks: book._id,
          },
          {
            headers: { token: refreshData.data.token?.access },
          }
        );
      }
      await axios.put("/api/books/bookstateUpdate", {
        _id: book._id,
        changeTo: "reservation",
      });
      moveToMyPage(`『${book.title}』 예약이 완료되었습니다.`, navigate);
      window.location.reload();
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  const onClickSaveInterest = async () => {
    if (!checkLogin(loginInfo, navigate)) return;

    // 이곳에 관심 도서 담기 코드 작성
    try {
      let loginRes = await axios.put(
        "/api/users/interestingBookUpdate",
        {
          interestingBooks: book._id,
        },
        { headers: { token: loginInfo.token?.access } }
      );
      if (loginRes.data.message === "jwt expired") {
        const refreshData = await axios.get("/api/users/checkrefreshjwt", {
          headers: { token: loginInfo.token?.refresh },
        });
        setLoginInfo(refreshData.data);
        await axios.put(
          "/api/users/interestingBookUpdate",
          {
            interestingBooks: book._id,
          },
          { headers: { token: refreshData.data.token?.access } }
        );
      }
      moveToMyPage(`『${book.title}』을 관심 도서에 담았습니다.`, navigate);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  const bookStateControl = () => {
    navigate("/administrator", { state: { rentalBook: book } });
  };

  // titleText 정렬이 잘 안됨. 제목이 길어져서 두 줄을 넘기게 되면 '도서' 글자가 두 줄이 되어버림. 이유를 못 찾았음.
  return (
    <div className={style.book}>
      <h3 className={style.titleText}>
        <span className={style.index}>{index}.</span>
        <span className={style.type}>도서</span>
        <span className={style.title}>{book.title}</span>
      </h3>
      <p className={style.info}>
        <span>{book.writer}</span>
        <b>|</b>
        <span>「{book.publisher}」</span>
        <b>|</b>
        <span className={`${style.bookState} ${style[book.state]}`}>
          {bookState}
        </span>
      </p>
      <div className={style.btnContainer}>
        <button disabled={book.state !== "rental"} onClick={onClickReservation}>
          대여 예약하기
        </button>
        <button onClick={onClickSaveInterest}>관심 도서 담기</button>
        <BookRentalBtn
          bookStateControl={bookStateControl}
          bookRentalState={book.state}
        />
      </div>
    </div>
  );
}

export default Book;
