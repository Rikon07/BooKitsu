import React from 'react';
import Navbar from '../Components/Main Components/Navbar';
import Banner from '../Components/Home Components/Banner';
import Footer from '../Components/Main Components/Footer';
import TopCategories from '../Components/Home Components/TopCategories';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <TopCategories />
            <Footer />
        </div>
    );
};

export default Home;