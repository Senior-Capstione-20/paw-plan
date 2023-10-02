import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import Planning from "./Planning";

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <Hero />
            <Planning />
            <Footer />
        </div>
    )
}

export default Home;