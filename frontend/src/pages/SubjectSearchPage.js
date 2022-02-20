import "./SubjectSearchPage.css";
import axios from "axios";
function SubjectSearchPage() {
  const subject = [
    "총류",
    "철학",
    "종교",
    "사회과학",
    "자연과학",
    "기술과학",
    "예술",
    "언어",
    "문학",
    "역사",
  ];
  const fetchBookForSubj = async (subNum) => {
    const books = await axios.get(`/api/books/subject?subNum=${subNum}`);
    return books;
  };
  const findSubjectNumber = (e) => {
    const subnum = subject.findIndex((a) => a === e.target.id);
    const books = fetchBookForSubj(subnum);
    console.log(books);
  };
  return (
    <>
      <div id="subjectButton">
        {subject.map((e, i) => {
          return (
            <button id={e} key={i} onClick={findSubjectNumber}>
              {e}
            </button>
          );
        })}
      </div>
      <div id="showBook">
        <></>
      </div>
    </>
  );
}

export default SubjectSearchPage;
