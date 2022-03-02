import axios from "axios";
import { useEffect, useState } from "react";
import style from "./CafePage.module.css";

function CafePage() {
  const [cafeMenu, setCafeMenu] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const cafeMenuData = await axios.get("/api/cafeMenu");
      setCafeMenu(cafeMenuData.data);
    };
    fetchData();
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
                {e.name} \{e.price}
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
                {e.name} \{e.price}
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
                {e.name} \{e.price}
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
                {e.name} \{e.price}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CafePage;
