// src/pages/Home.tsx
import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import News from "../components/News";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <News />
    </>
  );
};

export default Home;
