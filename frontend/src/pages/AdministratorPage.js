import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [rentalUserName, setRentalUserName] = useState("");
  const [searchedRentalUser, setSearchedRentalUser] = useState([]);
  const bookFileRef = useRef();
  const navigate = useNavigate();
  const [newPromotion, setNewPromotion] = useState({
    order: 0,
    ad: null,
    link: "",
  });
  const promotionFileRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let temp = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token?.access },
        });
        if (temp.data.message === "jwt expired") {
          const refreshData = await axios.get("/api/users/checkrefreshjwt", {
            headers: { token: loginInfo.token?.refresh },
          });
          setLoginInfo(refreshData.data);
          temp = await axios.get("/api/users/checkLogIn", {
            headers: { token: refreshData.data.token?.access },
          });
        }
        const tempInq = await axios.get("/api/inquiries");
        setUserInfo(temp.data);
        setInquiry(tempInq.data);
        setInquiryAnswer((prev) => ({
          ...prev,
          content: Array(inquiry ? inquiry.length : 0).fill(""),
        }));
      } catch (error) {
        if (error.response.status === 401) {
          setLoginInfo("");
          sessionStorage.clear();
          alert("로그인이 만료되었습니다. 로그인 페이지로 이동합니다.");
          navigate("/logIn");
        }
      }
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

  function handlePromotion(e) {
    const { value, name, files } = e.target;
    if (name === "ad") URL.revokeObjectURL(newPromotion.ad);
    setNewPromotion((prev) => ({
      ...prev,
      [name]: name === "ad" ? files[0] : value,
    }));
  }

  function handleRentalUser(e) {
    const { value } = e.target;
    setRentalUserName(value);
  }

  function BOMImgClear(e) {
    const inputNode = bookFileRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    setNewBookOfTheMonth((prev) => ({
      ...prev,
      bookImg: null,
    }));
  }

  function promotionImgClear(e) {
    const inputNode = promotionFileRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    setNewPromotion((prev) => ({
      ...prev,
      ad: null,
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

  async function handlePromotionSubmit(e) {
    e.preventDefault();
    const promotion = new FormData();
    promotion.append("ad", newPromotion.ad);
    promotion.append("order", newPromotion.order);
    promotion.append("link", newPromotion.link);

    await axios.put(`/api/promotions/update/${newPromotion.order}`, promotion, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("배너 광고가 수정되었습니다.");
    window.location.reload();
  }

  async function handlePromotionDel(e) {
    await axios.delete(`/api/promotions/remove/${newPromotion.order}`);
    alert("배너 광고가 삭제되었습니다.");
    window.location.reload();
    return;
  }

  async function handleRentalSubmit(e) {
    try {
      e.preventDefault();
      const searchedUser = await axios.get(
        `/api/users/rentalusersearch/${rentalUserName}`
      );
      setSearchedRentalUser(searchedUser.data);
    } catch (error) {
      if (error.response.status === 404) {
        setSearchedRentalUser([
          { name: "익명", phone: "회원이 아닌 유저에게 대출/반납" },
        ]);
      }
    }
  }

  async function bookStateChange(e) {
    const { username, userphone } = e.target.dataset;
    const now = new Date();
    const rentalFlag = ["none", "ready"].includes(
      location.state?.rentalBook?.state
    );
    if (rentalFlag) {
      await axios.put("/api/users/borrowedBookUpdate", {
        name: username,
        phone: userphone,
        borrowedBooks: {
          title: location.state?.rentalBook?.title,
          loanStartYYYY: now.getFullYear(),
          loanStartMM: now.getMonth() + 1,
          loanStartDD: now.getDate(),
        },
      });
      await axios.put("/api/books/bookstateUpdate", {
        _id: location.state?.rentalBook?._id,
        changeTo: "rental",
      });
      alert("대출 처리가 완료되었습니다");
      return;
    }
    await axios.put("/api/users/borrowedBookDelete", {
      name: username,
      phone: userphone,
      title: location.state?.rentalBook?.title,
    });
    await axios.put("/api/books/bookstateUpdate", {
      _id: location.state?.rentalBook?._id,
      changeTo:
        location.state?.rentalBook?.state === "rental" ? "none" : "ready",
    });
    alert("반납 처리가 완료되었습니다");
    return; //반납과 연체 로직은 추후에 추가 처리!
  }

  return (
    <>
      {location.state?.rentalBook && (
        <div id={style.rental}>
          <h2>
            도서{" "}
            {["none", "ready"].includes(location.state?.rentalBook?.state)
              ? "대출"
              : "반납"}{" "}
          </h2>
          <h3>
            {["none", "ready"].includes(location.state?.rentalBook?.state)
              ? "대출"
              : "반납"}{" "}
            대상 책: {location.state?.rentalBook?.title}
          </h3>
          <form id={style.rentalForm} onSubmit={handleRentalSubmit}>
            <h3>
              {["none", "ready"].includes(location.state?.rentalBook?.state)
                ? "대출"
                : "반납"}
              하는 유저
            </h3>
            <label htmlFor="userSearch">이름:</label>
            <input
              type="text"
              name="userSearch"
              id="userSearch"
              value={rentalUserName}
              placeholder="이름을 검색하세요"
              onChange={handleRentalUser}
            />
            <button type="submit">유저 검색</button>
          </form>
          {searchedRentalUser.length !== 0 && (
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>전화번호</th>
                  <th>
                    {["none", "ready"].includes(
                      location.state?.rentalBook?.state
                    )
                      ? "대출"
                      : "반납"}
                    하기
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchedRentalUser?.map?.((e) => {
                  return (
                    <tr key={e.phone}>
                      <td>{e.name}</td>
                      <td>{e.phone}</td>
                      <td>
                        <button
                          onClick={bookStateChange}
                          data-username={e.name}
                          data-userphone={e.phone}
                        >
                          {["none", "ready"].includes(
                            location.state?.rentalBook?.state
                          )
                            ? "대출"
                            : "반납"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      <div id={style.promotion}>
        <form id={style.promotionForm} onSubmit={handlePromotionSubmit}>
          <h2>홈 배너 광고 수정 및 삭제(배너 광고는 최소 2개이상 넣으세요!)</h2>
          <p>
            ※삭제 시에는 번호만 입력하면 삭제됩니다.
            <br />
            <br />
            ※연결될 링크에는, 홈페이지의 링크 중에서 /이후부터 입력하세요.
            <br />
            예시: 홈페이지 링크가 https:/minilib.com/moviePage라면 /moviePage만
            입력
          </p>
          <label htmlFor="order">번호</label>
          <input
            type="number"
            name="order"
            id="order"
            value={newPromotion.order}
            onChange={handlePromotion}
            placeholder="수정하거나 삭제할 광고 번호를 적어주세요."
          />
          <label htmlFor="link">연결될 링크</label>
          <input
            type="text"
            name="link"
            id="link"
            value={newPromotion.link}
            onChange={handlePromotion}
            placeholder="연결될 링크를 적어주세요."
          />
          <label htmlFor="bookImg">추가할 이미지</label>
          {newPromotion.ad && (
            <img
              src={URL.createObjectURL(newPromotion.ad)}
              alt="이미지 미리보기"
              style={{
                maxHeight: "270px",
                maxWidth: "270px",
                width: "auto",
                height: "auto",
              }}
            />
          )}
          <input
            type="file"
            name="ad"
            id="ad"
            accept="image/*"
            onChange={handlePromotion}
            ref={promotionFileRef}
          />
          {newPromotion.ad && <button onClick={promotionImgClear}>X</button>}
          {/* 이미지 파일은 비동기적으로 처리해야 한다. 따라서 value를 설정해주지 않았다. */}
          <button
            type="submit"
            name="update"
            className={style.promotionUpdateBtn}
          >
            업데이트
          </button>
          <button
            type="submit"
            name="del"
            className={style.promotionDeleteBtn}
            onClick={handlePromotionDel}
          >
            삭제
          </button>
        </form>
      </div>
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
            ref={bookFileRef}
          />
          {newBookOfTheMonth.bookImg && (
            <button onClick={BOMImgClear}>X</button>
          )}
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
