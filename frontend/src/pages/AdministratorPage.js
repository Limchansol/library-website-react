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

  async function handleSubmit(e) {
    e.preventDefault();
    const index = e.target.parentNode.dataset.ind;
    console.log(inquiry, index);
    await axios.put("/api/inquiries/answerInquiry", {
      _id: inquiry[index]._id,
      answer: inquiryAnswer.content[index],
    });
  }

  return (
    <>
      <div id={style.inquiryCheck}>
        <h2 id={style.title}>들어온 문의</h2>
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
                  <form id={style.inquiryAnswerForm} onSubmit={handleSubmit}>
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
