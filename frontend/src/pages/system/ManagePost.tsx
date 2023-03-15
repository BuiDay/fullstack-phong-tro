import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getPostAdmin } from '../../store/features/post/postSilce';

const ManagePost = () => {
    const dispatch = useAppDispatch()
    const {postsAdmin} = useAppSelector(state=>state.post)
    console.log(postsAdmin)
    useEffect(()=>{
        dispatch(getPostAdmin())
    },[])
    return (
        <>
            <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
                <h1 className='text-3xl font-medium'>Quản lý tin đăng</h1>
                <select name="" id="" className='outline-none border p-2 border-gray-200 rounded-md'>
                    <option value="">Lọc theo trạng thái</option>
                </select>
            </div>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Mã tin</th>
                        <th>Ảnh đại diện</th>
                        <th>Tiêu đề</th>
                        <th>Giá</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày hết hạn</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        postsAdmin && postsAdmin.map((item:any)=>{
                            return (
                            <>
                                <tr key={item.id}>
                                    <td>#{item.id.split("-")[0]}</td>
                                    <td><img className='h-[50px]' src={JSON.parse(item.images.image)[0]} alt="" /></td>
                                    <td>{item.title}</td>
                                    <td>{item.attributes.price}</td>
                                </tr>  
                            </>)
                        })
                    }
                </tbody>
            </table>
        </>    
    );
};

export default ManagePost;