import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom";
import BookOfTheMonth from "../components/BookOfTheMonth";
import style from "./AdministratorPage.module.css";

function AdministratorPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [userInfo, setUserInfo] = useState({});
  const [inquiry, setInquiry] = useState({});
  const [inquiryAnswer, setInquiryAnswer] = useState({
    content: [],
  });
  const [bomSearch, setBomSearch] = useState({
    searchTargetMonth: 1,
    isSearched: false,
  });
  const [newBookOfTheMonth, setNewBookOfTheMonth] = useState({
    month: 0,
    title: "",
    writer: "",
    paragraph: "",
    bookImg: null,
  });
  const fileRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const temp = await axios.get("/api/users/checkLogIn", {
        headers: { token: loginInfo.token },
      });
      const tempInq = await axios.get("/api/inquiries");
      setUserInfo(temp.data);
      setInquiry(tempInq.data);
      setInquiryAnswer((prev) => ({
        ...prev,
        content: Array(inquiry ? inquiry.length : 0).fill(""),
      }));
    };
    fetchData();
  }, []);

  function handleInquiryAnswer(e) {
    const { value } = e.target;
    const index = e.target.parentNode.parentNode.dataset.ind;
    const temp = [...inquiryAnswer.content];
    temp[index] = value;
    setInquiryAnswer((prev) => ({
      ...prev,
      content: temp,
    }));
  }

  function handlebookOfTheMonth(e) {
    const { value, name, files } = e.target;
    if (name === "bookImg") URL.revokeObjectURL(newBookOfTheMonth.bookImg);
    setNewBookOfTheMonth((prev) => ({
      ...prev,
      [name]: name === "bookImg" ? files[0] : value,
    })); //만약 input타입이 파일이면, e.target.files에서 리턴하는 유사배열(파일들)로 처리를 해야 한다! 주의할 것.
  }

  function imgClear(e) {
    const inputNode = fileRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    setNewBookOfTheMonth((prev) => ({
      ...prev,
      bookImg: null,
    }));
  }

  function handleSelect(e) {
    setBomSearch((prev) => ({
      ...prev,
      searchTargetMonth: e.target.value,
    }));
  }

  function handleSearchBOM(e) {
    setBomSearch((prev) => ({
      ...prev,
      isSearched: true,
    }));
  }

  function isSearchedToFalse(e) {
    setBomSearch((prev) => ({
      ...prev,
      isSearched: false,
    }));
  }

  async function handleInqSubmit(e) {
    e.preventDefault();
    const index = e.target.parentNode.dataset.ind;
    await axios.put("/api/inquiries/answerInquiry", {
      _id: inquiry[index]._id,
      answer: inquiryAnswer.content[index],
    });
    alert("문의에 대한 답이 등록되었습니다.");
    window.location.reload();
  }

  async function handleBOMSubmit(e) {
    e.preventDefault();
    const BOM = new FormData();
    BOM.append("bookImg", newBookOfTheMonth.bookImg);
    BOM.append("month", newBookOfTheMonth.month);
    BOM.append("title", newBookOfTheMonth.title);
    BOM.append("writer", newBookOfTheMonth.writer);
    BOM.append("paragraph", newBookOfTheMonth.paragraph);
    await axios.put(
      `/api/bookOfTheMonth/update/${newBookOfTheMonth.month}`,
      BOM,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    alert("이달의 책이 등록되었습니다.");
    window.location.reload();
  }

  return (
    <>
      <div id={style.bookOfTheMonthUpdate}>
        <div id={style.bomSearch}>
          <h2 className={style.title}>이달의 책 업데이트</h2>
          <h3>저장된 이달의 책 내역(모든 내역은 이번 년도 기준입니다)</h3>
          <select
            name="bookOfTheMonthList"
            onChange={handleSelect}
            onClick={isSearchedToFalse}
          >
            {Array(12)
              .fill()
              .map((e, i) => {
                return (
                  <option value={`${i + 1}`} key={i}>
                    {i + 1} 월
                  </option>
                );
              })}
          </select>
          <button onClick={handleSearchBOM}>조회</button>
          {bomSearch.isSearched && (
            <BookOfTheMonth month={Number(bomSearch.searchTargetMonth)} />
          )}
        </div>
        <form id={style.bookOfTheMonthForm} onSubmit={handleBOMSubmit}>
          <h3>이달의 책 수정</h3>
          <label htmlFor="month">달</label>
          <input
            type="number"
            name="month"
            id="month"
            value={newBookOfTheMonth.month}
            onChange={handlebookOfTheMonth}
            placeholder="수정하고자 하는 달을 적어주세요."
          />
          <label htmlFor="bookImg">추가할 이미지</label>
          {newBookOfTheMonth.bookImg && (
            <img
              src={URL.createObjectURL(newBookOfTheMonth.bookImg)}
              alt="이미지 미리보기"
              style={{
                maxHeight: "250px",
                maxWidth: "200px",
                width: "auto",
                height: "auto",
              }}
            />
          )}
          <input
            type="file"
            name="bookImg"
            id="bookImg"
            accept="image/*"
            onChange={handlebookOfTheMonth}
            ref={fileRef}
          />
          {newBookOfTheMonth.bookImg && <button onClick={imgClear}>X</button>}
          {/* 이미지 파일은 비동기적으로 처리해야 한다. 따라서 value를 설정해주지 않았다. */}
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            value={newBookOfTheMonth.title}
            onChange={handlebookOfTheMonth}
            placeholder="제목을 적어주세요."
          />
          <label htmlFor="writer">저자</label>
          <input
            type="text"
            name="writer"
            id="writer"
            value={newBookOfTheMonth.writer}
            onChange={handlebookOfTheMonth}
            placeholder="저자를 적어주세요."
          />
          <textarea
            name="paragraph"
            id="paragraph"
            cols="105"
            rows="30"
            value={newBookOfTheMonth.paragraph}
            onChange={handlebookOfTheMonth}
            placeholder="책에 대한 정보를 적어주세요."
          ></textarea>
          <button type="submit" className={style.bookOfTheMonthBtn}>
            업데이트
          </button>
        </form>
      </div>
      <div id={style.inquiryCheck}>
        <h2 className={style.title}>들어온 문의</h2>
        <ul>
          {inquiry?.map?.((inq, i) => {
            return (
              <li key={inq._id} data-ind={i} className={style.content}>
                <h3>문의 순번: {i + 1}</h3>
                <p>제목: {inq?.title}</p>
                <p>내용: {inq?.content}</p>
                <p>작성자: {inq?.userName}</p>
                <p>작성일: {inq?.createdAt}</p>
                {inq.answer === "아직 답변이 등록되지 않았습니다" ? (
                  <form id={style.inquiryAnswerForm} onSubmit={handleInqSubmit}>
                    <textarea
                      name="content"
                      id="content"
                      cols="80"
                      rows="15"
                      value={inquiryAnswer.content[i]}
                      onChange={handleInquiryAnswer}
                      placeholder="문의에 대한 답을 적어주세요."
                    ></textarea>
                    <button className={style.inquiryAnswerBtn}>
                      답변 보내기
                    </button>
                  </form>
                ) : (
                  <p>
                    답변이 등록되었습니다. <br />
                    답변: {inq.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default AdministratorPage;
