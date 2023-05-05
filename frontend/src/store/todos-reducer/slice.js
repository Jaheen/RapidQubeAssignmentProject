import { createSlice } from "@reduxjs/toolkit";
import * as Thunks from "./thunks"


const TodosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(Thunks.getMyTodos.fulfilled, (state, action) => {
            state.todos = action.payload
        })
        builder.addCase(Thunks.addTodo.fulfilled, (state, action) => {
            state.todos.push(action.payload)
        })
        builder.addCase(Thunks.deleteTodo.fulfilled, (state, action) => {
            const { isDeleted, todoId } = action.payload
            if (isDeleted)
                state.todos = state.todos.filter(todo => todo.todoId !== todoId)
        })
        builder.addCase(Thunks.setTodoCompleted.fulfilled, (state, action) => {
            const { isUpdated, isCompleted, todoId } = action.payload
            if (isUpdated) {
                const targetTodo = state.todos.find(todo => todo.todoId === todoId)
                targetTodo.isCompleted = isCompleted
            }
        })
    }
})

export default TodosSlice
