import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom";
import axios from "axios";
import Warn from "../components/Warn";
import style from "./InquiryPage.module.css";

function InquiryPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [inquiryInfo, setInquiryInfo] = useState({
    id: "",
    title: "",
    sort: "all",
    content: "",
    userName: loginInfo.name,
    createdAt: "",
  });
  console.log(loginInfo, "로그인인포");

  useEffect(() => {
    const logInFetch = async () => {
      try {
        const loginRes = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token },
        });
        console.log(loginRes.data._id);
        setInquiryInfo((prev) => ({
          ...prev,
          id: loginRes.data._id,
        }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inquiryInfo.title || !inquiryInfo.content) {
      alert("문의 제목과 내용을 적어주세요.");
      return;
    }
    const fetchedData = await axios.post(
      "/api/inquiries/sendInquiry",
      inquiryInfo
    );
    console.log(fetchedData);
    alert("문의 등록이 완료되었습니다.");
  };

  return (
    <>
      {loginInfo ? (
        <div id={style.inquiry}>
          <h1>문의</h1>
          <form id={style.inquiryForm} onSubmit={handleSubmit}>
            <div id={style.titleBox}>
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
            <div id={style.inquirySort}>
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
