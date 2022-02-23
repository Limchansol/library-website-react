import Header from "./Header";
import Footer from "./Footer";
import { RecoilRoot } from "recoil";

function App({ children }) {
  return (
    <>
      <RecoilRoot>
        <Header />
        <main>{children}</main>
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default App;
