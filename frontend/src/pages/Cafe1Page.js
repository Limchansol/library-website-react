import axios from "axios";
import { useEffect, useState } from "react";

function Cafe1Page() {
  const [cafeMenu, setCafeMenu] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const cafeMenuData = await axios.get("/api/cafeMenu");
      setCafeMenu(cafeMenuData.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>CAFE MENU</h1>
      <div id="coffee">
        <div className="menuHead">coffee</div>
        <ul>
          {cafeMenu.map((e) => {
            if (e.type != "coffee") return;
            return (
              <li key={e._id}>
                {e.name} {e.price}
              </li>
            );
          })}
        </ul>
      </div>
      <div id="tea">
        <div className="menuHead">tea</div>
        <ul>
          {cafeMenu.map((e) => {
            if (e.type != "tea") return;
            return (
              <li key={e._id}>
                {e.name} {e.price}
              </li>
            );
          })}
        </ul>
      </div>
      <div id="beverage">
        <div className="menuHead">beverage</div>
        <ul>
          {cafeMenu.map((e) => {
            if (e.type != "beverage") return;
            return (
              <li key={e._id}>
                {e.name} {e.price}
              </li>
            );
          })}
        </ul>
      </div>
      <div id="snack">
        <div className="menuHead">snack</div>
        <ul>
          {cafeMenu.map((e) => {
            if (e.type != "snack") return;
            return (
              <li key={e._id}>
                {e.name} {e.price}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Cafe1Page;
