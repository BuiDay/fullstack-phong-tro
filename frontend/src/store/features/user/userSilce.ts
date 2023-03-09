import { createSlice, createAsyncThunk, createAction, PayloadAction} from "@reduxjs/toolkit"
import userService from "./userService";
import {IUser, IUserPayload } from "../InterfaceReducer";

const initState:IUser = {
    currentData: {}
}

export const apiGetCurrent:any = createAsyncThunk("user",async(data:any,thunkAPI)  =>{
    try{
        return await userService.apiGetCurrent()
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})


export const userSlice = createSlice({
    name:"user",
    initialState:initState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(apiGetCurrent.pending,(state:IUser)=>{
            state.currentData = {}
        })
        .addCase(apiGetCurrent.fulfilled,(state:IUser,action:PayloadAction<IUserPayload>)=>{
            state.currentData = action.payload.response;
        })

    },
})


export default userSlice.reducer;