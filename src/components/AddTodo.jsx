import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion";
import { TodoContext } from '../context/TodoState';
import axios from 'axios';




const initialTodo = {
    title: "",
    content: "",
    tofinish: "",
    done: false,
    adddate: "0"
}
const AddTodo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [todo, setTodo] = useState(initialTodo);
    const { state, dispatch } = useContext(TodoContext);
    const alertDiv = useRef();
    const sucessDiv = useRef();
    const dateRef = useRef();

    const backroundDiv = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2}px at ${(window.innerWidth / 2)}px -20px)`,
            transition: { 
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        }),
        closed: {
            clipPath: `circle(60px at ${(window.innerWidth / 2)}px -20px)`,
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            },

        }
    };


    const changeInput = (e) => {

        if (e.target.name === "tofinish") {
            const tofinish = new Date(e.target.value)
            setTodo({
                ...todo,
                tofinish: tofinish.toLocaleString('en-GB').slice(0, -3)
            })

        }
        else {
            setTodo({
                ...todo,
                [e.target.name]: e.target.value
            })
        }


    }


    const addTodo = async (e) => {
        e.preventDefault();

        alertDiv.current.innerHTML = "Please, make sure you entered all values correctly ...!";
        alertDiv.current.style.display = "none";

        for (const key in todo) {
            if (key === "done") continue
            if (!todo[key]) {
                alertDiv.current.style.display = "block"
                setTimeout(() => {
                    alertDiv.current.style.display = "none"
                }, 2000)
                return
            }
        }

        try {
            const res = await axios.post("/api/todoList", { ...todo, adddate: new Date().toLocaleString('en-GB').slice(0, -3) });

            dispatch({ type: "ADD_TODO", payload: { todo: res.data } });

            sucessDiv.current.style.display = "block";

            setTimeout(() => {
                sucessDiv.current.style.display = "none";
            }, 2000);

            setTodo(initialTodo);
            dateRef.current.value = ""

        }
        catch (err) {
            alertDiv.current.innerHTML = err
            alertDiv.current.style.display = "block"
        }

    }

    const variants = {
        open: {
            display: "block", opacity: 1, y: 0, scale: 1
        },
        closed: {
            opacity: 0, y: -80, scale: 0, transitionEnd: { display: "none" },
        }
    }

    return (
        <div className='bg-u-red pt-10 py-48'>
            <div className="container my-10 text-center">
                <motion.h2
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.25 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="text-u-yellow text-4xl font-ubebas w-3/12 mx-auto cursor-pointer "
                    onClick={() => setIsVisible(!isVisible)}>
                    Add Todo
                </motion.h2>
                <div>
                    <i className="fa-solid fa-chevron-down w-4 text-u-yellow "></i>
                </div>
            </div>

            <motion.div
                variants={backroundDiv}
                animate={isVisible ? "open" : "closed"}
                className="bg-u-blue py-10 text-center text-white " style={{ minHeight: "200px" }} >
                <motion.div
                    initial={{ display: "none" }}
                    variants={variants}
                    animate={isVisible ? "open" : "closed"}
                    className='container items-center px-5' style={{ display: `${isVisible ? "block" : "none"}` }} >
                    <form onSubmit={addTodo}>
                        <div className="mx-auto max-w-lg">
                            <div className="py-5">
                                <label htmlFor='title' className="py-2 text-2xl ">Title</label>
                                <input placeholder="Enter a title ..." type="text" id="title" name="title" onChange={changeInput} value={todo.title}
                                    className="text-md block px-3 py-2 rounded-lg w-full bg-u-blue border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500  focus:border-gray-600 focus:outline-none" />
                            </div>
                        </div>
                        <div className="mx-auto max-w-lg">
                            <div className="py-5">
                                <label htmlFor='content' className="py-2 text-2xl ">Content</label>
                                <input placeholder="Enter a content" type="text" id="content" name="content" onChange={changeInput} value={todo.content}
                                    className="text-md block px-3 py-2 rounded-lg w-full bg-u-blue border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500  focus:border-gray-600 focus:outline-none" />
                            </div>
                        </div>
                        <div className="mx-auto max-w-lg">
                            <div className="py-5">
                                <label htmlFor='tofinish' className="py-2 text-2xl">To finish date</label>
                                <input type="datetime-local" id="tofinish" name="tofinish" min={new Date().toISOString().slice(0, -8)} onChange={changeInput} ref={dateRef}
                                    className="text-md block px-3 py-2 rounded-lg w-full bg-u-blue border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500  focus:border-gray-600 focus:outline-none" />
                            </div>
                        </div>
                        <div className="mx-auto max-w-lg" style={{ minHeight: "100px" }}>
                            <div ref={alertDiv} className="py-2 text-red-600" style={{ display: "none" }}>
                                Please, make sure you entered all values correctly ...!
                            </div>
                            <div ref={sucessDiv} className="py-2 text-green-600" style={{ display: "none" }}>
                                Add Todos Successful
                            </div>
                        </div>
                        <div className="mx-auto max-w-lg">
                            <button className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                                ADD TODO
                            </button>
                        </div>

                    </form>
                </motion.div>
            </motion.div>
        </div >
    )
}

export default AddTodo
