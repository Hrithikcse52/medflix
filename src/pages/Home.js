import React from 'react';
import Feature from '../Components/Features/Feature';
import FeatureOne from '../Components/Features/FeatureOne';
import { Footer } from '../Components/Footer/Footer';
import Hero from '../Components/Hero/Hero';
import Nav from '../Components/Nav/Nav';
const Home = () => {
    // const typeText = {
    //   first: "Welcome to MedFlix",
    //   sec: "Get Your Data Centralized",
    //   secnd:
    //     '<b> Specialized in <span style="color: #27ae60;"> Managing patient flow and Data</span></b>',
    //   thrd: "Clear Visulizations",
    //   four: "Online Consultations",
    // };
    return (
        <>
            <Nav />
            <Hero />
            <Feature />
            <FeatureOne />
            <Footer />
        </>
    );
};

export default Home;
