const fs = require("fs");

const path = require("path");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()); // req.body 사용해야 할때

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs"); 
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants.ejs", { 
    numberOfRestaurants: storedRestaurants.length, 
    restaurants: storedRestaurants 
   });
});

app.get("/restaurants/:id", (req,res)=>{
    const restaurantId = req.params.id;
    res.render("restaurant-detail.ejs", {rid: restaurantId});
});

app.get("/recommend", (req, res) => {
  res.render("recommend.ejs");
});

app.post("/recommend", (req, res) => {
  const restaurants = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurants);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
  // 엔드 포인트를 /confirm으로 이동해라
});

app.get("/confirm", (req, res) => {
  res.render("confirm.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(3000);
