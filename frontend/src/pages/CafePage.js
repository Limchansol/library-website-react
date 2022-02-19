import axios from "axios";
import { useEffect, useState } from "react";
import "./CafePage.css";

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
    <div id="cafePage">
      <div id="title">CAFE MENU</div>
      <div id="coffee">
        <div className="menuHead">coffee</div>
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
      <div id="tea">
        <div className="menuHead">tea</div>
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
      <div id="beverage">
        <div className="menuHead">beverage</div>
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
      <div id="snack">
        <div className="menuHead">snack</div>
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
