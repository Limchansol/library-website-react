# 리액트로 도서관 웹사이트 만들기

1. 기존에 만들었던 작은 도서관 사이트 리액트로 전환하기 
   -기존에 있던 class -> className -인라인 스타일: 객체 형식으로 추가
   -setInterval problem: useEffect훅으로 해결했으나, 오류가 있을 것으로 추정. 추후 수정할 것.

2. 검색 기능 활성화 -책 이름 혹은 키워드로 검색할 수 있도록 기능 추가 
   -백엔드 서버에서 book data를 받아오는데, 전체 data를 받고 filter를 front에서 하는게 비효율적.
    추후 mongoose library의 find메소드를 이용해서 벡엔드에서 해결 -저자, 출판사 등으로 검색할 수 있도록 수정 예정, 먼저 결과창에 표시할 알고리즘 추가 예정(우선적으로 보여줄 데이터)

3. 로그인, 회원가입 페이지
   -REST API를 통해서 구현. POST리퀘스트를 통해서 로그인과 회원가입을 구현했으나, 비밀번호 암호화가 이루어지지 않아 보안상
    문제가 있을 것으로 예상. bycript library, token을 이용해 보다 정교하게 구현하도록 수정 예정. 
   -받아온 유저 정보를 다룰 수 있는 frontend사이드 로직(로그인 후 마이페이지 등) 추가 예정.

4. 현재 진행중인 업데이트
   -client side: 회원가입 페이지, 카페 메뉴판 화면 만들기
   -server side: 로그인과 회원가입 구현하기
