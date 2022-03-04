import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import Warn from "../components/Warn.js";
import style from "./MyPage.module.css";

function MyPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [userData, setUserData] = useState({});
  const [interestingBooks, setInterestingBooks] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [changeMode, setChangeMode] = useState(false);
  const [changedInfo, setChangedInfo] = useState(userData);
  let alreadyFetched = false;
  console.log(userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (alreadyFetched) return;
        const loginRes = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token },
        });
        setUserData(loginRes.data);
        setChangedInfo(loginRes.data);
        const bookRes = await axios.get("/api/books/searchID", {
          headers: {
            idarray: JSON.stringify(loginRes?.data?.interestingBooks),
          },
        });
        setInterestingBooks(bookRes.data);
        const inquiryRes = await axios.get(
          `/api/inquiries/${loginRes?.data?._id}`
        );
        setInquiries(inquiryRes.data);
        alreadyFetched = true;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [loginInfo]);

  // 올바른 형식인지 확인하는 함수 따로 필요
  // 인풋값 동기화
  const inputUserInfoChange = (e) => {
    const { name, value } = e.target;
    setChangedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 수정 완료
  const completetUserInfoChange = async () => {
    try {
      await axios.put("/api/users/userUpdate", {
        token: loginInfo.token,
        ...changedInfo,
      });
      alert("회원정보 수정이 완료되었습니다.");
    } catch (error) {
      console.log("마이페이지 정보 수정 에러", error);
    } finally {
      setChangeMode(false);
      window.location.reload();
    }
  };

  // 수정 취소
  const cancelUserInfoChage = () => {
    const confirmCancel = window.confirm("수정을 취소하시겠습니까?");
    if (!confirmCancel) return;
    setChangedInfo(userData);
    setChangeMode(false);
  };

  // 회원 탈퇴
  const secedeMembership = async () => {
    const confirmSecession = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirmSecession) return;
    let confirmAgain = prompt("사용자 아이디를 정확히 입력해주세요.");
    while (confirmAgain !== userData.id) {
      if (!confirmAgain) return;
      confirmAgain = prompt(
        "사용자 아이디가 일치하지 않습니다.\n회원정보에 기재된 아이디를 정확히 입력해 주세요."
      );
    }
    try {
      await axios.delete(`/api/users/secession/${userData._id}`);
      // 회원 탈퇴 후 로그아웃하고 새로고침
      setLoginInfo("");
      sessionStorage.clear();
      window.location.reload();
    } catch (error) {
      console.log("회원탈퇴 오류", error);
    }
  };

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
              {!changeMode ? (
                // 정보수정 X, 일반 화면
                <div>
                  <p>이름: {userData.name}</p>
                  <p>아이디: {userData.id}</p>
                  <p>휴대전화: {userData.phone}</p>
                  <p>이메일: {userData.email}</p>
                  <p>
                    생년월일: {userData.yyyy}-{userData.mm}-{userData.dd}
                  </p>
                  <button
                    className={style.changeInfoBtn}
                    onClick={() => setChangeMode(true)}
                  >
                    회원정보 수정
                  </button>
                  <button
                    className={style.secessionBtn}
                    onClick={secedeMembership}
                  >
                    회원 탈퇴
                  </button>
                </div>
              ) : (
                // 회원정보 수정 화면 (이름과 아이디는 수정 불가)
                <div>
                  <p>이름: {userData.name}</p>
                  <p>아이디: {userData.id}</p>
                  <p>
                    휴대전화:{" "}
                    <input
                      type="text"
                      name="phone"
                      value={changedInfo.phone}
                      onChange={inputUserInfoChange}
                    />
                  </p>
                  <p>
                    이메일:{" "}
                    <input
                      type="text"
                      name="email"
                      value={changedInfo.email}
                      onChange={inputUserInfoChange}
                    />
                  </p>
                  <p>
                    생년월일:{" "}
                    <input
                      type="text"
                      name="yyyy"
                      value={changedInfo.yyyy}
                      className={style.birthdate}
                      onChange={inputUserInfoChange}
                      placeholder="년 (4자리)"
                    />
                    <input
                      type="text"
                      name="mm"
                      value={changedInfo.mm}
                      className={style.birthdate}
                      onChange={inputUserInfoChange}
                      placeholder="월 (2자리)"
                    />
                    <input
                      type="text"
                      name="dd"
                      value={changedInfo.dd}
                      className={style.birthdate}
                      onChange={inputUserInfoChange}
                      placeholder="일 (2자리)"
                    />
                  </p>
                  <button
                    className={style.completeBtn}
                    onClick={completetUserInfoChange}
                  >
                    수정 완료
                  </button>
                  <button
                    className={style.cancelBtn}
                    onClick={cancelUserInfoChage}
                  >
                    수정 취소
                  </button>
                </div>
              )}
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
                  {userData.borrowedBooks?.map?.((e, i) => {
                    const returnDay = new Date(
                      e.loanStartYYYY,
                      e.loanStartMM - 1,
                      e.loanStartDD + 15
                    );
                    const now = new Date();
                    return (
                      <tr key={i}>
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
            <div id={style.inquiries}>
              <h2>내가 한 문의</h2>
              {inquiries.length !== 0 ? (
                inquiries?.map?.((inq, i) => {
                  return (
                    <div key={i} className={style.inqContent}>
                      <h3>문의 순서: {i + 1}</h3>
                      <p>제목: {inq?.title}</p>
                      <p>내용: {inq?.content}</p>
                      <p>답변: {inq?.answer}</p>
                    </div>
                  );
                })
              ) : (
                <p>문의 내용이 없습니다.</p>
              )}
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
