import { createSlice, createAsyncThunk, createAction, PayloadAction, Reducer } from "@reduxjs/toolkit"
import { IAuth} from "../InterfaceReducer";
import authService from "./authService";

const initState = {
    isLoggedIn : false,
    token:"",
    msg:"",
    isError:false,
    isLoading:false,
    isSuccess:false,
}

export const register:any = createAsyncThunk("auth/register",async(data,thunkAPI)=>{
    try{
        return await authService.apiRegister(data)
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const authSlice = createSlice({
    name:"auth",
    initialState:initState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(register.pending,(state:IAuth)=>{
            state.isLoading = true;
        })
        .addCase(register.fulfilled,(state:IAuth,action:PayloadAction<any>)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = false;
            state.msg = action.payload.msg ;
        })
        .addCase(register.rejected,(state:IAuth,action:PayloadAction<any>)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isLoggedIn = false;
            state.isError = true;
            state.msg = action.payload.msg;
        })
    },
})


export default authSlice.reducer;