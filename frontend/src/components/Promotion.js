import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PromotionSlide from "./PromotionSlide";
import style from "./Promotion.module.css";

function Promotion() {
  const [intervalID, setIntervalID] = useState(0);
  const [currIndex, setCurrIndex] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [arrForImg, setArrForImg] = useState([]);
  const screenRef = useRef();
  let imgCnt = arrForImg.length;
  const slideWidth = 290;
  const slideContainerStyle = {
    width: `${slideWidth * (imgCnt + 2)}px`,
    left: `${-slideWidth * currIndex}px`,
  };

  /* 애니메이션을 넣었다 뺐다 하는 일종의 속임수 사용해서 무한 슬라이드 구현
     다만 애니메이션 잠깐 뺀 상태에서 유저가 슬라이드를 수동으로 움직이면
     움직임이 뻣뻣하다는 문제가 있음 */

  const changePromotionImage = () => {
    // 컴포넌트가 새로 랜더링되든 말든 setInterval은 clear하지 않는 이상 처음에 받은 값 가지고 자기 할일 함
    // setInterval로 일정 시간마다 state를 업데이트해주고 싶으면 setState 콜백 써서 최신값 받아야 함
    setCurrIndex((prev) => {
      if (prev === imgCnt) {
        setTimeout(() => {
          setAnimated(false);
          setCurrIndex(1);
        }, 400);
        setTimeout(() => {
          setAnimated(true);
        }, 450);
      }
      return prev + 1;
    });
  };

  const toPreviousIMG = () => {
    setCurrIndex((prev) => prev - 1);
    if (currIndex === 1) {
      setTimeout(() => {
        setAnimated(false);
        setCurrIndex(imgCnt);
      }, 400);
      setTimeout(() => {
        setAnimated(true);
      }, 450);
    }
    const interval = setInterval(changePromotionImage, 2500);
    setIntervalID(interval);
  };

  const toNextIMG = () => {
    setCurrIndex((prev) => prev + 1);
    if (currIndex === imgCnt) {
      setTimeout(() => {
        setAnimated(false);
        setCurrIndex(1);
      }, 400);
      setTimeout(() => {
        setAnimated(true);
      }, 450);
    }
    const interval = setInterval(changePromotionImage, 2500);
    setIntervalID(interval);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const promotionImg = await axios.get("/api/promotions/", {
          cancelToken: source.token,
        });
        promotionImg.data.map((e) => {
          setArrForImg((prev) => [
            ...prev,
            [e.ad.data, e.ad.link, e.ad.contentType],
          ]);
        });
        imgCnt = promotionImg.data.length;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => source.cancel("페이지 이동으로 api요청이 취소되었습니다.");
  }, []);

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

  return (
    <div id={style.promotionScreen} ref={screenRef}>
      {arrForImg.length === 0 ? undefined : (
        <>
          <div
            className={`${style.slideContainer} ${
              animated ? style.animated : ""
            }`}
            style={slideContainerStyle}
          >
            {/* 무한 슬라이드 만들기 위해 맨앞에 마지막 이미지 덧붙임 */}
            <PromotionSlide imgInfo={arrForImg[imgCnt - 1]} index={imgCnt} />
            {arrForImg.map((e, i) => {
              return <PromotionSlide imgInfo={e} index={i} key={i} />;
            })}
            {/* 무한 슬라이드 만들기 위해 맨 뒤에 첫번째 이미지 덧붙임 */}
            <PromotionSlide imgInfo={arrForImg[0]} index={1} />
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
                  /* 슬라이드와 인덱스가 같은 경우에만 활성화되도록 해놓았으므로
                 맨끝이나 맨마지막 슬라이드에서 정상적인 슬라이드로 바뀔 때까지 잠깐 동안은
                 아무 마크도 활성화되지 않음 */
                  <span
                    className={`${style.indexMark} ${
                      style[currIndex === i + 1 ? "active" : ""]
                    }`}
                    key={`mark${i + 1}`}
                  ></span>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default Promotion;
