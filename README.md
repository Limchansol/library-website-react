# 리액트로 도서관 웹사이트 만들기  

**BuildTools:** ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) 

**Version Control:** ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)   

**Language:** ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 

**Frontend:** ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)   

**Web API:** ![KakaoTalk](https://img.shields.io/badge/kakaotalk-ffcd00.svg?style=for-the-badge&logo=kakaotalk&logoColor=000000)   

**Backend:**  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)   

**Major-Package:** ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)  ![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)    ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**Database:** ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)	   

## INDEX
 + [NPM SCRPITS](#npm-scripts) 
 + [웹사이트 기능](#웹사이트에-구현한-기능)
 + [프로젝트 복기(서버)](#프로젝트-복기-with-server)

## NPM SCRIPTS  
````
npm run seed //MONGODB에 seed를 넣는 명령어
npm run dev  //서버와 클라이언트를 동시에 실행시키지만, 서버는 nodemon으로 실행시키는 명령어
npm run server
npm run client //각각 서버와 클라이언트를 실행시키는 명령어
npm run start //배포용 서버와 클라이언트를 동시에 실행시키는 명령어
````

## 웹사이트에 구현한 기능   

**네비게이션**   

상단   

- 로고, 검색바, 유틸메뉴로 구성.   
- 검색바에서는 종류별(저자, 책 이름, 통합 검색 등) 검색이 가능하도록 search기능 구현.   

하단   

- 네비게이션 메뉴를 통해 다른 페이지로 이동 가능.   
- 네비게이션 바에 hover하면, 세부 메뉴가 나타나도록 구현.   

**홈 화면**   

- 배너 광고가 일정 시간마다 내용이 바뀌도록 애니메이션 구현.   

- 이달의 책 컴포넌트 구현. 클릭시 이달의 책 페이지로 이동.   

- 도서관 일정 캘린더 컴포넌트 구현. 오늘 날짜 표시.   

- 도서관 책 보유 현황 chart.js로 구현.   

**소개 메뉴**   

- 소개 문구가 들어가도록 구현.  

- 카카오맵 api로 오는길 표시.   

**도서관 이용 메뉴**   

- 도서관 이용에 관한 내용 서술.   

**도서관 자료 메뉴**   

- 주제별, 상세 검색이 가능하도록 구현   

**도서관 활동 메뉴**    

- 도서관 활동에 대해 서술.    
 
- 영화로 세상읽기 서브 메뉴에서 애니메이션을 이용해 상영 영화를 살펴볼 수 있도록 구현.     

**알림 및 소통 메뉴**    

- 문의, FAQ등을 구현.   

**로그인/회원가입**    

- 로그인과 회원가입을 jwt / access토큰과 refresh토큰 방식으로 구현.      

- 새로고침을 해도 로그인 정보가 날아가지 않도록 세션 스토리지에 정보 일시적으로 저장.     

- 받아온 토큰을 **RECOIL**을 이용하여 저장.   
   
   
**마이페이지**   

- 로그인시 활성화.   

- 관심도서를 지정할 수 있고, 관심도서 책 모양을 클릭 시 저장한 관심도서의 상세 내용을 살펴볼 수 있도록 이미지 확대.    
  
- 대여/예약한 책을 살펴볼 수 있도록 구현.    


**관리자 페이지**   

- 관리자가 받아온 문의에 답할 수 있도록 구현.   

- 프로모션이나 상영하는 영화 등, 바뀔 수 있는 정보에 대해 수정할 수 있도록 구현.   


1. 기존에 만들었던 작은 도서관 사이트 리액트로 전환하기

   -기존에 있던 class -> className -인라인 스타일: 객체 형식으로 추가

   -setInterval problem: useEffect훅으로 해결했으나, 오류가 있을 것으로 추정. 추후 수정할 것.

2. 검색 기능 활성화(책 이름 혹은 키워드로 검색할 수 있도록 기능 추가)

   -먼저 결과창에 표시할 알고리즘 추가 예정(우선적으로 보여줄 데이터)

3. 로그인, 회원가입 페이지

   -REST API를 통해서 구현. POST리퀘스트를 통해서 로그인과 회원가입을 구현.

   -서버사이드에서 비밀번호를 bcript로 암호화.

   -로그인시 jwt로 토큰을 발행하고 전달.

   -받아온 유저 정보를 다룰 수 있는 frontend사이드 로직(로그인 후 마이페이지 등) 추가 예정.

4. 현재 진행중인 업데이트

   -client side: 도서 대출/예약 메뉴, 로그인 시 변경점 추가

   -server side: 로그인과 회원가입

5. 내비게이션바 구성

   - 북악하늘 소개

     - 인사말
     - 오시는 길(연락처 포함)
     - 소개3(미정)

   - 도서관 이용

     - 이용 시간
     - 도서 대여/예약/반납 안내
     - 북악하늘 카페

   - 도서관 자료

     - 상세 검색(제목, 지은이, 출판사, isbn 등 일괄 검색 가능하도록)
     - 주제별 검색(eg. 자연과학(500번대 도서), 문학(800번대 도서) 등)
     - 희망 도서 신청?

   - 도서관 활동

     - 영화로 세상 읽기
     - 책으로 무언가 하기(북스터디, 북스타트, 독서 감상문?)
     - 지역에서 무언가 하기(원데이 클래스, 책 나눔)

   - 알림 및 소통
     - 공지사항
     - FAQ
     - 문의

6. 홈 화면 구성

   - 프로그램 홍보 슬라이드
   - 일정 캘린더
   - 이달의 추천도서
   - 이달의 독서왕?

7. 발견된 버그
   - 받아온 책 데이터의 중복 데이터가 존재. 이로 인해서 key를 설정할 때 오류가 발생(책 검색후 없어지지 않음)
   - 받아온 책 데이터가 아무렇게나 보여짐
   - 데이터 가공(저자 형식이나 분류 형식이 엉망)
   - 페이지네이션 추가 실패

## 프로젝트 복기 with Server

[2022. 2. 11]

작은 도서관 프로젝트 시작.

[2022. 2. 12]

클라이언트와 서버로 전체 폴더 구성을 나누고, 프록시를 설정함.

**개념:**

**프록시** – 클라이언트에서 요청을 보내는 곳으로, 중간다리 역할. 추후에 자세히 알아보기.

**기술:**

**프록시 설정** - 프론트 엔드 패키지에 proxy: server주소 형태로 써주면 됨.

**폴더 구조** – 프론트 엔드 폴더를 만들고, 패키지화 한 후 서버 폴더를 만들고 패키지화.

[2022. 2. 13]

몽고DB에 연결.

**개념:**

**NoSQL** - SQL이라는 유명한 database의 형태가 아닌 모든 database를 통칭해 이르는 말. sql을 잘 몰라서 구별되는 특징을 아직 모름.

**ODM** - NoSQL에서 document database를 지원하기 위해 데이터를 변환해주는 기법. 쉽게 말해 node에서 쓴 mongoose가 mongoDB에 저장되도록 하는 기법

**CRUD** – 데이터를 다루는 기초적인 명령. create read update delete

**기술:**

**mongoose** – ODM패키지.

연결: mongoose.connect(process.env.DB || http://localhost/minilibrary)

스키마: 어떤 형태의 데이터인지 계획서. const mySchema = new mongoose.Schema({
name: {type: String, required: true, }
}) 생성자이므로 new를 쓰는게 포인트.

모델: 스키마를 가지고 만들어진, 구체적인 모델. 생성자라서 대문자로 이름 짓는다.

const Me = mongoose.model(“모델이름”, 스키마) 모델이름의 맨 앞이 소문자가 되고 뒤에 s가 붙는다. 이후 모델 이름은 Me.

CRUD구현:

Me.insertMany([{name: wonwoo}, {name: jangWW}]) 여러 개의 모델을 한번에 저장.

const I = new Me({name: wonwoo})하고 나서 I.save() 하나의 모델 저장

Me.find({}) 쿼리를 만족하는 거 다 찾음.

Me.findOne({})만족하는 거 하나만 찾음. 당연히 find보다 시간 절약.

Me.update({조건}, {업데이트 할 내용}, {옵션. 나는 주로 $upsert사용}) $upsert는 조건에 해당하는 모델 없으면 새로 만들라는 뜻. mongoose는 아예 내용을 덮어쓰는 게 아니라 병합해 주는 게 default.

Me.delete({조건}) 해당하는 거 삭제.

[2022. 2. 14]

프론트 엔드 담당자와 스키마 형식 상의. 날짜를 표현할 때 date보다 년-월-일 분리하도록 결정. 이유는 잘 모르겠으나 프론트에서 그렇게 처리하는 게 편하다고 함.

[2022. 2. 15]  
중복된 아이디로 회원가입이 불가능하도록 설정.

종류별로 검색 기능이 가능하도록 활성화. 통합검색, 작가로 검색 등등을 구별.

**기술:**

**rest client** - vsCode확장으로, test.http와 같은 파일 형식을 만들고, ###로 각 요청을 구별해 임시 요청을 보낼 수 있다. postman과 비슷.

GET https://localhost:5000/api/users이런 식으로.

[2022. 2. 17]

npm script를 수정해서 npm start로 클라이언트와 서버 동시에 실행할 수 있도록 만들었다.  
또한 기존의 검색은, 예를 들어 작가 이름이 정확해야 작가검색이 되었으나 이름의 일부만 검색해도 나오도록 수정하였다.

**개념:**

**npm script** - npm script에서 커스텀 명령어를 등록할 수 있다. start와 같이 미리 정의된 명령은 npm start로 할 수 있지만, 대부분의 경우 npm run customScript처럼 run을 이용한다.

**기술:**

**concurrently** – 동시의 2개의 명령어를 실행시켜주는 package이다. script에 concurrently를 이용해 사용 가능.

**쿼리** – CRUD에서 모델을 지정하는, 일종의 조건. mongoose에서 find메소드를 사용할 때, 정규표현식을 이용해 특정 문자열이 포함되는지 확인할 수 있다. $regex이용.

[2022. 2. 22]

버그를 수정하였다. 특수문자로 검색을 할 수 있는데, 이때 문제가 발생한다.

**버그:**

$regex는 정규표현식이기 때문에, 특수문자가 들어간 검색일 경우 오류가 발생한다. 따라서 특수문자를 escape을 해주도록 String.replace()를 간단히 이용해 escape를 해주었다.

[2022. 2. 23]

로그인 로직을 구현하였다. 아직은 refresh토큰을 구현하지는 않았고, access토큰만 이용하였다. 또한 비밀번호를 암호화하였고, 환경변수를 세팅하였다.

**개념:**

**jwt** – json web token. 무엇을 줄인건지 알면 의미를 알기 쉽다. 말 그대로 json형식의 토큰이다.

1. 한번 발행된 토큰은 관리자가 관리할 수 없다. =>만료 기간을 넣는다.

2. 토큰에는 헤더, 페이로드, 서명으로 나뉜다. 헤더에는 해싱 알고리즘과 타입(jwt), 페이로드는 간단한 정보, 서명은 비밀값을 이용한 유효한지 확인할 때 사용하는 용도이다.

**bcrypt** – 해시 암호화를 시켜주는, 어떠한 알고리즘이다. 브루트포스 공격을 대비해준다고 한다. 비밀번호를 생성할 때 이용한다.

환경변수 – 관리자만 알아야 하는, 중요한 변수. 일반적으로 프로그램이 배포될 때, 구멍을 뚫어놓고 그 자리에 변수를 채울 수 있도록 한다. 그 변수가 바로 환경변수. 각각의 컴퓨터 환경마다 다른 변수일 것이다.

**기술:**

**jsonwebtoken** – jwt를 만들어주는 패키지이다.

jwt.sign({페이로드에 들어갈 정보}, 비밀키, {옵션. 만료기간 지정 등을 한다}).

jwt.verify(토큰, 비밀키, (err, decoded) => {}) err는 에러, decoded는 해독된 정보를 담는다(페이로드).

**dotenv** – 프로젝트 파일 내에서 환경변수를 세팅할 수 있도록 하는 패키지이다.

dotenv.config()를 server.js의 최상단에 써주면(import 문단 바로 밑) process.env뒤의 변수를 지정할 수 있다.  
.env파일 내에서 변수를 지정하면 된다.

**bcrypt** – 비밀번호를 생성해주는 패키지.

bcrypt.hasSync(비밀번호, salt) salt는 의미없는, 하지만 암호 생성에 관여하는 것이다. 비밀번호 암호화해서 생성.

bcrypt.compareSync(대상 비밀번호, DB에 저장된 비밀번호) 비밀번호가 유효한지 검증. bool return.

참고로 Sync는 js에서 동기함수를 표현할 때 쓰는 naming convention인 것 같다.

**의문:**

login요청은 post로 하던데, 왜 그럴까? 또 해싱이라는 것은 무엇이며, 구체적인 알고리즘이 무엇일까?

[2022. 2. 24]

변동 가능한 데이터(관리자가 시간이 지나면서 바꿔줘야 할 것 같은 데이터)들은 모두 서버에 저장해야 된다는 것을 깨닫고, 서버에 저장해 불러오도록 하였다.

또한 token을 전달할 때 headers에 넣어서 전달하는 것을 알고 수정했다.

**의문:**

왜 토큰을 headers에 넣어야 할까?

[2022. 2. 26]

페이지네이션을 구현했다.

**개념:**

페이지네이션 – 모든 데이터를 넘겨주는 것이 아닌, 일정량의 데이터만을 넘겨주는 것을 의미한다. 예를 들어 유튜브에서 밑으로 내리면 추가 동영상이 더 로딩되는 것과 같이.

커서기반 – 커서와 limit을 주고 커서 이후부터 limit만큼 받는다. 커서는 책의 아이디 등으로 사용하면 된다.

오프셋 기반 – 현재 보내준 데이터의 개수 offset과 limit을 받는다. 사용 중 데이터 변동이 일어나면 중복데이터가 보여지거나 데이터가 누락되어 보이는 문제가 생길 수 있다. 비교적 간단하다.

**기술:**

{paging: “cursor= , count=”, books: “”}형태로 응답을 보낸다. 쿼리로 limit와 커서를 받는다.   
몽구스에서 .limit메소드를 이용하면 limit기능을 쉽게 구현할 수 있다.

[2022. 2. 28]

공지사항과 문의 등을 서버에서 저장하고 보낼 수 있도록 모델과 router를 추가하였다.

[2022. 3. 2]

관리자 페이지 만들기가 시작되었다.

[2022. 3. 4]

이달의 책 컴포넌트에서, 사진을 저장하는데 문제가 발생하였다. 사진은 content형식을 multipart/form-data으로 보내야 하며, 그러한 형식은 multer를 이용하여 처리한다.

**기술:**

**FormData** – 정확히 무엇인지 모르지만, const sendData = new FormData();로 생성한 뒤 sendData.append(key, value)로 등록하고 axios로 보내면 된다. 이때 key는 마음대로 정하면 되고, value에 이미지 파일을 넣으면 된다.

**multer** – 미들웨어 패키지로, const upload = multer()로 등록한 뒤  
router단에서 upload.single(위에서 지정한 키)로 만든다. 여러 개라면 upload.array([])로 만든다.

이렇게 처리를 해주면 req.file이나 req.files에 파일이 들어가게 되고,

req.file.data에는 버퍼 형태의 데이터,  
req.file.mimetype에는 이미지 파일 형식이 들어와 있다.

**의문:**

blob, base64, buffer등의 개념에 대해 더 알아야겠다. 또 formdata, ajax에 대해 더 알아야겠다.

[2022. 3. 6]

이미지 용량이 너무 커서 줄이기로 결정하였다.

**개념:**

리사이징 – 이미지 크기를 말 그대로 조정하는 것이다. 이것을 통해 화질을 양보하면서 용량을 대폭 낮출 수 있다.

**기술:**

**sharp** – 이미지를 처리하는 패키지로,

const resizedImg = await sharp(버퍼데이터).resize(width, height 둘 다 숫자).toBuffer()로 리사이징 할 수 있다. toBuffer()는 프로미스를 버퍼데이터로 전환해 주는 것이다.

이 외에도 toFormat()등 이미지 처리에 유용한 메소드가 많이 있다.

프론트에서 사용될 이미지 크기를 이용해 resize를 해주면 용량이 확 줄어드는 것을 볼 수 있다.

**의문:**

리사이징의 구체적인 원리를 알아야겠다.

[2022. 3. 7]

jwt인증 방식 중 refresh token을 이용하도록 구현하였다.

**개념:**

인증 – 세션, 쿠키, jwt등의 방식이 있다. 이중 jwt가 현재 트렌드이며, 구체적인 인증 방식에는 refresh토큰을 이용하는 방식이 있다.   
refresh토큰은 access토큰을 발급해 주는 용도로만 쓰인다.   
access토큰은 실제로 클라이언트와 주고 받으며 인증하는 용도이다.   
이때 access토큰은 만료기간을 매우 짧게 주어, 중간에서 탈취당하더라도 악용가능한 시간을 매우 줄인다. 또한 refresh토큰은 만료기간을 길게 해주어 사용자의 편의를 증가시킨다(중간에 로그인 다시 하도록 하지 않는다.).   
이에 관해 아주 정리가 잘 된 사이트를 소개한다.   
https://llshl.tistory.com/32

**기술:**

실제 구현은 위 사이트에서 나온 로직대로 처리하였다.

**의문:**

refresh토큰을 이용하는 빙식의 취약점, 다른 인증 방법들(refresh토큰 이용하는 것 말고), 해커의 공격방식 등에 대해서 더 알아야겠다.
