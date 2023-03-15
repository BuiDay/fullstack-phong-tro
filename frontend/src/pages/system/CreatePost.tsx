import React, { useEffect, useState } from 'react';
import Address from '../../components/Address/Address';
import Overview from '../../components/Overview/Overview';
import Loading from '../../components/Loading/Loading';
import icons from '../../utils/icons';
import { Button } from '../../components';
import { apiUploadImages } from '../../store/features/post/postService';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getCodes, getCodesArea } from '../../utils/getCodes';
import { apiCreatePost } from '../../store/features/post/postService';
import Swal from 'sweetalert2';

export interface IPayloadPost{
    userId?:string,
    categoryCode: string,
    title: string,
    priceNumber: number,
    areaNumber: number,
    images: string[],
    address: string,
    priceCode: string,
    areaCode: string,
    description: string,
    target: string,
    province: string,
    label?:string,
}
const { BsCameraFill, ImBin } = icons

const CreatePost = () => {
    const [payload, setPayload] = useState<IPayloadPost>({
        categoryCode: '',
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        images: [],
        address: '',
        priceCode: '',
        areaCode: '',
        description: '',
        target: '',
        province: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [imagesPreview, setImagesPreview] = useState<string[]>([])
    const { prices, areas,categories } = useAppSelector(state => state.app)
    const { currentData } = useAppSelector(state => state.user) 
    const handleFiles = async (e:React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        setIsLoading(true)
        let images:string[] = []
        let files:any = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', "iluh9gnx")
            let response:any = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data?.secure_url]
        }
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
    }

    const handleDeleteImage = (image:any) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }
    
    const handleSubmit = async () => {
        let priceCodeArr = getCodes(+payload.priceNumber / Math.pow(10,6), prices, 1, 15)
        let priceCode = priceCodeArr[0]?.code
        let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 20, 90)
        let areaCode = areaCodeArr[0]?.code

        let finalPayload = {
            ...payload,
            priceCode,
            areaCode,
            userId:currentData.id,
            priceNumber: +payload.priceNumber / Math.pow(10,6),
            label:`${categories?.find(item=>item.code === payload.categoryCode)?.value} ${payload?.address.split(',')[0]}`
        }
        console.log(finalPayload);
        const res:any= await apiCreatePost((finalPayload))
        if(res.err === 0){
            Swal.fire({
                title: "Thành công",
                text: "Bạn đã đăng tin thành công",
                icon: "success",
                confirmButtonText: "OK",
              }).then(function () {
                 setImagesPreview([])
                 setPayload({
                    categoryCode: '',
                    title: '',
                    priceNumber: 0,
                    areaNumber: 0,
                    images: [],
                    address: '',
                    priceCode: '',
                    areaCode: '',
                    description: '',
                    target: '',
                    province: ''
                 })
            });
        }else{
            Swal.fire({
                title: "Lỗi",
                text: "Bạn đã đăng tin không thành công",
                icon: "error",
                confirmButtonText: "OK",
              })
        }
    }

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
                            {isLoading
                                ? <Loading />
                                : <div className='flex flex-col items-center justify-center'>
                                    <BsCameraFill color='blue' size={50} />
                                    Thêm ảnh
                            </div>}
                        </label>
                        <input onChange={(e)=>handleFiles(e)} hidden type="file" id='file' multiple />
                        <div className='w-full'>
                            <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                            <div className='flex gap-4 items-center'>
                                {imagesPreview?.map(item => {
                                    return (
                                        <div key={item} className='relative w-1/3 h-1/3 '>
                                            <img src={item} alt="preview" className='w-full h-full object-cover rounded-md' />
                                            <span
                                                title='Xóa'
                                                onClick={() => handleDeleteImage(item)}
                                                className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'
                                            >
                                                <ImBin />
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={handleSubmit} text='Tạo mới' bgColor='bg-green-600' textColor='text-white' />
                {/* <div className='h-[500px]'>

                </div> */}
            </div>
            <div className='w-[30%] flex-none'>
                maps
             
            </div>
        </div>
    </div>
    );
};

export default CreatePost;