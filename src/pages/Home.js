import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Planning from "../components/Planning";

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