import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const System = () => {
    return (
        <>
            <div className='w-full flex-col items-center md:flex hidden'>
                <Header />
                <div className='flex w-full flex-auto'>
                    <Sidebar />
                    <div className='flex-auto bg-white p-4 ml-[256px]'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className='h-screen flex justify-center items-center p-5 text-center'>
                <h1>Sử dụng laptop,pc để có trải nghiệm quản lí đăng tin tốt nhất</h1>
            </div>
        </>

    );
};

export default System;