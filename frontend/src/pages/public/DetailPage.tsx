import React, { useEffect, useState,useRef } from 'react';
import { apiGetPostsById } from '../../store/features/post/postService';
import { Link, useLocation } from 'react-router-dom';
import NewPost from '../../components/NewPost/NewPost';
import { Button } from '../../components';
import {BsFillTelephoneFill} from 'react-icons/bs'
import {BiMessageRoundedDots} from 'react-icons/bi'
import {FaFacebookF} from 'react-icons/fa'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";


interface IGetPost{
    address?:string, 
    attributes?:{price?:string, acreage?:string, published?:string, hashtag?: string}
    description?: string,
    id: string,
    images: {image: string}
    overviews: {area: string, type: string, target: string, bonus: string, created: string,expired:string}
    star: number,
    title: string
    user: {name: string, zalo: string, phone:string,fbUrl:string,avatar:string}
}


const DetailPage = () => {

    const location = useLocation()
    const [getPost, setGetPost] = useState<IGetPost>()
    const handleGetPost = async () =>{
        const res:any = await apiGetPostsById({id:location.pathname.split('/')[3]})
        if(res.err === 0){
            setGetPost(res.response)
        }else(
            setGetPost(undefined)
        )
    }
    
    useEffect(()=>{
        handleGetPost ()
    },[]) 

    console.log(getPost)

    return (
        <div className='w-full flex gap-4 mt-10'>
                <div className='w-[70%]'>
                    <div className='h-[400px] bg-black rounded-xl overflow-hidden'>
                        <Swiper
                            pagination={{
                            type: "fraction",
                            }}
                            loop={true}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {
                                getPost?.images.image && JSON.parse(getPost?.images.image).map((item:any)=>{
                                    return(
                                        <SwiperSlide><img className='h-[400px] object-contain m-auto' src={item} alt="" /></SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                    <div>
                        <h1></h1>
                    </div>
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <div className='bg-yellow-300 w-full rounded-md flex flex-col justify-center items-center py-5 gap-4'>
                        <div className='h-[80px] w-[80px] object-contain'>
                            <img className='rounded-full' src={`${getPost?.user.avatar ? JSON.parse(getPost?.user.avatar) : require('../../asset/images/anon-avatar.png')}`} alt="" />
                        </div>
                        <span className='text-2xl font-medium'>{getPost?.user.name && getPost?.user.name}</span>
                            <Link target="_blank" className='w-full px-10'to={`tel:${getPost?.user.phone && getPost?.user.phone}`} >
                                <Button target="_blank" fullWidth={true} link={`tel:${getPost?.user.phone && getPost?.user.phone}`} icon={<BsFillTelephoneFill/>} text={getPost?.user.phone && getPost?.user.phone} bgColor='bg-[#16c784]' px="px-10" py='py-1' fontSize='text-xl' textColor='text-white'></Button>
                            </Link>
                            {
                                getPost?.user.zalo && 
                                <Link target="_blank" className='w-full px-10'to={`https://zalo.me/${getPost?.user.zalo}`} >
                                    <Button target="_blank" fullWidth={true} link={`https://zalo.me/${getPost?.user.zalo}`} icon={<BiMessageRoundedDots/>} text="Nhắn Zalo" bgColor='bg-[white]' textColor='text-black' fontSize='text-md' py='py-1'></Button>
                                </Link>
                            }

                            {
                                getPost?.user.fbUrl && 
                                <Link target="_blank" className='w-full px-10'to={getPost?.user.fbUrl}  >
                                    <Button target="_blank" fullWidth={true} link={getPost?.user.fbUrl} icon={<FaFacebookF/>} text="Facebook" bgColor='bg-[white]' textColor='text-black' fontSize='text-md' py='py-1'></Button>
                                </Link>
                            } 
                    </div>
                    <NewPost />
                </div>
            </div>
    );
};

export default DetailPage;

