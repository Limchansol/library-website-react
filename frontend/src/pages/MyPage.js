import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginBool, loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import Warn from "../components/Warn.js";
import style from "./MyPage.module.css";

function MyPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [userData, setUserData] = useState({});
  const [interestingBooks, setInterestingBooks] = useState([]);
  let alreadyFetched = false;

  useEffect(() => {
    const logInFetch = async () => {
      try {
        if (alreadyFetched) return;
        const loginRes = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token },
        });
        setUserData(loginRes.data);
        const bookRes = await axios.get("/api/books/searchID", {
          headers: {
            idarray: JSON.stringify(loginRes?.data?.interestingBooks),
          },
        });
        setInterestingBooks(bookRes.data);
        alreadyFetched = true;
      } catch (error) {
        console.log(error);
      }
    };
    logInFetch();
  }, [loginInfo]);

  return (
    <>
      {loginInfo ? (
        <>
          <div id={style.titleText}>
            <h1>마이페이지</h1>
          </div>
          <div id={style.container}>
            <div id={style.userInfo}>
              <h2>회원정보</h2>
              <p>이름: {userData.name}</p>
              <p>아이디: {userData.id}</p>
              <p>휴대전화: {userData.phone}</p>
              <p>이메일: {userData.email}</p>
              <p>
                생년월일: {userData.yyyy}-{userData.mm}-{userData.dd}
              </p>
            </div>
            <div id={style.rentalBooks}>
              <h2>대여 도서</h2>
              <table>
                <thead>
                  <tr>
                    <th>대여 날짜</th>
                    <th>책 제목</th>
                    <th>반납 기한</th>
                    <th>대여 상태</th>
                    <th>연장하기</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.borrowedBooks?.map?.((e) => {
                    const returnDay = new Date(
                      e.loanStartYYYY,
                      e.loanStartMM - 1,
                      e.loanStartDD + 15
                    );
                    const now = new Date();
                    return (
                      <tr>
                        <td>
                          {e.loanStartYYYY}-{e.loanStartMM}-{e.loanStartDD}
                        </td>
                        <td>{e.title}</td>
                        <td>
                          {returnDay.getFullYear()}-{returnDay.getMonth() + 1}-
                          {returnDay.getDate() - 1}
                        </td>
                        <td>{returnDay - now > 0 ? "정상 대여중" : "연체"}</td>
                        <td>
                          <button>연장하기</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div id={style.interestingBooks}>
              <h2>관심 도서</h2>
              <p>
                관심도서 목록에 추가한 책들이 책장에 보여집니다!
                <br />
                당신이 좋아하는 책, 관심 있는 책, 푹 빠져버린 책을 책장에 꽂아
                장식하세요!
              </p>
              <div id={style.bookShelf}>
                {interestingBooks?.map?.((e) => {
                  return (
                    <div key={e?._id} className={style.indBooks}>
                      <span className={style.indBooksText}>{e?.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Warn />
      )}
    </>
  );
}

export default MyPage;
