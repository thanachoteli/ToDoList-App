const Todo = require("../models/todo");
const mongoose = require("mongoose");
const todoTitles = require("./todo_titles");
const todoDescription = require("./todo_descriptions");
const { MongoOIDCError } = require("mongodb");

mongoose.connect("mongodb://localhost:27017/todolist", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const randomPriority = () => {
    const priorities = [];
    for (let i = 0; i < 10; ++i) {
        priorities.push(Math.floor(Math.random() * 3) + 1);
    }
    return priorities;
};

const randomDate = () => {
    const dates = [];
    for (let i = 0; i < 10; ++i) {
        const day = Math.floor(Math.random() * 30) + 1;
        const month = Math.floor(Math.random() * 11) + 1;
        const year = 2025;
        dates.push(`${year}-${month}-${day}`);
    }
    return dates;
};

const randomTime = () => {
    const times = [];
    for (let i = 0; i < 10; ++i) {
        const hour = Math.floor(Math.random() * 23) + 1;
        const minute = Math.floor(Math.random() * 59) + 1;
        times.push();
    }
};

const seedDB = async () => {
    await Todo.deleteMany({});
    const priorities = randomPriority();
    const dates = randomDate();
    for (let i = 0; i < 10; ++i) {
        const t = new Todo({
            title: todoTitles[i],
            description: todoDescription[i],
            priority: priorities[i],
            dueDate: new Date(dates[i]),
        });
        await t.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
