import TodosSlice from "./slice";
import * as Thunks from "./thunks"


export const TodosThunks = Thunks

export const TodosActions = TodosSlice.actions

export default TodosSlice.reducer