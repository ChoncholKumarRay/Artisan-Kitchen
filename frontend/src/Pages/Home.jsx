import React from 'react';
import Menu from './Menu';
import Banner from '../Components/Banner';
const Home = () => {
    return (
        <div className='bg-gray-600 min-h-screen'>
            <Banner/>
           <Menu/>
        </div>
    );
};

export default Home;