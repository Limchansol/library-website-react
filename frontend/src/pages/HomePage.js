import BookChart from "../components/BookChart";
import BookOfTheMonth from "../components/BookOfTheMonth";
import Calender from "../components/Calender";
import Promotion from "../components/Promotion";
import style from "./HomePage.module.css";

function HomePage() {
  return (
    <div id={style.homePageContainer}>
      <div className={style.item}>
        <Promotion />
      </div>
      <div className={style.item}>
        <BookOfTheMonth />
      </div>
      <div className={style.item}>
        <Calender />
      </div>
      <div className={style.item}>
        <BookChart />
      </div>
    </div>
  );
}

export default HomePage;
