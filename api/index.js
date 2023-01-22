import express from "express";
import { randomBytes } from "crypto";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors())

const todoList = {
    id02bed948: {
        id: "id02bed948",
        title: "ACCUSANTIUM DOLOREMQUE LAUDANT...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "20.01.2023 15:24:12",
        adddate: "20.01.2023 15:24:12",
        done: false
    },

    idf4feaaaf: {
        id: "idf4feaaaf",
        title: "ACCUSANTIUM DOLOREMQUE LAUDANT...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "20.01.2023 15:24:12",
        adddate: "20.01.2023 15:24:12",
        done: false
    },

    ide555496a: {
        id: "ide555496a",
        title: "ACCUSANTIUM DOLOREMQUE LAUDANT...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "20.01.2023 15:24:12",
        adddate: "20.01.2023 15:24:12",
        done: false
    },

    id146095f2: {
        id: "id146095f2",
        title: "DONE TRUEEEEE...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "20.01.2023 15:24:12",
        adddate: "20.01.2023 15:24:12",
        done: true
    },

    id9349822f: {
        id: "id9349822f",
        title: "DONE TRUEEE666...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "20.01.2023 15:24:12",
        adddate: "20.01.2023 15:24:12",
        done: true
    },

    idfaea2d77: {
        id: "idfaea2d77",
        title: "DONE TRUEEEE...",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur temporibus dolorem nihil excepturi quos. Amet cupiditate aperiam temporibus perferendis?",
        tofinish: "20.01.2023 15:24",
        adddate: "20.01.2023 15:24",
        done: true
    },

};

app.get("/api/todoList", (req, res) => {
    res.json(todoList)
});

app.post("/api/todoList", (req, res) => {
    if (Object.keys(todoList).length >= 12) {
        res.status(400).json({
            message: "Max Limit Todos : 12 (This is a development project)"
        })

    }
    const todo = req.body;
    const id = randomBytes(4).toString("hex");
    todo.id = id;
    todoList[id] = todo;
    res.json(todo)
});

app.get("/api/todoList/:id/done", (req, res) => {

    const { id } = req.params;
    todoList[id].done = true;

    res.status(201).json(todoList[id])
});
app.get("/api/todoList/:id/wait", (req, res) => {

    const { id } = req.params;
    todoList[id].done = false;

    res.status(201).json(todoList[id])
});

app.delete("/api/todoList/:id", (req, res) => {
    if (Object.keys(todoList).length <= 2) {
        res.status(400).json({
            message: "Min Limit Todos : 2  (This is a development project)"
        })

    }
    const { id } = req.params;
    delete todoList[id];

    res.status(200).json({
        message: "Delete operation successful"
    })
});

app.listen(3001, () => {

})

export default app;