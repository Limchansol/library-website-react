import { useEffect, useState } from "react";
import "./Calender.css";
import { useRecoilState } from "recoil";
import { loginUserInfo } from "../Atoms/LoginAtom.js";
import axios from "axios";

function Calender() {
  const [today, setToday] = useState([2022, 2, 1]);
  const [specialDay, setSpecialDay] = useState({
    redDay: [1, 8, 15, 22],
    orangeDay: [2, 9, 16, 23],
    greenDay: [10],
  });
  const [loginToken, setLoginToken] = useRecoilState(loginUserInfo);
  const [isAdmin, setIsAdmin] = useState(false);
  const [changedDayType, setChangedDayType] = useState("red");

  useEffect(() => {
    const now = new Date();
    setToday([now.getFullYear(), now.getMonth(), now.getDate()]);
    const fetchData = async () => {
      try {
        const temp = await axios.get("/api/users/checkLogIn", {
          headers: { token: loginToken.token },
        });
        setIsAdmin(temp.data.isAdmin);
      } catch (err) {
        console.log(err);
      } finally {
        const dayData = await axios.get("/api/calenders");
        setSpecialDay(dayData.data[0].specialDay);
      }
    };
    fetchData();
  }, []);

  function changeSchedule(e) {
    if (!isAdmin) return;
    const { className, textContent, classList } = e.currentTarget;
    const changedDayArr = className
      ? [...specialDay[className]].filter((e) => e !== Number(textContent)) //스프레드로 딥카피
      : [...specialDay[`${changedDayType}Day`]];
    if (className) {
      //기존 클래스를 없애는 상황
      setSpecialDay((prev) => ({
        ...prev,
        [className]: changedDayArr,
      }));
      classList.toggle(`${className}`);
      return;
    }
    //없던 클래스를 추가하는 상황
    classList.add(`${changedDayType}Day`);
    changedDayArr.push(Number(textContent));
    setSpecialDay((prev) => ({
      ...prev,
      [`${changedDayType}Day`]: changedDayArr,
    }));
  }

  function handleDayType(e) {
    const { value } = e.target;
    setChangedDayType(value);
  }

  async function sendData(e) {
    e.preventDefault();
    if (!isAdmin) return;
    await axios.put("/api/calenders/changeSchedule", specialDay);
    alert("일정이 변경되었습니다.");
  }

  const initDay = new Date(today[0], today[1], 1);
  const lastDay = new Date(today[0], today[1] + 1, 0);
  const nowMonthDays = Array(lastDay.getDate())
    .fill()
    .map((e, i) => {
      if (today[2] === i + 1) return true;
      return false;
    });
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div>
      <h2 className="schedule-title">도서관 일정</h2>
      {isAdmin ? (
        <form onSubmit={sendData}>
          <span>수정할 일정 종류 선택</span>
          <input
            type="radio"
            name="days"
            id="red"
            onChange={handleDayType}
            value="red"
            checked={changedDayType === "red"}
          ></input>
          <label htmlFor="red">휴일</label>
          <input
            type="radio"
            name="days"
            id="orange"
            onChange={handleDayType}
            value="orange"
            checked={changedDayType === "orange"}
          ></input>
          <label htmlFor="orange">영화 상영일</label>
          <input
            type="radio"
            name="days"
            id="green"
            onChange={handleDayType}
            value="green"
            checked={changedDayType === "green"}
          ></input>
          <label htmlFor="green">도서관 활동일</label>
          {isAdmin ? <button>변경하기</button> : <></>}
        </form>
      ) : (
        <></>
      )}
      <table className="schedule-calender">
        <caption>
          red: 휴무일
          <br /> orange: 영화 상영일
          <br /> green: 도서관 활동일
        </caption>

        <thead>
          <tr>
            {days.map((e, i) => {
              return <th key={i}>{e}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill()
            .map((e, i) => {
              return (
                <tr key={i}>
                  {Array(initDay.getDay() * !i) //i가 0일때만 array의 크기가 0이 아니게 되도록
                    .fill()
                    .map((e, i) => {
                      return <td key={i}></td>; //달 맨 처음 시작할 때 빈칸
                    })}
                  {nowMonthDays.map((ele, ind) => {
                    if (
                      initDay.getDay() + ind > 6 + i * 7 ||
                      initDay.getDay() + ind < i * 7
                    )
                      return undefined;

                    return (
                      <td
                        id={ele ? "today" : ""}
                        className={
                          specialDay.orangeDay.includes(ind + 1)
                            ? "orangeDay"
                            : specialDay.redDay.includes(ind + 1)
                            ? "redDay"
                            : specialDay.greenDay.includes(ind + 1)
                            ? "greenDay"
                            : undefined
                        }
                        key={ind} //날짜들이 실제 들어있는 칸
                        onClick={changeSchedule}
                      >
                        {ind + 1}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Calender;
