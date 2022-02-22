import { useState } from "react";
import "./FAQItem.css";

function FAQItem({ question }) {
  const [selected, setSelected] = useState(false);

  const FAQContentClass = selected ? "FAQ-content is-active" : "FAQ-content";

  const toggleFAQItem = () => {
    setSelected((prev) => (prev ? false : true));
  };

  return (
    <li className="FAQ-item">
      <h4 className="FAQ-title" onClick={toggleFAQItem}>
        Q. {question.title}
      </h4>
      <div className={FAQContentClass}>A. {question.content}</div>
    </li>
  );
}

export default FAQItem;
