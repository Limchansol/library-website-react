import axios from "axios";
import style from "./ReservedBookItem.module.css";

function ReservedBookItem({ loginInfo, book }) {
  // 도서 예약 취소
  const cancelReservation = async () => {
    const confirmCancel = window.confirm(
      `『${book.title}』 도서 예약을 취소하시겠습니까?`
    );
    if (!confirmCancel) return;
    try {
      await axios.put(
        "api/users/reservedBookDelete",
        {
          bookId: book._id,
        },
        {
          headers: { token: loginInfo.token },
        }
      );
      if (book.state === "reservation") {
        await axios.put("/api/books/reservedBookUpdate", {
          _id: book._id,
          changeTo: "rental",
        });
      } else if (book.state === "ready") {
        await axios.put("/api/books/reservedBookUpdate", {
          _id: book._id,
          changeTo: "none",
        });
      }

      alert(`『${book.title}』 도서 예약이 취소되었습니다.`);
      window.location.reload();
    } catch (error) {
      console.log("도서 예약 삭제 오류", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <tr>
      <td>{book.title}</td>

      <td>{book.state === "reservation" ? "정상 예약중" : "대여 가능"}</td>
      <td>
        <button onClick={cancelReservation}>취소하기</button>
      </td>
    </tr>
  );
}

export default ReservedBookItem;
