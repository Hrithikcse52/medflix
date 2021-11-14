import React from "react";
import Detailsone from "../Components/Detailsone/Detailsone";
import Hero from "../Components/Hero/Hero";
import Nav from "../Components/Nav/Nav";
import Doctor from "../images/doctor";

const Home = () => {
  const typeText = {
    first: "Welcome to MedFlix",
    sec: "Get Your Data Centralized",
    secnd:
      '<b> Specialized in <span style="color: #27ae60;"> Managing patient flow and Data</span></b>',
    thrd: "Clear Visulizations",
    four: "Online Consultations",
  };
  return (
    <>
      <Nav />
      <Hero typeText={typeText} type={true}>
        <Doctor />
      </Hero>
      <Detailsone />
      <Hero imgLeft={true} text="Come With Us">
        <Doctor />
      </Hero>

      <h1> Hello Home </h1>
    </>
  );
};

export default Home;
