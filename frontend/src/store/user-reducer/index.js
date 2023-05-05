import UserSlice from "./slice";
import * as Thunks from "./thunks"


export const UserReducerThunks = Thunks

export const UserReducerActions = UserSlice.actions

export default UserSlice.reducer
