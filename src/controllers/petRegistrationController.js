import React, { useRef, useState } from 'react';
import './RegistrationSection.css';
import axios from '../api/axios';

const REGISTER_USER_URL = '/register-user';
const REGISTER_PET_URL = '/register-pet';

const RegistrationSection = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

  const userRef = useRef();
  const errorRef = useRef();

  const handleUserRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_USER_URL,
        { user, password },
        { withCredentials: true }
      );

      setSuccess(true);
    } catch (error) {
      handleErrors(error);
    }
  };

  const handlePetRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_PET_URL,
        { petName, petAge, petBreed, petWeight },
        { withCredentials: true }
      );

      setSuccess(true);
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = (error) => {
    if (!error?.response) {
      setErrorMessage('No server response');
    } else if (error.response?.status === 500) {
      setErrorMessage('Something went wrong');
    } else if (error.response?.status === 409) {
      setErrorMessage('Username or pet name already exists');
    } else {
      setErrorMessage('Glitch in the matrix occurred');
    }
    errorRef.current.focus();
  };

  return (
    <>
      {success ? (
        <section className='registrationWrapper'>
          <section className='registrationBoxBorder1'>
            <h1>Registration Successful!</h1>
            <p>Please login to continue.</p>
            <span className='line'>
              <a href='/login' style={{ color: '#ede0ff' }}>
                Click here to sign in!
              </a>
            </span>
          </section>
        </section>
      ) : (
        <section className='registrationWrapper'>
          <section className='registrationBoxBorder1'>
            <h1>Paw Plan Sign Up</h1>
            <form onSubmit={handleUserRegistration}>
              {/* User Registration Fields */}
              {/* ... (existing code) */}
            </form>

            <form onSubmit={handlePetRegistration}>
              {/* Pet Registration Fields */}
              {/* ... (existing code) */}
            </form>

            <p>
              Already have an account?<br />
              <span className='line'>
                <a href='/login' style={{ color: '#ede0ff' }}>
                  Click here to sign in!
                </a>
              </span>
            </p>
            <p
              ref={errorRef}
              className={errorMessage ? 'errorMessage' : 'offscreen'}
              aria-live='assertive'
              style={{ color: '#ff0000' }}
            >
              {' '}
              {errorMessage}{' '}
            </p>
          </section>
        </section>
      )}
    </>
  );
};

export default RegistrationSection;
