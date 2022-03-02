import Header from "./Header";
import Footer from "./Footer";
import style from "./App.module.css";
import React from "react";

function App({ children }) {
  return (
    <>
      <Header />
      <main className={style.body}>{children}</main>
      <Footer />
    </>
  );
}

export default App;
