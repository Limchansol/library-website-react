import React, { useEffect, useState } from 'react';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import img4 from '../images/img4.png';
import './Promotion.css';

function Promotion() {
  const numOfImgs = 4;
  const [intervalID, setIntervalID] = useState(0);
  const [index, setIndex] = useState({
    prevIndex: numOfImgs,
    currIndex: 1,
    nextIndex: 2,
  });

  const changePromotionImage = () => {
    setIndex((prev) => {
      return {
        ...prev,
        prevIndex: prev.currIndex,
        currIndex: prev.nextIndex,
        nextIndex: prev.nextIndex !== numOfImgs ? prev.nextIndex + 1 : 1,
      }
    });
  }

  const toPreviousIMG = () => {
    clearInterval(intervalID);
    setIndex((prev) => {
      return {
        ...prev,
        nextIndex: prev.currIndex,
        currIndex: prev.prevIndex,
        prevIndex: prev.prevIndex !== 1 ? prev.prevIndex - 1 : numOfImgs,
      }
    });
    const interval = setInterval(changePromotionImage, 2500);
    setIntervalID(interval);
  }
  
  const toNextIMG = () => {
    clearInterval(intervalID);
    setIndex((prev) => {
      return {
        ...prev,
        prevIndex: prev.currIndex,
        currIndex: prev.nextIndex,
        nextIndex: prev.nextIndex !== numOfImgs ? prev.nextIndex + 1 : 1,
      }
    });
    const interval = setInterval(changePromotionImage, 2500);
    setIntervalID(interval);
  }

  useEffect(() => {
    const interval = setInterval(changePromotionImage, 2500);
    setIntervalID(interval);
    return () => clearInterval(intervalID);
  }, [])

  const img1Class = index.currIndex === 1 ? "promotion-img is-active" : "promotion-img";
  const img2Class = index.currIndex === 2 ? "promotion-img is-active" : "promotion-img";
  const img3Class = index.currIndex === 3 ? "promotion-img is-active" : "promotion-img";
  const img4Class = index.currIndex === 4 ? "promotion-img is-active" : "promotion-img";

  const mark1Class = index.currIndex === 1 ? "index-mark is-active" : "index-mark";
  const mark2Class = index.currIndex === 2 ? "index-mark is-active" : "index-mark";
  const mark3Class = index.currIndex === 3 ? "index-mark is-active" : "index-mark";
  const mark4Class = index.currIndex === 4 ? "index-mark is-active" : "index-mark";

  const arrForImg = [[img1Class, img1], [img2Class, img2], [img3Class, img3], [img4Class, img4]];
  const arrForMark = [mark1Class, mark2Class, mark3Class, mark4Class];

  return (
    <>
      <div id="promotion">
        {arrForImg.map((property, i) => {
          return (
            <img id={`img${i + 1}`} className={property[0]} key={`img${i + 1}`}
              src={property[1]} alt={`img${i + 1}`} width="270" height="270" />
          );
        })}
        <button className="previous" onClick={toPreviousIMG}>&lt;</button>
        <button className="next" onClick={toNextIMG}>&gt;</button>
        <div className="index-mark-container">
          {arrForMark.map((className, i) => {
            return (
              <span className={className} key={`mark${i + 1}`}></span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Promotion;