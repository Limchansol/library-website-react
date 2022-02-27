import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginBool, loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import Warn from "../components/Warn.js";
import "./MyPage.css";

function MyPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [userData, setUserData] = useState({});
  let alreadyFetched = false;

  useEffect(() => {
    const logInFetch = async () => {
      try {
        if (alreadyFetched) return;
        const loginRes = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token },
        });
        setUserData(loginRes.data);
        alreadyFetched = true;
      } catch (error) {
        console.log(error);
      }
      console.log(loginInfo);
    };
    logInFetch();
  }, [loginInfo]);
  return (
    <>
      {loginInfo ? (
        <>
          <div id="userInfo">
            <h1>회원정보</h1>
            <p>이름: {userData.name}</p>
            <p>아이디: {userData.id}</p>
            <p>휴대전화: {userData.phone}</p>
            <p>이메일: {userData.email}</p>
            <p>
              생년월일: {userData.yyyy}-{userData.mm}-{userData.dd}
            </p>
          </div>
          <div id="rentalBooks">
            <h1>대여 도서</h1>
            <table>
              <tr>
                <th>대여 날짜</th>
                <th>책 제목</th>
                <th>반납 기한</th>
                <th>대여 상태</th>
                <th>연장하기</th>
              </tr>
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
              <tr></tr>
            </table>
          </div>
          <div id="interestingBooks">
            <h1>관심 도서</h1>
            <p>
              추후에 수정하세요. 지금은 당장 관심도서 아이디만 보여주겠습니다.
            </p>
            {userData?.interestingBooks?.map((e) => {
              return <p>{e}</p>;
            })}
          </div>
        </>
      ) : (
        <Warn />
      )}
    </>
  );
}

export default MyPage;
