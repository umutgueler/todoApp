import React, { useContext, useEffect, useState } from 'react'
import TodoNotDone from './TodoNotDone';
import { motion, useAnimationControls, Reorder } from "framer-motion";
import { TodoContext } from '../../context/TodoState';
import usePrevious from "../../hooks/usePrevious";



const variants = {
    open: {
        display: "block",
        transition: { staggerChildren: 0.5, delayChildren: 0.25 }
    },
    closed: {
        transition: { staggerChildren: 0.05, when: "afterChildren", },
        transitionEnd: { display: "none" }
    }
};

const backgroundDiv = {
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

const TodoNotDoneList = () => {
    const { state, dispatch } = useContext(TodoContext);

    const [isVisible, setIsVisible] = useState(false);
    const [todos, setTodos] = useState([]);

    const prevTodos = usePrevious(todos);

    const controls = useAnimationControls();

    useEffect(() => {
        setTodos(
            state.todos.filter(todo => todo.done === false)
        )
    }, [state.todos]);

    useEffect(() => {
        if (prevTodos?.length === 0) return
        if (prevTodos?.length < todos.length) {
            controls.start({
                scale: [1, 1.5, 1],
                transition: { duration: 2 },
            })
        }
        else if (prevTodos?.length > todos.length) {
            controls.start({
                scale: [1, 0.75, 1],
                transition: { duration: 2 },
            })
        }
    },[todos]);

    return (
        <div className='bg-u-red pt-10'>
            <div className="container py-10 text-center" >
                <motion.h2
                    animate={controls}
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.25 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="text-blue-500 text-4xl font-ubebas w-3/12 mx-auto cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}>Waiting
                </motion.h2>
                <div>
                    <i className="fa-solid fa-chevron-down w-4 text-blue-600 "></i>
                </div>
            </div>
            <motion.div
                variants={backgroundDiv}
                animate={isVisible ? "open" : "closed"}
                className="bg-u-blue py-10"
            >
                <motion.div
                    initial={{ display: "none" }}
                    variants={variants}
                    animate={isVisible ? "open" : "closed"}  >
                    <Reorder.Group axis='y' onReorder={setTodos} values={todos} >
                        {
                            todos.map(todo => {
                                return <TodoNotDone todo={todo} key={todo.id} />
                            })
                        }
                    </Reorder.Group>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default TodoNotDoneList
