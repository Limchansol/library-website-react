import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";
import Warn from "../components/Warn.js";
import "./MyPage.css";

function MyPage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginUserInfo);

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
  return <>{loginInfo ? <div>마이페이지</div> : <Warn />}</>;
}

export default MyPage;
