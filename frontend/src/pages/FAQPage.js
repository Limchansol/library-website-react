import { useEffect, useState } from "react";
import FAQItem from "../components/FAQItem";
import axios from "axios";
import style from "./FAQPage.module.css";

function FAQPage() {
  useEffect(() => {
    const fetchFAQ = async () => {
      const faqs = await axios.get("/api/FAQs");
      setFilteredFAQList(faqs.data);
    };
    fetchFAQ();
  }, []);

  const [keyword, setKeyword] = useState("");
  const [filteredFAQList, setFilteredFAQList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.length === 0) return;
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <h1 id={style.title}>자주 묻는 질문</h1>
      <form className={style.FAQSearchForm} onSubmit={handleSubmit}>
        <input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="질문을 검색하세요."
        />
        <button>검색</button>
      </form>
      <ul className={style.FAQList}>
        {filteredFAQList?.map?.((question) => {
          return <FAQItem question={question} key={question.number} />;
        })}
      </ul>
    </>
  );
}

export default FAQPage;
