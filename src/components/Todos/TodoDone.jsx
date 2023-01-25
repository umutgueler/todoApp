import React, { useContext, useState } from 'react';
import { motion, Reorder, useDragControls, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { TodoContext } from '../../context/TodoState';




const exit = exitDirection => {
    if (exitDirection === "doneList") {
        return {
            x: -1000,
            transition: {
                x: { stiffness: 1000 }
            }
        }
    }
    else if (exitDirection === "deleteTodo") {
        return {
            opacity: 0,
            x: 1000,
            transition: {
                x: { stiffness: 1000 }
            }
        }
    }
};

const variants = {
    open: {
        x: [-1000, 0],
        opacity: 1,
        transition: {
            x: { stiffness: 1000, velocity: -1 }
        }
    },
    closed: {
        opacity: 0,
        y: [0, -50],
        x: [0, 0],
        transition: {
            y: { stiffness: 1000 }
        }
    },

};

const contentvariants = {
    open: {
        display: "block", opacity: 1, y: 0, scale: 1
    },
    closed: {
        opacity: [1, -1, 0], y: -80, scale: [1, 0.25, 1],
        transition: { time: 0.6 },
        transitionEnd: { display: "none" }
    }
};

const TodoDone = ({ todo }) => {
    const { state, dispatch } = useContext(TodoContext);

    const [isVisibleContent, setIsvibleContent] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [exitDirection, setExitDirection] = useState("");
    const [dragging, setDragging] = useState(false);

    const controls = useDragControls();

    const notDoneTodo = async (e) => {
        e.stopPropagation();
        setExitDirection("doneList");
        const todoId = todo.id;

        await axios.put(`api/todolist/${todoId}/wait`, todo);

        setIsDelete(true);

        setTimeout(() => {
            dispatch({ type: "NOTDONE_TODO", payload: { todoId } })
        }, 1000);

    };

    const deleteTodo = async (e) => {
        e.stopPropagation();
        setExitDirection("deleteTodo");
        const todoId = todo.id;
        await axios.delete(`api/todoList/${todoId}`);

        setIsDelete(true);

        setTimeout(() => {
            dispatch({ type: "DELETE_TODO", payload: { todoId } })
        }, 1000);

    }

    const drag = async (e) => {
        e.bubbles = false;
        e.cancelBubble = true;
        e.stopPropagation();
        e.preventDefault();
        controls.start(e);
    }

    if (isDelete) return <AnimatePresence />

    return (
        <AnimatePresence>
            <Reorder.Item
                as="div"
                value={todo}
                id={todo.id}

                dragListener={false}
                dragControls={controls}

                whileDrag={{ scale: 1.05 }}
                onDragStart={(e) => setDragging(true)}
                onDragEnd={(e) => setTimeout(() => setDragging(false), 100)}
                variants={variants}
                custom={exitDirection}
                exit={exit}
                className='container flex flex-col w-full lg:w-3/5 font-ucrimson shadow-inner mt-2'
            >
                <div
                    className={(!isVisibleContent ? "lg:hover:from-pink-600 lg:hover:to-green-600 from-white" : "from-pink-500") + " group p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center bg-gradient-to-r to-green-600 cursor-pointer"}
                    style={{ touchAction: "none" }}
                    onClick={(e) => {
                        if (e.target !== e.currentTarget || dragging === true) return
                        setIsvibleContent(state => !state)
                    }}
                    onPointerDown={(e) => { drag(e) }}
                >
                    <div className='pointer-events-none'>
                        <h3 className={isVisibleContent ? "scale-110 m-2 text-white" : "lg:group-hover:scale-110 lg:group-hover:m-2 lg:group-hover:text-white lg:duration-500"}>
                            {todo.title}
                        </h3>

                        <p className={isVisibleContent ? "text-xs text-white" : "text-xs lg:group-hover:text-white duration-500"}>To finish: {todo.tofinish}</p>
                    </div>
                    <div className='space-x-5 mt-5 lg:mt-0 ml-auto'>
                        <i onClick={notDoneTodo} className="text-white rounded-full fa-solid fa-circle-xmark hover:scale-150 hover:text-blue-600 hover:bg-white duration-500"></i>
                        <i onClick={deleteTodo} className="text-white fa-solid fa-trash hover:scale-150 hover:text-red-600  duration-500"></i>
                        <i onPointerDown={(e) => drag(e)} className="scale-150 lg:scale-100 lg:cursor-grab text-white fa-solid fa-up-down" style={{ touchAction: "none" }} ></i>
                    </div>
                </div>
                <motion.div
                    initial={{ display: "none" }}
                    variants={contentvariants}
                    animate={isVisibleContent ? "open" : "closed"}
                    className='bg-white'>
                    <p className="p-4 text-sm justify-center ">
                        {todo.content}
                    </p>

                    <div
                        className="p-4 flex justify-end font-light text-xs">
                        <p>Add Date: {todo.adddate}</p>
                    </div>
                </motion.div>


            </Reorder.Item>
        </AnimatePresence>

    )

}

export default TodoDone
