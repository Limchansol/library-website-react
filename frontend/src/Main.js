import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import GreetingsPage from "./pages/GreetingsPage";
import Intro2Page from "./pages/Intro2Page";
import Intro3Page from "./pages/Intro3Page";
import Rule1Page from "./pages/Rule1Page";
import Rule2Page from "./pages/Rule2Page";
import Rule3Page from "./pages/Rule3Page";
import Notice1Page from "./pages/Notice1Page";
import Notice2Page from "./pages/Notice2Page";
import Notice3Page from "./pages/Notice3Page";
import Material1Page from "./pages/Material1Page";
import Material2Page from "./pages/Material2Page";
import Material3Page from "./pages/Material3Page";
import Cafe1Page from "./pages/Cafe1Page";
import Cafe2Page from "./pages/Cafe2Page";
import Cafe3Page from "./pages/Cafe3Page";
import SearchedPage from "./pages/SearchedPage";
import NotFoundPage from "./pages/NotFoundPage";

import './Main.css';

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
            <Route path="intro2" element={<Intro2Page />} />
            <Route path="intro3" element={<Intro3Page />} />
          </Route>
          <Route path="/rules">
            <Route path="rule1" element={<Rule1Page />} />
            <Route path="rule2" element={<Rule2Page />} />
            <Route path="rule3" element={<Rule3Page />} />
          </Route>
          <Route path="/notice">
            <Route path="notice1" element={<Notice1Page />} />
            <Route path="notice2" element={<Notice2Page />} />
            <Route path="notice3" element={<Notice3Page />} />
          </Route>
          <Route path="/materials">
            <Route path="material1" element={<Material1Page />} />
            <Route path="material2" element={<Material2Page />} />
            <Route path="material3" element={<Material3Page />} />
          </Route>
          <Route path="/cafe">
            <Route path="cafe1" element={<Cafe1Page />} />
            <Route path="cafe2" element={<Cafe2Page />} />
            <Route path="cafe3" element={<Cafe3Page />} />
          </Route>
          <Route path="/searched" element={<SearchedPage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}


export default Main;

