import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='w-100 w-1100 m-auto flex flex-col justify-start items-center'>
            <Outlet />
        </div>
    );
};

export default Home;