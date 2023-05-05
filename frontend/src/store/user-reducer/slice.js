import { createSlice } from "@reduxjs/toolkit";
import * as Thunks from "./thunks";


const UserSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        profile: {
            userId: "",
            firstName: "",
            lastName: "",
            email: ""
        }
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(Thunks.verifyTokenAndFetchLoggedUser.fulfilled, (state, action) => {
            const user = action.payload
            if (user) {
                state.isAuthenticated = true
                state.profile = user
            }
        })
    }
})

export default UserSlice
