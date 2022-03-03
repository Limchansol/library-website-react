import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom";
import style from "./AdministratorPage.module.css";

function AdministratorPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [userInfo, setUserInfo] = useState({});
  const [inquiry, setInquiry] = useState({});
  const [inquiryAnswer, setInquiryAnswer] = useState({
    content: [],
  });
  const [bookOfTheMonthRecord, setBookOfTheMonthRecord] = useState({
    month: 0,
    title: "",
    writer: "",
    paragraph: "",
  });
  const [newBookOfTheMonth, setNewBookOfTheMonth] = useState({
    month: 0,
    title: "",
    writer: "",
    paragraph: "",
  });

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
    const { value, name } = e.target;
    setNewBookOfTheMonth((prev) => ({
      ...prev,
      [name]: name === "month" ? Number(value) : value,
    }));
  }

  async function handleInqSubmit(e) {
    e.preventDefault();
    const index = e.target.parentNode.dataset.ind;
    console.log(inquiry, index);
    await axios.put("/api/inquiries/answerInquiry", {
      _id: inquiry[index]._id,
      answer: inquiryAnswer.content[index],
    });
  }

  async function handleBOMSubmit(e) {
    e.preventDefault();
    await axios.put(`/api/bookOfTheMonth/update/${newBookOfTheMonth.month}`, {
      targetBook: newBookOfTheMonth,
    });
  }

  return (
    <>
      <div id={style.bookOfTheMonthUpdate}>
        <h2 className={style.title}>이달의 책 업데이트</h2>
        <h3>저장된 이달의 책 내역(모든 내역은 이번 년도 기준입니다)</h3>
        {/* 추후에 db에 저장된 이달의 책 내역 달 입력하면 볼 수 있도록 코드 추가 */}
        <form id={style.bookOfTheMonthForm} onSubmit={handleBOMSubmit}>
          <label htmlFor="month">달</label>
          <input
            type="text"
            name="month"
            id="month"
            value={newBookOfTheMonth.month}
            onChange={handlebookOfTheMonth}
            placeholder="수정하고자 하는 달을 적어주세요."
          />
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
            cols="80"
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
