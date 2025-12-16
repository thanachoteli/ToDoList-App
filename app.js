const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/todolist", (req, res) => {
    res.render("ntodolist/show");
});

app.listen(4000, () => {
    console.log("Listening on PORT 4000");
});
