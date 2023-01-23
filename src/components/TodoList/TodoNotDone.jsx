import React, { useContext, useState, useRef } from 'react'
import { motion, useMotionValue, Reorder, useDragControls, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { TodoContext } from '../../context/TodoState';




const TodoNotDone = ({ todo }) => {
    const [isVisibleContent, setIsvibleContent] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [exitDirection, setExitDirection] = useState("");
    const { state, dispatch } = useContext(TodoContext);
    const headerRefs = useRef([])

    const collapseContent = (e) => {
        if (!e.target.classList.contains("header")) return

        setIsvibleContent(!isVisibleContent);
        
        if (!isVisibleContent) {
            headerRefs.current[0].classList.add("from-pink-500");
            headerRefs.current[0].classList.remove("lg:hover:from-pink-500", "lg:hover:to-blue-600", "from-white");

            headerRefs.current[1].classList = ("scale-110 m-2 text-white");

            headerRefs.current[2].classList = "text-xs text-white"

        }
        if (isVisibleContent) {
            headerRefs.current[0].classList.remove("from-pink-500");
            headerRefs.current[0].classList.add("lg:hover:from-pink-500", "lg:hover:to-blue-600", "from-white");

            headerRefs.current[1].classList = ("lg:group-hover:scale-110 lg:group-hover:m-2 lg:group-hover:text-white lg:duration-500");

            headerRefs.current[2].classList = "text-xs lg:group-hover:text-white duration-500";

        }
    }
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

    }
    const contentvariants = {
        open: {
            display: "block",
            transition: {}
        },
        closed: {
            transition: {},
            transitionEnd: { display: "none" }
        }
    };
    const doneTodo = async () => {
        setExitDirection("doneList");
        const todoId = todo.id;
        
        await axios.put(`api/todoList/${todoId}/done`,todo);

        setIsDelete(true);

        setTimeout(() => {
            dispatch({ type: "DONE_TODO", payload: { todoId } })
        }, 1000);


    }
    const deleteTodo = async () => {
        setExitDirection("deleteTodo");
        const todoId = todo.id;
        await axios.delete(`api/todoList/${todoId}`);

        setIsDelete(true);

        setTimeout(() => {
            dispatch({ type: "DELETENOTDONE_TODO", payload: { todoId } })
        }, 1000);

    }

    const controls = useDragControls()
    const drag = (e) => {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        controls.start(e)
    }


    return (
        <AnimatePresence>
            {!isDelete && (
                <Reorder.Item
                    
                    as="div"
                    value={todo}
                    id={todo.id}

                    dragListener={false}
                    dragControls={controls}
                    whileDrag={{scale:1.05}}
                    variants={variants}
                    custom={exitDirection}

                    exit={exitDirection => {
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
                                x: 1000 ,
                                transition: {
                                    x: { stiffness: 1000 }
                                }
                            }
                        }
                    }}


                    className='container flex flex-col w-full lg:w-3/5 font-ucrimson shadow-inner mt-2'
                >


                    <div ref={el => headerRefs.current[0] = el} className="group p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center bg-gradient-to-r from-white to-blue-500 lg:hover:from-pink-500 lg:hover:to-blue-500 cursor-pointer header" onClick={collapseContent}>
                        <div className='pointer-events-none'>
                            <h3 ref={el => headerRefs.current[1] = el} className='lg:group-hover:scale-110 lg:group-hover:m-2 lg:group-hover:text-white lg:duration-500'>
                                {todo.title}
                            </h3>

                            <p ref={el => headerRefs.current[2] = el} className="text-xs lg:group-hover:text-white duration-500 ">To finish: {todo.tofinish}</p>
                        </div>
                        <div className='space-x-5 mt-5 lg:mt-0 ml-auto'>

                            <i onClick={doneTodo} className="text-white rounded-full fa-solid fa-circle-check hover:scale-150 hover:text-green-600 hover:bg-white duration-500"></i>
                            <i onClick={deleteTodo} className="text-white fa-solid fa-trash hover:scale-150 hover:text-red-600  duration-500"></i>
                            <i onPointerDown={(e) => drag(e)} className="scale-150 lg:scale-100 lg:cursor-grab text-white fa-solid fa-up-down" style={{ touchAction: "none" }} ></i>
                        </div>

                    </div>
                    <motion.div
                        initial={{ display: "none" }}
                        variants={contentvariants}
                        animate={isVisibleContent ? "open" : "closed"}
                        className='bg-white' >
                        <p className="p-4 text-sm justify-center ">
                            {todo.content}
                        </p>

                        <div
                            className="p-4 flex justify-end font-light text-xs">
                            <p>Add Date: {todo.adddate}</p>
                        </div>
                    </motion.div>
                </Reorder.Item >)
            }


        </AnimatePresence >

    )
}

export default TodoNotDone
