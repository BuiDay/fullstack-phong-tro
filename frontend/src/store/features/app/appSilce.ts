import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit"
import { Iapp } from "../InterfaceReducer";
import appService from './appService'
import { RootState } from "../../redux";


const initState:Iapp = {
    msg: '',
    categories: [],
}



export const getCategories:any = createAsyncThunk("app/get-categories",async(data,thunkAPI)=>{
    try{
        return await appService.apiGetCategories()
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const appSlice = createSlice({
    name:"app",
    initialState:initState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getCategories.fulfilled,(state:Iapp,action:PayloadAction<any>)=>{
            state.msg = action.payload.msg;
            state.categories = action.payload.response
        })
    },
})

export default appSlice.reducer;