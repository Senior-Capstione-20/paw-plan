import React, { useRef, useState } from 'react';
import './PetRegistrationSection.css';

import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const PetRegistration = () => {
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

  const petNameRef = useRef();
  const errorRef = useRef();

  const auth = getAuth();
  const db = getFirestore();

  // get user
  let userDoc;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userDoc = doc(db, "users", user.uid);
    }
  });


  const handlePetRegistration = async (e) => {
    e.preventDefault();

    //make sure no empty values
    if (!petName || !petAge || !petBreed || !petWeight) {
      setErrorMessage('Please fill out all fields');
      errorRef.current.focus();
      return;
    }

    const pet = {
      petName: petName,
      petAge: petAge,
      petBreed: petBreed,
      petWeight: petWeight,
    };

    // add pet to database
    updateDoc(userDoc, {
      dogs: arrayUnion(pet)
    });

    //success
    setSuccess(true);
  };

  return (
    <div className='petregistration-wrapper'>
      <div className='PetRegistration'>
      {success ? (
          <>
            <b className='register-pet'>Success</b>
            <p className='register-paragraph'>Your pet has been registered!</p>
            <button className='register' onClick={() => setSuccess(false)}> Register Another Pet </button>
          </>

        ) : (
          <>
            <b className='register-pet'>{`Register Pet `}</b>
            <form onSubmit={handlePetRegistration}>
              <div className='pet-registration-inner'>
                <div className='input-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    id='name'
                    className='name'
                    placeholder='Enter Name'
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    required
                    ref={petNameRef}
                  />
                </div>

                <div className='input-group'>
                  <label htmlFor='age'>Age</label>
                  <input
                    type='text'
                    id='age'
                    className='age'
                    placeholder='Enter Age'
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                    required
                  />
                </div>

                <div className='input-group'>
                  <label htmlFor='breed'>Breed</label>
                  <input
                    type='text'
                    id='breed'
                    className='breed'
                    placeholder='Enter Breed'
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    required
                  />
                </div>

                <div className='input-group'>
                  <label htmlFor='weight'>Weight</label>
                  <input
                    type='text'
                    id='weight'
                    className='weight'
                    placeholder='Enter Weight'
                    value={petWeight}
                    onChange={(e) => setPetWeight(e.target.value)}
                    required
                  />
                </div>

                <div className='input-group'>
                  <button type='submit' className='register'>
                    Register Pet
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PetRegistration;