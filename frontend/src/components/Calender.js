import { useEffect, useState } from "react";
import "./Calender.css";

function Calender() {
  const [nowYearAndMonth, setNowYearAndMonth] = useState([2022, 2]);
  const [redDay, setRedDay] = useState([1, 8, 15]);
  const [orangeDay, setorangeDay] = useState([2, 9, 16]); //쉬는 날은 redDay, 영화 상영일은 orangeDay, class이름도 동일
  useEffect(() => {
    const now = new Date();
    setNowYearAndMonth([now.getFullYear(), now.getMonth()]);
  }, []);
  const initDay = new Date(nowYearAndMonth[0], nowYearAndMonth[1], 1);
  const lastDay = new Date(nowYearAndMonth[0], nowYearAndMonth[1] + 1, 0);
  console.log("here", nowYearAndMonth);
  const nowMonthDays = Array(lastDay.getDate())
    .fill()
    .map((e, i) => i);
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
          <tr>
            {Array(initDay.getDay())
              .fill()
              .map((e, i) => {
                return <td key={i}></td>;
              })}
            {nowMonthDays.map((e, i) => {
              if (initDay.getDay() + i > 6) {
                return;
              }
              if (redDay.includes(e + 1))
                return (
                  <td key={i} className="redDay">
                    {e + 1}
                  </td>
                );
              if (orangeDay.includes(e + 1))
                return (
                  <td key={i} className="orangeDay">
                    {e + 1}
                  </td>
                );
              return <td key={i}>{e + 1}</td>;
            })}
          </tr>
          {Array(5)
            .fill()
            .map((e, i) => {
              if (i === 0) return;
              return (
                <tr>
                  {nowMonthDays.map((ele, ind) => {
                    if (
                      initDay.getDay() + ind > 6 + i * 7 ||
                      initDay.getDay() + ind < i * 7
                    ) {
                      return;
                    }
                    if (redDay.includes(ele + 1))
                      return (
                        <td key={ind} className="redDay">
                          {ele + 1}
                        </td>
                      );
                    if (orangeDay.includes(ele + 1))
                      return (
                        <td key={ind} className="orangeDay">
                          {ele + 1}
                        </td>
                      );
                    return <td key={ind}>{ele + 1}</td>;
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
