import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import style from "./Promotion.module.css";

function Promotion() {
  const imgCnt = 4;
  const [intervalID, setIntervalID] = useState(0);
  const [currIndex, setCurrIndex] = useState(1);
  const $screen = useRef();
  let real = true;

  const slideStyle = {
    transform: `translateX(-${290 * currIndex}px)`,
    transition: real ? "transform 0.5s" : "none",
  };

  const changePromotionImage = () => {
    setCurrIndex((prev) => prev + 1);
    if (currIndex === imgCnt) {
      real = false;
      setCurrIndex(1);
    }
    real = true;
  };

  const toPreviousIMG = () => {
    setCurrIndex((prev) => {
      if (prev === 1) return imgCnt;
      return prev - 1;
    });
    const interval = setInterval(changePromotionImage, 2500);
    setIntervalID(interval);
  };

  const toNextIMG = () => {
    setCurrIndex((prev) => {
      if (prev === imgCnt) return 1;
      return prev + 1;
    });
    const interval = setInterval(changePromotionImage, 2500);
    setIntervalID(interval);
  };

  useEffect(() => {
    let interval;
    if (!intervalID) {
      interval = setInterval(changePromotionImage, 2500);
    } else {
      interval = intervalID;
    }
    return () => {
      clearInterval(interval);
    };
  }, [intervalID]);

  const arrForImg = [
    [img1, "/programs/movie-program"],
    [img2, "#"],
    [img3, "#"],
    [img4, "#"],
  ];

  return (
    <div id={style.promotionScreen} ref={$screen}>
      <div className={style.imgContainer} style={slideStyle}>
        {/* 무한 슬라이드 만들기 위해 맨앞에 마지막 이미지 덧붙임 */}
        <div className={style.promotionImg} key={`img${imgCnt}`}>
          <Link to={arrForImg[imgCnt - 1][1]}>
            <img
              id={`img${imgCnt}`}
              src={arrForImg[imgCnt - 1][0]}
              alt={`img${imgCnt}`}
              width="270"
              height="270"
            />
          </Link>
        </div>
        {arrForImg.map((property, i) => {
          return (
            // 컴포넌트로 바꿀 것
            <div className={style.promotionImg} key={`img${i + 1}`}>
              <Link to={property[1]}>
                <img
                  id={`img${i + 1}`}
                  src={property[0]}
                  alt={`img${i + 1}`}
                  width="270"
                  height="270"
                />
              </Link>
            </div>
          );
        })}
        {/* 무한 슬라이드 만들기 위해 맨 뒤에 첫번째 이미지 덧붙임 */}
        <div className={style.promotionImg} key="img1">
          <Link to={arrForImg[0][1]}>
            <img
              id="img1"
              src={arrForImg[0][0]}
              alt="img1"
              width="270"
              height="270"
            />
          </Link>
        </div>
      </div>
      <button className={style.previous} onClick={toPreviousIMG}>
        &lt;
      </button>
      <button className={style.next} onClick={toNextIMG}>
        &gt;
      </button>
      <div className={style.indexMarkContainer}>
        {Array(imgCnt)
          .fill()
          .map((v, i) => {
            return (
              <span
                className={`${style.indexMark} ${
                  currIndex === i ? "active" : ""
                }`}
                key={`mark${i + 1}`}
              ></span>
            );
          })}
      </div>
    </div>
  );
}

export default Promotion;
