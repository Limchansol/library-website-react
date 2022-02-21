import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import "./Promotion.css";

function Promotion() {
  const imgCnt = 4;
  const [intervalID, setIntervalID] = useState(0);
  const [index, setIndex] = useState({
    prevIndex: imgCnt,
    currIndex: 1,
    nextIndex: 2,
  });

  const changePromotionImage = () => {
    setIndex((prev) => {
      return {
        ...prev,
        prevIndex: prev.currIndex,
        currIndex: prev.nextIndex,
        nextIndex: prev.nextIndex !== imgCnt ? prev.nextIndex + 1 : 1,
      };
    });
  };

  const toPreviousIMG = () => {
    setIndex((prev) => {
      return {
        ...prev,
        nextIndex: prev.currIndex,
        currIndex: prev.prevIndex,
        prevIndex: prev.prevIndex !== 1 ? prev.prevIndex - 1 : imgCnt,
      };
    });
    const interval = setInterval(changePromotionImage, 2500);
    setIntervalID(interval);
  };

  const toNextIMG = () => {
    setIndex((prev) => {
      return {
        ...prev,
        prevIndex: prev.currIndex,
        currIndex: prev.nextIndex,
        nextIndex: prev.nextIndex !== imgCnt ? prev.nextIndex + 1 : 1,
      };
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
    <>
      <div id="promotion">
        {arrForImg.map((property, i) => {
          return (
            <Link to={property[1]} key={`img${i + 1}`}>
              <img
                id={`img${i + 1}`}
                className={
                  index.currIndex === i + 1
                    ? "promotion-img is-active"
                    : "promotion-img"
                }
                src={property[0]}
                alt={`img${i + 1}`}
                width="270"
                height="270"
              />
            </Link>
          );
        })}
        <button className="previous" onClick={toPreviousIMG}>
          &lt;
        </button>
        <button className="next" onClick={toNextIMG}>
          &gt;
        </button>
        <div className="index-mark-container">
          {Array(imgCnt)
            .fill()
            .map((v, i) => {
              return (
                <span
                  className={
                    index.currIndex === i + 1
                      ? "index-mark is-active"
                      : "index-mark"
                  }
                  key={`mark${i + 1}`}
                ></span>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Promotion;
