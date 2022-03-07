const bcrypt = require("bcryptjs/dist/bcrypt");
const rawBook = require("./rawBookData.js");

const data = {
  users: [
    {
      name: "wonwoo",
      id: "jww0418",
      password: bcrypt.hashSync("123", 10),
      isAdmin: true,
      phone: "01067381518",
      gender: "male",
      yyyy: "2001",
      mm: "04",
      dd: "18",
      email: "jww0418@naver.com",
      borrowedBooks: [
        {
          title: "Do it! HTML + CSS + 자바스크립트 웹 표준의 정석",
          loanStartYYYY: 2022,
          loanStartMM: 2,
          loanStartDD: 22,
        },
        {
          title: "Do it! 점프 투 파이썬",
          loanStartYYYY: 2022,
          loanStartMM: 2,
          loanStartDD: 23,
        },
      ],
      interestingBooks: [],
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
      state: "none",
    },
    {
      id: 2,
      title: "Do it! 점프 투 파이썬",
      writer: "박응용",
      publisher: "이지스퍼블리싱",
      ISBN: "9791163030911",
      date: "2019-06-20",
      keyword: "python",
      state: "none",
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
  programInfo: {
    year: 2022,
    season: 1,
    theme: "국민의 주권, 선거 그리고 민주주의",
    intro:
      "선거는 국민이 참여하는 민주주의의 근간이자 핵심입니다. 유권자는 가장 올바르고 적당한 인물을 선출할 권리와 의무를 갖습니다. 그렇다면 우리는 어떤 기준과 어떤 가치관으로 정치를 보고, 어떻게 선거에 참여해야 할까요? 영화와 함께 생각해봅시다.",
    movies: [
      {
        number: 1,
        title: "대통령의 연인 (The American President, 1995)",
        director: "롭 라이너",
        date: "1월 11일(화)",
        storyLine:
          "1영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
      {
        number: 2,
        title: "불워스 (Bulworth, 1998)",
        director: "워렌 비티",
        date: "1월 18일(화)",
        storyLine:
          "2영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
      {
        number: 3,
        title: "스윙 보트 (Swing Vote, 2008)",
        director: "조슈아 마이클 스턴",
        date: "1월 25일(화)",
        storyLine:
          "3영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
      {
        number: 4,
        title: "킹메이커 (The Ides of March, 2011)",
        director: "조지 클루니",
        date: "2월 8일(화)",
        storyLine:
          "4영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
      {
        number: 5,
        title: "선거 캠페인 (The Campaign, 2011)",
        director: "제이 로치",
        date: "2월 15일(화)",
        storyLine:
          "5영화 내용 대충 써놓기. 무슨 내용인지 나도 모른다. 졸리다. 겸둥이. 영화 보고 싶다. 언차티드 재밌어보이던데 개강하기 전에 봐야겠다.",
      },
    ],
  },
  rawFAQList: [
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
  ],
  noticeList: [
    {
      id: "1",
      title: "2022년 영화로 세상 읽기 시즌1 시작합니다!",
      content:
        "2022년 영화로 세상 읽기 시즌1을 시작합니다. 이번 시즌 주제는 '선거'입니다. '영화로 세상읽기'는 누구나 참여할 수 있는 프로그램입니다. 화요일 저녁 7시 30분까지 북악하늘 작은도서관으로 오세요!",
      createdAt: "2022-02-22",
      writer: "chans",
    },
    {
      id: "2",
      title: "북악하늘 공지",
      content:
        "뭐라고 써야 할지 모르겠지만 아무튼 이것은 공지입니다. 쓸 내용이 없어서 고민입니다. 이 내용에서 줄바꿈을 하고 싶으면 어떻게 해야 하지. 아직도 갈 길이 멀다. 모르는게 이미 산더미인데 하면 할수록 내가 뭔가를 알고 있기는 한 건가 싶다. ㅠㅠㅠㅠㅠㅠㅠㅠ",
      createdAt: "2022-02-23",
      writer: "chans",
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
      : -418, //kdc에서 문제 일어나는 애들 출력해봤더니, "808 863"이렇게 2개를 가지거나 "812,123.3"이런 형태가 있어서 형변환이 안되는 경우가 존재했음.
    state: "none",
  });
});
module.exports = data;
