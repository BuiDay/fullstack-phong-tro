import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getPostAdmin } from '../../store/features/post/postSilce';
import moment from 'moment';
import { Button } from '../../components';
import ModalUpdatePost from '../../components/ModalUpdatePost/ModalUpdatePost';

const ManagePost = () => {
    const dispatch = useAppDispatch()
    const [isShowModal, setIsShowModal] = useState(false)
    const {postsAdmin} = useAppSelector(state=>state.post)
    useEffect(()=>{
        dispatch(getPostAdmin())
    },[])

    const checkStatus  = (datetime:any) => {
      return  moment(datetime.toString(),'DD/MM/YYYY').isAfter(new Date().toDateString())
    };

    const handleShow = () => {
        setIsShowModal(true)
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
                        <th className='py-3 border'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       postsAdmin && postsAdmin.length > 0 ? postsAdmin.map((item:any)=>{
                            return (
                                <>
                                    <tr key={item.id} className='text-sm text-center'>
                                        <td className='py-1 border'>#{item.id.split("-")[0]}</td>
                                        <td className='flex justify-center py-1 border'><img className='h-[70px]' src={JSON.parse(item.images.image)[0]} alt="" /></td>
                                        <td className='text-left py-1 px-3 border'>{item.title}</td>
                                        <td className='py-1 border'>{item.attributes.price}</td>
                                        <td className='py-1 border'>{item.overviews.created}</td>
                                        <td className='py-1 border'>{item.overviews.expired}</td>
                                        <td className='py-1 border'>{item.overviews.expired && checkStatus(item.overviews.expired.split(" ")[3]) ? "Đang hoạt động" : "Đã hết hạn"}</td>
                                        <td className='py-1 border'>
                                            <Button text="Sửa" textColor="text-white" bgColor = "bg-[#3961fb]" onClick={handleShow} />
                                            <Button text="Xóa" textColor="text-white" bgColor = "bg-[#3961fb]"/>
                                        </td>
                                    </tr>  
                                </>
                            )
                        }) : <h1 className='mt-5'>Chưa có tin đăng nào</h1>
                    }
                </tbody>
            </table>
            {isShowModal && <ModalUpdatePost
                setIsShowModal={setIsShowModal}            
            />}
        </>    
    );
};

export default ManagePost;