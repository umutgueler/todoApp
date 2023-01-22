import { createContext, useReducer, useState } from "react";

export const TodoContext = createContext();





const reducer = (state, action) => {
    switch (action.type) {
        case "GET_TODO":
            {
                return {
                    ...state,
                    todoDoneList: action.payload.todoDoneList,
                    todoNotDoneList: action.payload.todoNotDoneList
                }


            }
        case "DELETENOTDONE_TODO": {
            const { todoId } = action.payload;
            const { todoNotDoneList } = state;
            return {
                ...state,
                todoNotDoneList: todoNotDoneList.filter(todo => todo.id !== todoId)
            }
        }
        case "DELETEDONE_TODO": {
            const { todoId } = action.payload;
            const { todoDoneList } = state;
            return {
                ...state,
                todoDoneList: todoDoneList.filter(todo => todo.id !== todoId)
            }
        }
        case "ADD_TODO":
            return {
                ...state,
                todoNotDoneList: [...state.todoNotDoneList, action.payload]
            }
        case "DONE_TODO": {

            const { todoId } = action.payload;
            const { todoDoneList, todoNotDoneList } = state;
            const doneTodo = todoNotDoneList.filter(todo => todo.id === todoId);
            todoDoneList.push(doneTodo[0])

            return {
                ...state,
                todoDoneList: todoDoneList,
                todoNotDoneList: todoNotDoneList.filter(todo => todo.id !== todoId)
            }
        }


        case "NOTDONE_TODO": {
            const { todoId } = action.payload;
            const { todoDoneList, todoNotDoneList } = state;
            const notDoneTodo = todoDoneList.filter(todo => todo.id === todoId);
            todoNotDoneList.push(notDoneTodo[0])

            return {
                ...state,
                todoDoneList: todoDoneList.filter(todo => todo.id !== todoId),
                todoNotDoneList: todoNotDoneList
            }

        }
        default:
            return state
    }
}





const initialState = {
    todoDoneList: [],
    todoNotDoneList: []
}

export const TodoProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <TodoContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </TodoContext.Provider>
    )

}

