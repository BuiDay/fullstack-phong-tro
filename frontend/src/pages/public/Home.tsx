import React from 'react';
import { Outlet } from 'react-router-dom';
import Intro from '../../components/Intro/Intro';
import Contact from '../../components/Contact/Contact';

const Home = () => {
    return (
        <div className='w-100 w-1100 m-auto flex flex-col justify-start items-center'>
            <Outlet />
            <Intro />
            <Contact />
        </div>
    );
};

export default Home;