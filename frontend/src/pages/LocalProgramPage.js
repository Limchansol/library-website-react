import { useState } from "react";
import OneDayClass from "../components/OneDayClass";
import style from "./LocalProgramPage.module.css";

function LocalProgramPage() {
  const [localProgram, setLocalProgram] = useState("oneDayClass");

  // 차후에 지역 활동 추가되면 핸들러로 등록할 것
  const handleOneDayClassClick = () => setLocalProgram("oneDayClass");

  const oneDayClassTitleClass =
    localProgram === "oneDayClass" ? "is-active" : "";

  return (
    <div id={style["local-programs"]}>
      <div className={style.titles}>
        <ul>
          <li className={`${style.title} ${style[oneDayClassTitleClass]}`}>
            원데이 클래스
          </li>
          <li className={`${style.title}`}>계획중</li>
        </ul>
      </div>
      {localProgram === "oneDayClass" && <OneDayClass />}
    </div>
  );
}

export default LocalProgramPage;
