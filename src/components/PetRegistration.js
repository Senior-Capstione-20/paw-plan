import React from "react";
import "./PetRegistration.css";

const PetRegistration = () => {
  return (
    <div className="pet-registration">
      <img className="gsp-1-icon" alt="" src="/gsp-1@2x.png" />
      <b className="register-pet">{`Register Pet `}</b>
      <div className="pet-registration-child" />
      <div className="pet-registration-item" />
      <div className="pet-registration-inner" />
      <div className="rectangle-div" />
      <i className="name">{`Name `}</i>
      <i className="age">{`Age `}</i>
      <i className="breed">{`Breed `}</i>
      <i className="weight">Weight</i>
      <div className="pet-registration-child1" />
      <i className="register">{`Register `}</i>
    </div>
  );
};

export default PetRegistration;
