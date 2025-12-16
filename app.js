const fs = require("fs"); // fs 모듈 : 파일 처리와 관련된 전반적인 작업을 하는 모듈
const path = require("path"); // paht 모듈 : 운영체제별로 경로 구분자가 달라 생기는 문제를 쉽게 해결하기 위한 모듈

const express = require("express"); // express 모듈 : 서버 개발을 간편하게 해주는 프레임워크

const app = express(); // app 상수에 express 애플리케이션 생성

app.set("view engine", "ejs"); // ejs 쓸라면 무조건 써야함
app.use(express.json()); // req.body 사용해야 할때
app.use(express.urlencoded({ extended: true })); // req.body 사용해야 할때

app.get("/currenttime", (req, res) => {
  // localhost:3000/currenttime 으로 들어가면 아래 res.send 보여주기
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000.currenttime

app.get("/", (req, res) => {
  // localhost:3000/ 으로 들어가면 index.ejs 렌더링
  res.render("index.ejs");
}); // localhost:3000

app.post("/store-user", (req, res) => {
  // localhost:3000/store-user으로 들어가면
  const userName = req.body.username; // username을 userName에 저장

  const filePath = path.join(__dirname, "data", "users.json"); // filePath에 경로 저장

  const fileData = fs.readFileSync(filePath); // filePath를 fileData에 동기읽기로 읽기 //동기는 해당 코드를 실행하는 동안 다른 코드를 실행 못하게 하는것 (반대는 비동기)

  const existingUsers = JSON.parse(fileData); // fileData를 JSON 문자열을 JavaScript 객체 형태로 변환

  existingUsers.push(userName); // exisingUsers 배열 끝에 userName 요소 추가하기

  fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // JavaScript객체를 JSON 문자열로 변환하여 filePath 경로에 쓰기

  res.render("stored.ejs"); // stored.ejs 랜더링
}); // localhost:3000/store-user

app.get("/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  
  res.render("user.ejs", {logo:existingUsers})
});

app.listen(3000); // 3000번 포트에서 서버를 오픈하는 문법
