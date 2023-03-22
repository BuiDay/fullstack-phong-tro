import React, { useEffect } from 'react';
import { apiGetPostsById } from '../../store/features/post/postService';



const DetailPage = () => {

    const handleGetPost = async () =>{
        const res = await apiGetPostsById({id:"0574ad89-258d-4ebf-a4af-12fa3a27305b"})
        console.log(res)
    }
    
    useEffect(()=>{
        handleGetPost ()
    },[]) 

    return (
        <>
        </>
    );
};

export default DetailPage;

