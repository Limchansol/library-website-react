import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import GreetingsPage from "./pages/GreetingsPage";
import DirectionPage from "./pages/DirectionPage";
import Intro3Page from "./pages/Intro3Page";
import ServiceHoursPage from "./pages/ServiceHoursPage";
import CheckOutAndReturnPage from "./pages/CheckOutAndReturnPage";
import CafePage from "./pages/CafePage";
import DetailedSearchPage from "./pages/DetailedSearchPage";
import SubjectSearchPage from "./pages/SubjectSearchPage";
import BookApplicationPage from "./pages/BookApplicationPage";
import MovieProgramPage from "./pages/MovieProgramPage";
import BookProgramPage from "./pages/BookProgramPage";
import LocalProgramPage from "./pages/LocalProgramPage";
import NoticePage from "./pages/NoticePage";
import FAQPage from "./pages/FAQPage";
import InquiryPage from "./pages/InquiryPage";
import SearchedPage from "./pages/SearchedPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./Main.css";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logIn" element={<LogInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/introduction">
            <Route path="greetings" element={<GreetingsPage />} />
            <Route path="direction" element={<DirectionPage />} />
            <Route path="intro3" element={<Intro3Page />} />
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
            <Route path="detailed-search" element={<DetailedSearchPage />} />
            <Route path="subject-search" element={<SubjectSearchPage />} />
            <Route path="book-application" element={<BookApplicationPage />} />
          </Route>
          <Route path="/programs">
            <Route path="movie-program" element={<MovieProgramPage />} />
            <Route path="book-program" element={<BookProgramPage />} />
            <Route path="local-program" element={<LocalProgramPage />} />
          </Route>
          <Route path="/notices-and-communication">
            <Route path="notice" element={<NoticePage />} />
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
