import { createContext, useReducer, useState } from "react";







export const TodoContext = createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case "GET_TODO":
            return {
                ...state,
                todos: action.payload

            }
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.todoId)
            }
        case "ADD_TODO":
            const copyTodos = [...state.todos];
            copyTodos.push(action.payload.todo);
            return {
                ...state,
                todos: copyTodos
            }
        case "DONE_TODO": {
            const { todoId } = action.payload;
            const copyTodos = [...state.todos];
            copyTodos.forEach(todo => {
                if (todo.id === todoId) {
                    todo.done = true
                }
            })

            return {
                ...state,
                todos: copyTodos
            }
        }
        case "NOTDONE_TODO": {
            const { todoId } = action.payload;
            const copyTodos = [...state.todos];
            copyTodos.forEach(todo => {
                if (todo.id === todoId) {
                    todo.done = false
                }
            })

            return {
                ...state,
                todos: copyTodos
            }
        }
        default:
            return state
    }
}

const initialState = {
    todos: []
}

export const TodoProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TodoContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </TodoContext.Provider>
    )

}

