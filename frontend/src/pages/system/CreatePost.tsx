import React, { useState } from 'react';
import Address from '../../components/Address/Address';
import Overview from '../../components/Overview/Overview';

export interface IPayload{
    categoryCode: string,
    title: string,
    priceNumber: number,
    areaNumber: number,
    images: string,
    address: string,
    priceCode: string,
    areaCode: string,
    description: string,
    target: string,
    province: string
}

const CreatePost = () => {
    const [payload, setPayload] = useState<IPayload>({
        categoryCode: '',
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        images: '',
        address: '',
        priceCode: '',
        areaCode: '',
        description: '',
        target: '',
        province: ''
    })

    console.log(payload)

    return (
        <div className='px-6'>
        <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Đăng tin mới</h1>
        <div className='flex gap-4'>
            <div className='py-4 flex flex-col gap-2 flex-auto'>
                <Address payload={payload} setPayload={setPayload} />
                <Overview payload={payload} setPayload={setPayload} />
                <div className='w-full mb-6'>
                    <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                    <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                    <div className='w-full'>
                        <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor="file">

                        </label>
                        <input hidden type="file" id='file' multiple />
                        <div className='w-full'>
                            <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                            <div className='flex gap-4 items-center'>
                               
                            </div>
                        </div>
                    </div>
                </div>
             
                <div className='h-[500px]'>

                </div>
            </div>
            <div className='w-[30%] flex-none'>
                maps
             
            </div>
        </div>
    </div>
    );
};

export default CreatePost;