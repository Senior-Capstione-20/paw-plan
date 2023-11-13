import React from "react";
import Walker from '../images/dogwalk.png'

const Hero = () => {
    return (
        <div class="hero">
            <div class="hero-text">
                <div class="top">
                        <div class="hero-main-headline">Doggy Plans All in One Place</div>
                </div>
                <div class="paragraph">
                        <p class="keep-track-of">Keep track of your dogs schedule including walks, vet visits, play dates, and so much more.</p>
                        <p class="keep-track-of">To get started, register below!</p>
                </div>
                <div class="hero-buttons-group">
                    <div class="hero-button">
                        <div class="hero-text-container">
                            <a class="nav-link" href='/registration'>Register</a>
                        </div> 
                    </div>
                 </div>
            </div>
            <img class="hero-img" alt="Man Walking Dog" src={Walker} />   
        </div>
    )
}

export default Hero;