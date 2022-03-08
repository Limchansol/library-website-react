import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import IndBook from "./IndBook";
import style from "./BookShelf.module.css";
import { useNavigate } from "react-router-dom";

function BookShelf({ interestingBooks }) {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [zoomBook, setZoomBook] = useState({});
  const navigate = useNavigate();

  // 관심도서 삭제
  const removeIndBook = async () => {
    const confirmRemove = window.confirm(
      `『${zoomBook?.title}』을(를) 관심도서에서 삭제하시겠습니까?`
    );
    if (!confirmRemove) return;
    try {
      // 여기에 관심도서 삭제 요청 코드 작성 (zoomBook이 확대된 책 정보를 담고 있음)
      let loginRes = await axios.put(
        "/api/users/interestingBookDelete",
        {
          bookId: zoomBook._id,
        },
        {
          headers: { token: loginInfo.token?.access },
        }
      );
      if (loginRes.data.message === "jwt expired") {
        const refreshData = await axios.get("/api/users/checkrefreshjwt", {
          headers: { token: loginInfo.token?.refresh },
        });
        setLoginInfo(refreshData.data);
        await axios.put(
          "/api/users/interestingBookDelete",
          {
            bookId: zoomBook._id,
          },
          {
            headers: { token: refreshData.data.token?.access },
          }
        );
      }
      alert(`『${zoomBook?.title}』이(가) 관심도서에서 삭제되었습니다.`);
    } catch (error) {
      if (error.response.status === 401) {
        setLoginInfo("");
        sessionStorage.clear();
        alert("로그인이 만료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/logIn");
      }
    } finally {
      window.location.reload();
    }
  };

  return (
    <div id={style.bookShelf}>
      {interestingBooks?.map?.((e) => {
        return <IndBook book={e} key={e?._id} setZoomBook={setZoomBook} />;
      })}
      {Object.keys(zoomBook).length ? (
        // 관심도서 클릭했을 때 확대되는 책 html
        <>
          <div className={style.zoomedIndBook} onClick={() => setZoomBook({})}>
            <h2 className={style.title}>{zoomBook?.title}</h2>
            <div className={style.infoText}>
              <span>
                <b>지은이:</b> {zoomBook?.writer}
              </span>
              <span>
                <b>출판사:</b> 「{zoomBook?.publisher}」
              </span>
              <span>
                <b>나만의 한줄평:</b> 한줄평은 어떻게 하지?
              </span>
              <button className={style.remove} onClick={removeIndBook}>
                관심도서 삭제
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BookShelf;
