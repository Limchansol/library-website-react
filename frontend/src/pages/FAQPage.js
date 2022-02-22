import { useState } from "react";
import FAQItem from "../components/FAQItem";

function FAQPage() {
  // 나중에는 서버에서 받아올 것
  const rawFAQList = [
    {
      title: "회원탈퇴는 어떻게 하나요?",
      content: "아직 회원가입 구현을 못했어요.",
      number: 1,
    },
    {
      title: "대여나 반납은 어떻게 하나요?",
      content: "도서관에 오면 됩니다.",
      number: 2,
    },
    {
      title: "대여 예약 후 며칠 안에 대여해야 하나요?",
      content: "아직 안 정했어요.",
      number: 3,
    },
    {
      title: "대여 기간은 며칠인가요?",
      content: "아마 2주인 것 같습니다.",
      number: 4,
    },
    {
      title: "대여 기간을 연장할 수 있나요?",
      content: "대여 예약한 사람이 없으면 한 번 연장할 수 있어요.",
      number: 5,
    },
    {
      title: "대여했는데 반납하지 못해서 연체되었어요. 어떻게 해야 하나요?",
      content: "연체한 기간만큼 책을 못 빌립니다. 빨리 반납해 주세요.",
      number: 6,
    },
    {
      title: "대여한 책을 훼손하거나 잃어버렸어요. 어떻게 해야 하나요?",
      content:
        "동일한 책으로 배상해주셔야 합니다.\n책을 소중히 여깁시다. \n책 날개를 쓰거나 책을 접지 말고 책갈피를 활용합시다. \n대여한 책은 그대것이 아니니 낙서하지 맙시다.",
      number: 7,
    },
    {
      title: "영화로 세상읽기 프로그램에 참여하려면 어떻게 해야 하나요?",
      content:
        "별다른 절차는 없습니다. 화요일 저녁 7시 30분까지 북악하늘 작은도서관에 오시면 됩니다.",
      number: 8,
    },
  ];

  const [keyword, setKeyword] = useState("");
  const [filteredFAQList, setFilteredFAQList] = useState(rawFAQList);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.length === 0) return;
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <h2 className="FAQ">자주 묻는 질문</h2>
      <form className="FAQ-search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="질문을 검색하세요."
        />
        <button>검색</button>
      </form>
      <ul className="FAQ-list">
        {filteredFAQList.map((question) => {
          return <FAQItem question={question} key={question.number} />;
        })}
      </ul>
    </>
  );
}

export default FAQPage;
