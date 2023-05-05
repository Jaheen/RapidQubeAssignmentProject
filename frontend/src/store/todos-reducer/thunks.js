import { createAsyncThunk } from "@reduxjs/toolkit";
import { TodosService } from "api/rest/services";

export const getMyTodos = createAsyncThunk("todos/fetchMyTodos", async (args, thunkApi) => {
    const todos = await TodosService.getMyTodos()
    return todos
})

export const addTodo = createAsyncThunk("todos/addTodo", async (args, thunkApi) => {
    const { title } = args

    const newTodo = await TodosService.addTodo(title)

    return newTodo
})

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (args, thunkApi) => {
    const { todoId } = args

    const isDeleted = await TodosService.deleteTodo(todoId)

    return { isDeleted, todoId }
})

export const setTodoCompleted = createAsyncThunk("todos/setTodoCompleted", async (args, thunkApi) => {
    const { todoId, isCompleted } = args

    const isUpdated = await TodosService.setTodoCompleted(todoId, isCompleted)

    return { todoId, isUpdated, isCompleted }
})
