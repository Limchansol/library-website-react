import { Link } from "react-router-dom";
import style from "./PromotionSlide.module.css";

function PromotionSlide({ imgInfo, index }) {
  return (
    <div className={style.promotionSlide}>
      <Link to={imgInfo[1]}>
        <img
          id={`img${index + 1}`}
          src={`data:${imgInfo[2]};base64, ${imgInfo[0]}`}
          alt={`img${index + 1}`}
          width="290"
          height="290"
        />
      </Link>
    </div>
  );
}

export default PromotionSlide;
