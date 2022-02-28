import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom";
import axios from "axios";
import Warn from "../components/Warn";
import style from "./InquiryPage.module.css";

function InquiryPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [inquiryInfo, setInquiryInfo] = useState({
    title: "",
    sort: "all",
    content: "",
    userName: loginInfo.name,
    createdAt: "",
  });

  useEffect(() => {
    const logInFetch = async () => {
      try {
        const loginRes = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token },
        });
      } catch (error) {
        console.log(error);
      }
    };
    logInFetch();
  }, [loginInfo]);

  const handleInquiryInfo = (e) => {
    const { name, value } = e.target;
    setInquiryInfo((prev) => ({
      ...prev,
      [name]: value,
      createdAt: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inquiryInfo.title || !inquiryInfo.content) {
      alert("문의 제목과 내용을 적어주세요.");
      return;
    }
    console.log(inquiryInfo);
    alert("문의 등록이 완료되었습니다.");
  };

  return (
    <>
      {loginInfo ? (
        <div className={style.inquiry}>
          <h2>문의</h2>
          <form className={style.inquiryForm} onSubmit={handleSubmit}>
            <div className={style.inquiryTitle}>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                name="title"
                id="title"
                value={inquiryInfo.title}
                onChange={handleInquiryInfo}
                placeholder="제목을 적어주세요."
              />
            </div>
            <div className={style.inquirySort}>
              <span>분류</span>
              <input
                type="radio"
                name="sort"
                id="all"
                value="all"
                checked={inquiryInfo.sort === "all"}
                onChange={handleInquiryInfo}
              />
              <label htmlFor="all">전체</label>
              <input
                type="radio"
                name="sort"
                id="checkOut-return"
                value="checkOut-return"
                checked={inquiryInfo.sort === "checkOut-return"}
                onChange={handleInquiryInfo}
              />
              <label htmlFor="checkOut-return">대여/예약/반납</label>
              <input
                type="radio"
                name="sort"
                id="program"
                value="program"
                checked={inquiryInfo.sort === "program"}
                onChange={handleInquiryInfo}
              />
              <label htmlFor="program">프로그램</label>
              <input
                type="radio"
                name="sort"
                id="user"
                value="user"
                checked={inquiryInfo.sort === "user"}
                onChange={handleInquiryInfo}
              />
              <label htmlFor="user">회원 서비스</label>
              <input
                type="radio"
                name="sort"
                id="etc"
                value="etc"
                checked={inquiryInfo.sort === "etc"}
                onChange={handleInquiryInfo}
              />
              <label htmlFor="etc">기타</label>
            </div>
            <textarea
              name="content"
              id="content"
              cols="80"
              rows="15"
              value={inquiryInfo.content}
              onChange={handleInquiryInfo}
              placeholder="문의 내용을 적어주세요."
            ></textarea>
            <button className={style.inquiryBtn}>문의 등록</button>
          </form>
        </div>
      ) : (
        <Warn />
      )}
    </>
  );
}

export default InquiryPage;
