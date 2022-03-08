import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom";

function BookRentalBtn({ bookStateControl, bookRentalState }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let loginRes = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginInfo.token?.access },
        });
        if (loginRes.data.message === "jwt expired") {
          const refreshData = await axios.get("/api/users/checkrefreshjwt", {
            headers: { token: loginInfo.token?.refresh },
          });
          setLoginInfo(refreshData.data);
          loginRes = await axios.get("/api/users/checkLogIn", {
            headers: { token: refreshData.data.token?.access },
          });
        }
        setIsAdmin(loginRes.data.isAdmin);
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

  return (
    <>
      {isAdmin && (
        <button onClick={bookStateControl}>
          {["none", "ready"].includes(bookRentalState) ? "대출" : "반납"}
          (관리자용)
        </button>
      )}
    </>
  );
}

export default BookRentalBtn;
