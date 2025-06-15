import React from 'react';
import Navbar from '../Components/Main Components/Navbar';
import Banner from '../Components/Home Components/Banner';
import Footer from '../Components/Main Components/Footer';
import TopCategories from '../Components/Home Components/TopCategories';
import DidYouKnow from '../Components/Home Components/DidYouKnow';
import Testimonials from '../Components/Home Components/Testimonials';
import FAQ from '../Components/Home Components/FAQ';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <TopCategories />
            <DidYouKnow />
            <Testimonials />
            <FAQ />
            <Footer />
        </div>
    );
};

export default Home;