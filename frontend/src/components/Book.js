import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";

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

function Book({ book }) {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [bookState, setBookstate] = useState("대여 가능");
  const navigate = useNavigate();

  // 리렌더링이 너무 많이 일어남 왜지?

  useEffect(() => {
    if (book.state === "none") {
      setBookstate("대여 가능");
    } else if (book.state === "rental") {
      setBookstate("대여 중");
    } else if (book.state === "reservation") {
      setBookstate("예약 중");
    } else {
      setBookstate(book.state);
    }
  }, []);

  const onClickReservation = () => {
    if (!checkLogin(loginInfo, navigate)) return;

    const confirmReservation = window.confirm(
      `『${book.title}』을 예약하시겠습니까?\n\n예약하신 도서는 도서 반납 알림 문자 수신일로부터 3일 내에 대여해야 하며, 3일 이후에는 예약이 자동으로 취소됩니다.`
    );
    if (!confirmReservation) return;

    // 이곳에 예약 코드 작성

    moveToMyPage(`『${book.title}』 예약이 완료되었습니다.`, navigate);
  };

  const onClickSaveInterest = () => {
    if (!checkLogin(loginInfo, navigate)) return;

    // 이곳에 관심 도서 담기 코드 작성

    moveToMyPage(`『${book.title}』을 관심 도서에 담았습니다.`);
  };

  console.log(bookState);

  return (
    <div className="book">
      <h3>책 제목: {book.title}</h3>
      <p>글쓴이: {book.writer}</p>
      <p>출판사: {book.publisher}</p>
      <p>
        대여 상태: <span>{bookState}</span>
        <button disabled={bookState !== "대여 중"} onClick={onClickReservation}>
          대여 예약하기
        </button>
        <button onClick={onClickSaveInterest}>관심 도서 담기</button>
      </p>
    </div>
  );
}

export default Book;
