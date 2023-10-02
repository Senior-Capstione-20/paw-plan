import React from "react";
const Hero = () => {
    return (
        <div class="hero">
            <div class="hero-text">
                <div class="top">
                        <div class="main-headline">Doggy plans all in one place</div>
                </div>
                <div class="paragraph">
                        <p class="keep-track-of">Keep track of your dogs schedule including walks, vet visits, play dates, and so much more.</p>
                        <p class="keep-track-of">To get started, register below!</p>
                </div>
                <div class="hero-buttons-group">
                        <div class="hero-button">
                            <div class="hero-text-container">
                                    <b class="hero-button-text">Register</b>
                            </div>
                            <img class="icon-jam-icons-outline-l" alt="" src="icon / jam-icons / outline & logos / arrow-right.svg" />
                            
                        </div>
                </div>
            </div>
            <img class="hero-img" alt="Man Walking Dog" src="./images/dogwalk.png" />   
        </div>
    )
}

export default Hero;