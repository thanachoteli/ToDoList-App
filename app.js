const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/todolist", (req, res) => {
	res.render("todolist/index");
});

app.get("/todolist/new", (req, res) => {
	res.render("todolist/new");
});

app.listen(4000, () => {
	console.log("Listening on PORT 4000");
});
