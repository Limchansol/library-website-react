import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginUserInfo } from "./Atoms/LoginAtom.js";
import ScrollToTop from "./components/ScrollToTop";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import AdministratorPage from "./pages/AdministratorPage";
import GreetingsPage from "./pages/GreetingsPage";
import DirectionPage from "./pages/DirectionPage";
import ServiceHoursPage from "./pages/ServiceHoursPage";
import CheckOutAndReturnPage from "./pages/CheckOutAndReturnPage";
import CafePage from "./pages/CafePage";
import SearchDetailPage from "./pages/SearchDetailPage";
import SearchKdcPage from "./pages/SearchKdcPage";
import BookApplicationPage from "./pages/BookApplicationPage";
import MovieProgramPage from "./pages/MovieProgramPage";
import BookProgramPage from "./pages/BookProgramPage";
import LocalProgramPage from "./pages/LocalProgramPage";
import NoticeListPage from "./pages/NoticeListPage";
import NoticePage from "./pages/NoticePage";
import FAQPage from "./pages/FAQPage";
import InquiryPage from "./pages/InquiryPage";
import SearchedPage from "./pages/SearchedPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./Main.css";

function Main() {
  // 로컬 스토리지에 저장된 값 불러와서 리코일 loginUserInfo 업데이트
  const user = JSON.parse(localStorage.getItem("user"));
  let setLoginInfo = useSetRecoilState(loginUserInfo);
  useEffect(() => {
    setLoginInfo(user);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logIn" element={<LogInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/administrator" element={<AdministratorPage />} />
          <Route path="/introduction">
            <Route path="greetings" element={<GreetingsPage />} />
            <Route path="direction" element={<DirectionPage />} />
          </Route>
          <Route path="/service-guide">
            <Route path="service-hours" element={<ServiceHoursPage />} />
            <Route
              path="checkOut-and-return"
              element={<CheckOutAndReturnPage />}
            />
            <Route path="cafe" element={<CafePage />} />
          </Route>
          <Route path="/materials">
            <Route path="search-detail" element={<SearchDetailPage />} />
            <Route path="search-kdc" element={<SearchKdcPage />} />
            <Route path="book-application" element={<BookApplicationPage />} />
          </Route>
          <Route path="/programs">
            <Route path="movie-program" element={<MovieProgramPage />} />
            <Route path="book-program" element={<BookProgramPage />} />
            <Route path="local-program" element={<LocalProgramPage />} />
          </Route>
          <Route path="/notices-and-communication">
            <Route path="notice">
              <Route index element={<NoticeListPage />} />
              <Route path=":noticeId" element={<NoticePage />} />
            </Route>
            <Route path="FAQ" element={<FAQPage />} />
            <Route path="inquiry" element={<InquiryPage />} />
          </Route>
          <Route path="/searched" element={<SearchedPage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
