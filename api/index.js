import express from "express";
import { randomBytes } from "crypto";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());


// Fake Server

const todoList = [
    {
        id: "id02bed948",
        title: "ACCUSANTIUM DOLOREMQUE LAUDANT...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "23/01/2023, 01:10",
        adddate: "23/01/2023, 01:10",
        done: false
    },

    {
        id: "idf4feaaaf",
        title: "ACCUSANTIUM DOLOREMQUE LAUDANT...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "23/01/2023, 01:10",
        adddate: "23/01/2023, 01:10",
        done: false
    },

    {
        id: "ide555496a",
        title: "ACCUSANTIUM DOLOREMQUE LAUDANT...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "23/01/2023, 01:10",
        adddate: "23/01/2023, 01:10",
        done: false
    },

    {
        id: "id146095f2",
        title: "DONE TRUEEEEE...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "23/01/2023, 01:10",
        adddate: "23/01/2023, 01:10",
        done: true
    },

    {
        id: "id9349822f",
        title: "DONE TRUEEE666...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "23/01/2024, 12:10",
        adddate: "23/01/2023, 01:10",
        done: true
    },

    {
        id: "idfaea2d77",
        title: "DONE TRUEEEE...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "23/01/2023, 01:10",
        adddate: "23/01/2023, 01:10",
        done: true
    },

];

app.get("/api/todoList", (req, res) => {
    res.json(todoList)
});

app.post("/api/todoList", (req, res) => {

    const todo = req.body;
    const id = randomBytes(4).toString("hex");
    todo.id = "id" + id;
    res.json(todo);
});

app.put("/api/todoList/:id/done", (req, res) => {

    const todo = req.body;
    todo.done = true;

    res.status(201).json(todo)
});
app.put("/api/todoList/:id/wait", (req, res) => {

    const todo = req.body;
    todo.done = false;

    res.status(201).json(todo)
});

app.delete("/api/todoList/:id", (req, res) => {

    res.status(200).json({
        message: "Delete operation successful"
    })
});

app.listen(3001, () => {

})

export default app;