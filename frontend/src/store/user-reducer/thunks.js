import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "api/rest/services";


export const verifyTokenAndFetchLoggedUser = createAsyncThunk("user/verifyTokenAndFetchLoggedUser", async (args, thunkApi) => {
    try {
        const { token } = args
        const user = await AuthService.verifyAuthAndGetUser(token)
        return user
    } catch (error) {
        thunkApi.rejectWithValue()
    }
})
