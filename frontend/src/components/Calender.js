import { useEffect, useState } from "react";
import "./Calender.css";

function Calender() {
  const [today, setToday] = useState([2022, 2, 1]);
  const [redDay, setRedDay] = useState([1, 8, 15, 22]);
  const [orangeDay, setorangeDay] = useState([2, 9, 16, 23]); //쉬는 날은 redDay, 영화 상영일은 orangeDay, class이름도 동일
  useEffect(() => {
    const now = new Date();
    setToday([now.getFullYear(), now.getMonth(), now.getDate()]);
  }, []);
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
    <>
      <h2 className="schedule-title">도서관 일정</h2>
      <table className="schedule-calender">
        <caption>
          red: 휴무일
          <br /> orange: 영화상영일
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
                <tr>
                  {Array(initDay.getDay() * !i) //i가 0일때만 array의 크기가 0이 아니게 되도록
                    .fill()
                    .map((e) => {
                      return <td></td>;
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
                          orangeDay.includes(ind + 1)
                            ? "orangeDay"
                            : redDay.includes(ind + 1)
                            ? "redDay"
                            : ""
                        }
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
    </>
  );
}

export default Calender;
