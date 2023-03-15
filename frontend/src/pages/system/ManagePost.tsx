import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getPostAdmin } from '../../store/features/post/postSilce';
import moment from 'moment';

const ManagePost = () => {
    const dispatch = useAppDispatch()
    const {postsAdmin} = useAppSelector(state=>state.post)
    useEffect(()=>{
        dispatch(getPostAdmin())
    },[])

    const checkStatus  = (datetime:any) =>{
        console.log(datetime)
        // let todayInSecond = new Date().getTime();
        // let expireDayInSeconds = datetime.getTime();
        // console.log(todayInSecond, expireDayInSeconds)
        // return todayInSecond <= expireDayInSeconds ? " Đã hết hạn" : "Đang hoạt động"
    }

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
                        <th className='py-3 border'>Mã tin</th>
                        <th className='py-3 border'>Ảnh đại diện</th>
                        <th className='py-3 border'>Tiêu đề</th>
                        <th className='py-3 border'>Giá</th>
                        <th className='py-3 border'>Ngày bắt đầu</th>
                        <th className='py-3 border'>Ngày hết hạn</th>
                        <th className='py-3 border'>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        postsAdmin && postsAdmin.map((item:any)=>{
                            return (
                                <>
                                    <tr key={item.id} className='text-sm text-center'>
                                        <td className='py-1 border'>#{item.id.split("-")[0]}</td>
                                        <td className='flex justify-center py-1 border'><img className='h-[50px]' src={JSON.parse(item.images.image)[0]} alt="" /></td>
                                        <td className='text-left py-1 px-3 border'>{item.title}</td>
                                        <td className='py-1 border'>{item.attributes.price}</td>
                                        <td className='py-1 border'>{item.overviews.created}</td>
                                        <td className='py-1 border'>{item.overviews.expired}</td>
                                        <td className='py-1 border'>{item.overviews.expired && checkStatus(new Date())}</td>
                                    </tr>  
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </>    
    );
};

export default ManagePost;