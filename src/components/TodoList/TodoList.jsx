import React, { useEffect, useContext } from 'react'
import TodoNotDoneList from './TodoNotDoneList';
import TodoDoneList from './TodoDoneList';
import { TodoContext } from '../../context/TodoState';
import axios from "axios"



const TodoList = () => {
    const { state, dispatch } = useContext(TodoContext);


    const fetchPost = async () => {
        const res = await axios.get("api/todoList");
        const todoList = res.data;
        const todoDoneList = []
        const todoNotDoneList = []
        Object.values(todoList).map(todo => {
            if (todo.done) {
                todoDoneList.push(todo)
            }
            else {
                todoNotDoneList.push(todo)
            }
        })
        dispatch({ type: "GET_TODO", payload: { todoDoneList: todoDoneList, todoNotDoneList: todoNotDoneList } })


    }
    useEffect(() => {
        fetchPost();
    }, []);



    return (
        <div className='bg-u-blue pt-24 '>
            <div className="container mb-10 text-center">
                <h2 className="text-u-red text-6xl font-ubebas">Todo List</h2>
            </div>
            <hr className='border-u-red' />
            <br />
            <hr className='border-blue-500' />
            <br />
            <hr className='border-green-500' />

            <TodoNotDoneList />
            <TodoDoneList />

        </div>
    )
};

export default TodoList;
