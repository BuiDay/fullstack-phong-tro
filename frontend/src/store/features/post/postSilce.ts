import { createSlice, createAsyncThunk, createAction, PayloadAction} from "@reduxjs/toolkit"
import postService from "./postService";
import { IPost,IPostPayload } from "../InterfaceReducer";

const initState:IPost = {
    posts: [],
    msg: '',
    count: 0,
    newPosts: [],
    isLoading:false
}

export const getPostLimit:any = createAsyncThunk("post/get-limit",async(data:any,thunkAPI)  =>{
    try{
        return await postService.apiGetPostsLimit(data)
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})


export const postSlice = createSlice({
    name:"post",
    initialState:initState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getPostLimit.pending,(state:IPost)=>{
            state.isLoading = true;
        })
        .addCase(getPostLimit.fulfilled,(state:IPost,action:PayloadAction<IPostPayload>)=>{
            state.posts = action.payload.response?.rows;
            state.count = action.payload.response?.count
            state.msg = action.payload.msg;
            state.isLoading = false;
        })
        .addCase(getPostLimit.rejected,(state:IPost,action:PayloadAction<IPostPayload>)=>{
            state.posts = undefined;
            state.msg =undefined;
            state.isLoading = true;
            state.count = undefined
        })

    },
})


export default postSlice.reducer;