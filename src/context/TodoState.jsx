import { createContext, useEffect, useReducer, useState } from "react";







export const TodoContext = createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case "GET_TODO":
            return {
                ...state,
                doneTodos: action.payload.doneTodos,
                notDoneTodos: action.payload.notDoneTodos
            }
        case "DELETENOTDONE_TODO":
            return {
                ...state,
                notDoneTodos: state.notDoneTodos.filter(todo => todo.id !== action.payload.todoId)
            }
        case "DELETEDONE_TODO":
            return {
                ...state,
                doneTodos: state.doneTodos.filter(todo => todo.id !== action.payload.todoId)
            }
        case "ADD_TODO":
            return {
                ...state,
                notDoneTodos: [...state.notDoneTodos, action.payload.todo]
            }
        case "DONE_TODO": {
            return {
                ...state,
                notDoneTodos: state.notDoneTodos.filter(todo => todo.id !== action.payload.todoId),
                doneTodos: [...state.doneTodos, state.notDoneTodos.find(todo => todo.id === action.payload.todoId)]
            }
        }
        case "NOTDONE_TODO": {
            return {
                ...state,
                doneTodos: state.doneTodos.filter(todo => todo.id !== action.payload.todoId),
                notDoneTodos: [...state.notDoneTodos, state.doneTodos.find(todo => todo.id === action.payload.todoId)]
            }
        }
        case "SETDONE_TODO": {
            return {
                ...state,
                doneTodos: action.payload.doneTodos
            }
        }
        case "SETNOTDONE_TODO": {
            return {
                ...state,
                notDoneTodos: action.payload.notDoneTodos
            }
        }
        default:
            return state
    }
}



export const TodoProvider = (props) => {

    const initialState = {
        doneTodos: [],
        notDoneTodos: [],
    }

    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <TodoContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </TodoContext.Provider>
    )

}

