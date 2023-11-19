import { useRef, useState, useEffect, useContext } from 'react';
import './RegistrationSection.css';

import axios from '../api/axios';
const REGISTER_URL = '/register';

const RegistrationSection = () => {

	// define variables for client data, dynamic error message parsing, and success flag
	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState('');

	const userRef = useRef();
	const errRef = useRef();

	// functionality on button press
	const handleSubmit = async (e) => {
		// stops page from refreshing
		e.preventDefault();
		
		try {
			// send input data via POST request through axios to the server
			const response = await axios.post(REGISTER_URL, 
				JSON.stringify({user, pwd}), 
				{
					headers: { 'Content-Type': 'application/json'},
					withCredentials: true
				}
			);

			// for debuging: console.log(JSON.stringify(response?.data));
			
			// clear input fields and set success flag
			setUser('');
			setPwd('');
			setSuccess(true);
		} catch (err) {
			// in case of error, parse error message and display it
			if (!err?.response) {
				setErrMsg('No server response');
			} else if (err.response?.status === 500) {
				setErrMsg("Something went wrong");
			} else if (err.response?.status === 409) {
				setErrMsg("Username already exists");
			} else {
				setErrMsg('Glitch in the matrix occured');
			}
			errRef.current.focus();
		}
		
	}

	// render two different pages dynamically based on success flag
	return (
		<>
			{success ? (
				<section>
					<h1>Successfully registered to paw plan!</h1>
					<br />
					<p>
						<a href="/login">Go to sign in</a>
					</p>
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
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
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
				<p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive" style={{color: "#ff0000"}} > {errMsg} </p>
			</section>
		</section>
			)}
			</>
	);
};

export default RegistrationSection;
      			