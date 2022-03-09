import axios from "axios";
import { useEffect, useState } from "react";
import style from "./CafePage.module.css";

function CafePage() {
  const [cafeMenu, setCafeMenu] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const cafeMenuData = await axios.get("/api/cafeMenu", {
          cancelToken: source.token,
        });
        setCafeMenu(cafeMenuData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => source.cancel("페이지 이동으로 api요청이 취소되었습니다.");
  }, []);
  return (
    <div id={style.cafePage}>
      <div id={style.title}>CAFE MENU</div>
      <div id={style.coffee}>
        <div className={style.menuHead}>coffee</div>
        <ul>
          {cafeMenu.map((e) => {
            if (e.type !== "coffee") return undefined;
            return (
              <li key={e._id}>
                {e.name} &#8361;{e.price}
              </li>
            );
          })}
        </ul>
      </div>
      <div id={style.tea}>
        <div className={style.menuHead}>tea</div>
        <ul>
          {cafeMenu.map((e) => {
            if (e.type !== "tea") return undefined;
            return (
              <li key={e._id}>
                {e.name} &#8361;{e.price}
              </li>
            );
          })}
        </ul>
      </div>
      <div id={style.beverage}>
        <div className={style.menuHead}>beverage</div>
        <ul>
          {cafeMenu.map((e) => {
            if (e.type !== "beverage") return undefined;
            return (
              <li key={e._id}>
                {e.name} &#8361;{e.price}
              </li>
            );
          })}
        </ul>
      </div>
      <div id={style.snack}>
        <div className={style.menuHead}>snack</div>
        <ul>
          {cafeMenu.map((e) => {
            if (e.type !== "snack") return undefined;
            return (
              <li key={e._id}>
                {e.name} &#8361;{e.price}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CafePage;
