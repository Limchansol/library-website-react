import { useState } from "react";
import style from "./FAQItem.module.css";

function FAQItem({ question }) {
  const [selected, setSelected] = useState(false);

  const FAQContentClass = selected ? "is-active" : "";

  const toggleFAQItem = () => {
    setSelected((prev) => (prev ? false : true));
  };

  return (
    <li className={style["FAQ-item"]}>
      <h4 className={style["FAQ-title"]} onClick={toggleFAQItem}>
        Q. {question.title}
      </h4>
      <div className={`${style["FAQ-content"]} ${style[FAQContentClass]}`}>
        A. {question.content}
      </div>
    </li>
  );
}

export default FAQItem;
