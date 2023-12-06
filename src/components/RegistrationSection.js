import { useRef, useState, useEffect, useContext } from 'react';
import './RegistrationSection.css';

import axios from '../api/axios';
const REGISTER_URL = '/register';

const RegistrationSection = () => {

	// define variables for client data, dynamic error message parsing, and success flag
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [success, setSuccess] = useState('');

	const userRef = useRef();
	const errorRef = useRef();

	// functionality on button press
	const handleSubmit = async (e) => {
		// stops page from refreshing
		e.preventDefault();
		
		try {
			// send input data via POST request through axios to the server
			const response = await axios.post(REGISTER_URL, 
				JSON.stringify({user, password, email}), 
				{
					headers: { 'Content-Type': 'application/json'},
					withCredentials: true
				}
			);

			// for debuging: console.log(JSON.stringify(response?.data));
			
			// clear input fields and set success flag
			setUser('');
			setPassword('');
			setEmail('');
			setSuccess(true);
		} catch (error) {
			// in case of error, parse error message and display it
			if (!error?.response) {
				setErrorMessage('No server response');
			} else if (error.response?.status === 500) {
				setErrorMessage("Something went wrong");
			} else if (error.response?.status === 409) {
				setErrorMessage("Username already exists");
			} else {
				setErrorMessage('Glitch in the matrix occured');
			}
			errorRef.current.focus();
		}
		
	}

	// render two different pages dynamically based on success flag
	return (
		<>
			{success ? (
				<section className='registrationWrapper'>
					<section className='registrationBoxBorder1'>
						<h1>Registration Successful!</h1>
						<p>
							Please login to continue.<br />
						</p>
						<span className="line">
								<a href="/login" style={{color: "#ede0ff"}}>Click here to sign in!</a>
						</span>
					</section>
				</section>
			) : (
		<section className='registrationWrapper'>
			<section className='registrationBoxBorder1'>
				<h1>Paw Plan Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">
						<p>Username:</p>
						<input 
							type="text" 
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>
					</label>
					
					<label htmlFor="password">
						<p>Password:</p>
						<input 
							type="password" 
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
					</label>

					<label htmlFor="email">
						<p>Email:</p>
						<input 
							type="email" 
							id="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
					</label>
					<div>
						<button>Submit</button>
					</div>
					
				</form>
				<p>
					Already have an account?<br />
				</p>
				<span className="line">
						<a href="/login" style={{color: "#ede0ff"}}>Click here to sign in!</a>
				</span>
				<p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" style={{color: "#ff0000"}} > {errorMessage} </p>
			</section>
		</section>
			)}
			</>
	);
};

export default RegistrationSection;
      			