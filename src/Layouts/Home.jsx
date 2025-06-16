import React from 'react';
import Navbar from '../Components/Main Components/Navbar';
import Banner from '../Components/Home Components/Banner';
import Footer from '../Components/Main Components/Footer';
import TopCategories from '../Components/Home Components/TopCategories';
import DidYouKnow from '../Components/Home Components/DidYouKnow';
import Testimonials from '../Components/Home Components/Testimonials';
import FAQ from '../Components/Home Components/FAQ';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BooKitsu | Home</title>
            </Helmet>
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