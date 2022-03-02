import { RecoilRoot } from "recoil";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
