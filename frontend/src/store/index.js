import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user-reducer";
import TodosReducer from "./todos-reducer";


/**
 * Global redux store
 */
const store = configureStore({
    reducer: {
        user: UserReducer,
        todos: TodosReducer
    }
})

export default store
