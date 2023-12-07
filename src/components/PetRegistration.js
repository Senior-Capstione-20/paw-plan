import React from "react";
import "./PetRegistrationSection.css";

function PetRegistration() {
  return (
    <div className="petregistration-wrapper">
      <div className="PetRegistration">
        
        <b className="register-pet">{`Register Pet `}</b>
        {/*<img className="gsp-1-icon" alt="" src="/gsp-1@2x.png" /> */}
        <label  htmlFor="name"> Name</label>
              <input
              className="name"
              type="text"
              placeholder="Enter Name"
              />
              

        <label  htmlFor="age"> Age</label>
              <input
              className="age"
              type="text"
              placeholder="Enter Age"
        />

        <label  htmlFor="breed"> Breed</label>
              <input
                className="breed"
                type="text"
                placeholder="Enter Breed"
        />

        <label  htmlFor="weight"> Weight</label>
              <input
                className="weight"
                type="text"
                placeholder="Enter Weight"
        />
        <button className="rectangle-button">Register</button>
        
          
      </div>
    </div>
  );
}

export default PetRegistration;
