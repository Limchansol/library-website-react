import Header from "./Header";
import Footer from "./Footer";
import { RecoilRoot } from "recoil";
import style from "./App.module.css";

function App({ children }) {
  return (
    <>
      <RecoilRoot>
        <Header />
        <main className={style.body}>{children}</main>
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default App;
