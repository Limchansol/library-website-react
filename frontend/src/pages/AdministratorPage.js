import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom";

function AdministratorPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);
  const [userInfo, setUserInfo] = useState({});
  const [inquiry, setInquiry] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const temp = await axios.get("/api/users/checkLogIn", {
        headers: { token: loginInfo.token },
      });
      const tempInq = await axios.get("api/inquiries");
      setUserInfo(temp.data);
      setInquiry(tempInq.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div id="inquiryCheck">
        <h2>들어온 문의</h2>
        <ul>
          {inquiry?.map?.((inq, i) => {
            return (
              <li key={inq._id}>
                <h3>문의 순번: {i + 1}</h3>
                <p>제목: {inq?.title}</p>
                <p>내용: {inq?.content}</p>
                <p>작성자: {inq?.userName}</p>
                <p>작성일: {inq?.createdAt}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default AdministratorPage;
