import React from 'react';
import { Outlet } from 'react-router-dom';
import Intro from '../../components/Intro/Intro';
import Contact from '../../components/Contact/Contact';
import Header from './Header';
import Navigation from '../../components/Navigation/Navigation';
import Footer from './Footer';

const Home = () => {
    return (
    <>
        <Header/>
        <Navigation/>
        <div className='w-1100 m-auto flex flex-col justify-start items-center'>           
            <Outlet />
            <Intro />
            <Contact />
        </div>
        <Footer />
        </>
    );
};

export default Home;