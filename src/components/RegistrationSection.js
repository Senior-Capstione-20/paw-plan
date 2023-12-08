import { useRef, useState, useEffect, useContext } from 'react';
import './RegistrationSection.css';

//firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

	const auth = getAuth();

	// functionality on button press
	const handleSubmit = async (e) => {
		// stops page from refreshing
		e.preventDefault();
		
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
			// The user has been created
			const user = userCredential.user;

			setSuccess(true);
			console.log(user);
			})
			.catch((error) => {
			// An error occurred
			
			const errorMessage = error.message;

			setErrorMessage(errorMessage);
			});

		
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
      			