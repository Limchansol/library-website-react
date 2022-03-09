import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import style from "./BookChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function BookChart() {
  const [allBookLen, setAllBookLen] = useState(0);
  const [data, setData] = useState({
    labels: [
      "총류",
      "철학",
      "종교",
      "사회과학",
      "자연과학",
      "기술과학",
      "예술",
      "언어",
      "문학",
      "역사",
    ],
    datasets: [
      {
        type: "doughnut",
        label: "권",
        data: [],
        borderWidth: 2,
        backgroundColor: [
          "#EFFFFD",
          "#B8FFF9",
          "#85F4FF",
          "#42C2FF",
          "#019267",
          "#00C897",
          "#FFD365",
          "#FDFFA9",
          "#5463FF",
          "#4FD3C4",
        ],
      },
    ],
  });
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          font: {
            size: 14,
            weight: "bold",
            color: "black",
            family: "serif",
          },
        },
      },
    },
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchBook = async () => {
      try {
        const bookData = await axios.get("/api/books/forgraph", {
          cancelToken: source.token,
        });
        setAllBookLen(bookData.data.len);
        setData((prev) => ({
          ...prev,
          datasets: [{ ...data.datasets[0], data: bookData.data.kdcLenArr }],
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
    return () => source.cancel("페이지 이동으로 api요청이 취소되었습니다.");
  }, []);

  return (
    <>
      <h2>도서관 책 보유 현황</h2>
      <p>전체 보유 책: {allBookLen}</p>
      <Doughnut data={data} options={options} />
    </>
  );
}

export default BookChart;
