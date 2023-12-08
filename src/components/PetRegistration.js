import React, { useRef, useState } from 'react';
import './PetRegistrationSection.css';
import axios from '../api/axios';

const REGISTER_PET_URL = '/register-pet';

const PetRegistration = () => {
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

  const petNameRef = useRef();
  const errorRef = useRef();

  const handlePetRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_PET_URL,
        { petName, petAge, petBreed, petWeight },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setSuccess(true);
        setPetName('');
        setPetAge('');
        setPetBreed('');
        setPetWeight('');
      } else {
        setErrorMessage('Unexpected response status');
        errorRef.current.focus();
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMessage('No server response');
      } else if (error.response?.status === 500) {
        setErrorMessage('Something went wrong');
      } else if (error.response?.status === 409) {
        setErrorMessage('Pet with this name already exists');
      } else {
        setErrorMessage('Glitch in the matrix occurred');
      }
      errorRef.current.focus();
    }
  };

  return (
    <div className='petregistration-wrapper'>
      <div className='PetRegistration'>
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

        {/* Display success or error message */}
        {success ? (
          <p>Pet registration successful!</p>
        ) : (
          <p
            ref={errorRef}
            className={errorMessage ? 'errorMessage' : 'offscreen'}
            aria-live='assertive'
            style={{ color: '#ff0000' }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default PetRegistration;