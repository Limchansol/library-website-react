import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import IndBook from "./IndBook";
import style from "./BookShelf.module.css";

function BookShelf({ interestingBooks }) {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [zoomBook, setZoomBook] = useState({});

  // 관심도서 삭제
  const removeIndBook = async () => {
    const confirmRemove = window.confirm(
      `『${zoomBook?.title}』을(를) 관심도서에서 삭제하시겠습니까?`
    );
    if (!confirmRemove) return;
    try {
      // 여기에 관심도서 삭제 요청 코드 작성 (zoomBook이 확대된 책 정보를 담고 있음)
      await axios.put(
        "/api/users/interestingBookDelete",
        {
          bookId: zoomBook._id,
        },
        {
          headers: { token: loginInfo.token },
        }
      );

      alert(`『${zoomBook?.title}』이(가) 관심도서에서 삭제되었습니다.`);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
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
