import React from 'react';
import Doghike from '../images/dog-hike.png';
import Threedogs from '../images/3dogs.png';
import DogVet from '../images/dog-vet.png';
import DogHouse from '../images/dog-house.png';
import DogPark from '../images/dog-park.png';

const Planning = () => {
    return (	
  	    <div class="planning">
    		<div class="plan-row">
      			<img class="dog-hike" alt="" src={Doghike} />
      			
      			<div class="planning-section">
        				<div class="top">
          					<b class="caption">Planning</b>
          					<div class="secondary-headline">Easily make your schedule around your dog</div>
        				</div>
        				<div class="paragraph">Paw-Plan gives you the resources to keep you and others informed on everything dog related! Stop miscommunication today.</div>
        				<div class="plan-buttons-group">
          					<div class="plan-button">
            						<div class="plan-text-container">
              							<b class="plan-button-text">Register</b>
            						</div>
          					</div>
        				</div>
      			</div>
        		</div>
        		<div class="planning-row1">
          			<img class="three-dogs" alt="" src={Threedogs}/>
          			<img class="dog-vet" alt="" src={DogVet}/>
          			<img class="dog-park" alt="" src={DogPark}/>
          			<img class="dog-house" alt="" src={DogHouse}/>
          			
        		</div>
      	    </div>
        );
    }
    export default Planning;

