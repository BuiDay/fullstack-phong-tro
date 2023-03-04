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

export const getNewPost:any = createAsyncThunk("post/new-post",async(data:any,thunkAPI)  =>{
    try{
        return await postService.apiGetNewPosts()
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
        .addCase(getPostLimit.fulfilled,(state:IPost,action:PayloadAction<IPostPayload>)=>{
            state.posts = action.payload.response?.rows;
            state.count = action.payload.response?.count
            state.msg = action.payload.msg;
            state.isLoading = true
        })
        .addCase(getNewPost.fulfilled,(state:IPost,action:PayloadAction<any>)=>{
            state.newPosts = action.payload.response;
            state.msg = action.payload.msg;
            state.isLoading = true
        })

    },
})


export default postSlice.reducer;