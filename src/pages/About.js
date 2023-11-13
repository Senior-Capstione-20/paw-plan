import React from 'react';
import DogsSwimming from '../images/dogs-swimming.jpg';

const About = () => {
    return (
        <div class="about-bg">
            <div class="about-section-text">
                <div class="about-section-text1">
                    <div class="about-top">
                        <b class="about-caption">About Us</b>
                        <div class="about-main-headline">Unlimited ideas for your projects</div>
                        <div class="about-secondary-headline">Let us help you!</div>
                    </div>
                    <div class="about-paragraph">
                        <p class="in-the-world"> In the world today, many of us are constantly on the go. Whether with work or school, adding a dog into the mix can be a lot to juggle all at once. Having a schedule and a list of things to check off as the day goes on can help eliminate some of the stress that comes with it. The motivation for this project is to help dog parents keep track of all the responsibilities and tasks that come with owning a dog.</p>
                        <p class="in-the-world">&nbsp;</p>
                        <p class="in-the-world"> You can schedule when your dog needs to be walked, fed, or any activity your dog could do and paw-plan will send a notification based on the selected times. The notifications will be categorized and specify if it is a walking reminder, a meal reminder, a vet appointment reminder, a park/play date reminder, and other potential categories to be decided later. You can also decide when you want the notifications to be sent.</p>
                    </div>
                    <div class="about-button" href='/register'>
                        <div class="about-text-container">
                            <a class="nav-link" href='/registration'>Register</a>
                        </div>
                    </div>
                </div>
                <img class="dogs-swimming" alt="" src={DogsSwimming} />
            </div>
        </div>
    );
}

export default About;