import BookOfTheMonth from "../components/BookOfTheMonth";
import Calender from "../components/Calender";
import Promotion from "../components/Promotion";

function HomePage() {
  return (
    <>
      <div>홈페이지</div>
      <Promotion />
      <BookOfTheMonth />
      <Calender />
    </>
  );
}

export default HomePage;
