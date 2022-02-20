const rawBook = require("./rawBookData.js");

const data = {
  users: [
    {
      name: "wonwoo",
      id: "jww0418",
      password: "123",
      isAdmin: true,
      phone: "010-6738-1518",
      gender: "male",
      yyyy: "2001",
      mm: "04",
      dd: "18",
      email: "jww0418@naver.com",
    },
  ],
  books: [
    {
      id: 1,
      title: "Do it! HTML + CSS + 자바스크립트 웹 표준의 정석",
      writer: "고경희",
      publisher: "이지스퍼블리싱",
      ISBN: "9791163032212",
      date: "2021-01-22",
      keyword: "프론트엔드 frontend javascript",
    },
    {
      id: 2,
      title: "Do it! 점프 투 파이썬",
      writer: "박응용",
      publisher: "이지스퍼블리싱",
      ISBN: "9791163030911",
      date: "2019-06-20",
      keyword: "python",
    },
  ],
  cafeMenu: [
    {
      name: "아메리카노",
      price: "2500",
      type: "coffee",
    },
    {
      name: "카페라떼",
      price: "3000",
      type: "coffee",
    },
    {
      name: "바닐라라떼",
      price: "3500",
      type: "coffee",
    },
    {
      name: "카페모카",
      price: "4000",
      type: "coffee",
    },
    {
      name: "큐프라떼",
      price: "4000",
      type: "coffee",
    },
    {
      name: "캬라멜마끼아또",
      price: "4000",
      type: "coffee",
    },
    {
      name: "핸드드립",
      price: "4000",
      type: "coffee",
    },
    {
      name: "밀크티",
      price: "3500",
      type: "tea",
    },
    {
      name: "카모마일/페퍼민트",
      price: "3000",
      type: "tea",
    },
    {
      name: "유자/레몬청",
      price: "3000",
      type: "tea",
    },
    {
      name: "레몬생강청",
      price: "3000",
      type: "tea",
    },
    {
      name: "하비스커스/율무",
      price: "3000",
      type: "tea",
    },
    {
      name: "우엉/메밀",
      price: "3000",
      type: "tea",
    },
    {
      name: "착즙 오렌지 쥬스",
      price: "2500",
      type: "beverage",
    },
    {
      name: "바나나 쥬스",
      price: "3500",
      type: "beverage",
    },
    {
      name: "과일 요거트 스무디",
      price: "4000",
      type: "beverage",
    },
    {
      name: "초코",
      price: "3000",
      type: "beverage",
    },
    {
      name: "자몽오렌지",
      price: "3000",
      type: "beverage",
    },
    {
      name: "레몬네이드",
      price: "3000",
      type: "beverage",
    },
    {
      name: "복숭아에이드",
      price: "2500",
      type: "beverage",
    },
    {
      name: "복숭아 아이스티",
      price: "2000",
      type: "beverage",
    },
    {
      name: "티라미수/쇼콜라 케잌",
      price: "4000",
      type: "snack",
    },
    {
      name: "스틱 티라미수케잌",
      price: "2500",
      type: "snack",
    },
    {
      name: "구운식빵과 크림치즈",
      price: "2000",
      type: "snack",
    },
    {
      name: "초코바 2개",
      price: "1000",
      type: "snack",
    },
    {
      name: "구운식빵 1장",
      price: "1000",
      type: "snack",
    },
  ],
};

rawBook.forEach((e, i) => {
  data.books.push({
    id: i + 3,
    title: e.dcBookCatalogBasic.title,
    writer: e.dcBookCatalogBasic.author,
    publisher: e.dcBookCatalogBasic.publisher,
    ISBN: e.dcBookCatalogBasic.isbn,
    kdc: Number(e.dcBookCatalogBasic.bookList[0].call_no)
      ? Number(e.dcBookCatalogBasic.bookList[0].call_no)
      : -1, //kdc에서 문제 일어나는 애들 출력해봤더니, "808 863"이렇게 2개를 가지거나 "812,123.3"이런 형태가 있어서 형변환이 안되는 경우가 존재했음.
  });
});
module.exports = data;
