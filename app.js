const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Todo = require("./models/todo");

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://localhost:27017/todolist", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/todolist", async (req, res) => {
    const todos = await Todo.find({});
    res.render("todolist/index", { todos });
});

app.get("/todolist/new", (req, res) => {
    res.render("todolist/new");
});

app.post("/todolist", async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.redirect("todolist");
});

app.get("/todolist/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.render("todolist/show", { todo, days, months });
});

app.get("/todolist/:id/edit", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    // res.send("EDIT TODO");
    res.render("todolist/edit", { todo });
});

app.put("/todolist/:id", async (req, res) => {
    const { id } = req.params;
    const updateTodo = await Todo.findByIdAndUpdate(id, req.body);
    await updateTodo.save();
    res.redirect(`/todolist/${id}`);
});

app.delete("/todolist/:id", async (req, res) => {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id);
    res.redirect("/todolist");
});

app.listen(4000, () => {
    console.log("Listening on PORT 4000");
});
