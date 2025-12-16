const fs = require("fs"); // fs 모듈 : 파일 처리와 관련된 전반적인 작업을 하는 모듈
const path = require("path"); // paht 모듈 : 운영체제별로 경로 구분자가 달라 생기는 문제를 쉽게 해결하기 위한 모듈

const express = require("express"); // express 모듈 : 서버 개발을 간편하게 해주는 프레임워크

const app = express(); // app 상수에 express 애플리케이션 생성

app.set("view engine","ejs");                   // ejs 쓸라면 무조건 써야함
app.use(express.json())                         // req.body 사용해야 할때
app.use(express.urlencoded({extended:true}))    // req.body 사용해야 할때

app.get("/currenttime", (req,res) => {        // localhost:3000/currenttime 으로 들어가면 아래 res.send 보여주기
    res.send("<h1>" + new Date().toISOString() + "</h1>"); 
}); // localhost:3000.currenttime

app.get("/", (req, res)=>{  // localhost:3000/ 으로 들어가면 index.ejs 렌더링
  res.render('index.ejs');
}); // localhost:3000

app.post("/store-user", (req, res)=>{ // localhost:3000/store-user으로 들어가면
  const userName =  req.body.username;  
  // username을 userName에 저장
  const filePath = path.join(__dirname, "data", "users.json"); // path.join으로 경로 합치기
  // filePath에 경로 저장
  const fileData = fs.readFileSync(filePath);

  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.render("stored.ejs");
});// localhost:3000/store-user

app.listen(3000);