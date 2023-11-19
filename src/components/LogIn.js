import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import './LogIn.css';

import axios from '../api/axios';
const LOGIN_URL = '/login';



const Login = () => {
	// use auth context across app
	const { setAuth } = useContext(AuthContext);

	// allow reference to variable fields from the webpage
	const userRef = useRef();
	const errRef = useRef();

	// define variables for client data, dynamic error message parsing, and success flag
	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState('');

	// functionality on button press
	const handleSubmit = async (e) => {
		// stops page from refreshing
		e.preventDefault();
		
		try {
			// send input data via POST request through axios to the server
			const response = await axios.post(LOGIN_URL, 
				JSON.stringify({user, pwd}), 
				{
					headers: { 'Content-Type': 'application/json'},
					withCredentials: true
				}
			);
			// for debuging: console.log(JSON.stringify(response?.data));
			
			// set authorized across app, clear input fields and set success flag
			setAuth({ user, pwd })
			setUser('');
			setPwd('');
			setSuccess(true);
		} catch (err) {
			// in case of error, parse error message and display it
			if (!err?.response) {
				setErrMsg('No server response');
			} else if (err.response?.status === 400) {
				setErrMsg('Invalid username or password');
			} else if (err.response?.status === 401) {
				setErrMsg('Wrong password');
			} else {
				setErrMsg('Something went wrong');
			}
			errRef.current.focus();
		}
		
	}

	// render two different pages dynamically based on success flag
	return (
		<>
			{success ? (
				<section>
					<h1>Successfully logged in!</h1>
					<br />
					<p>
						<a href="/">Go to home page</a>
					</p>
				</section>
			) : (
		<section className='loginWrapper'>
			<section className='loginBoxBorder1'>
				<h1>Paw Plan Login</h1>
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
					Want to Register?<br />
				</p>
				<span className="line">
						<a href="/registration" style={{color: "#ede0ff"}}>Click here to sign up!</a>
				</span>
				<p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive" style={{color: "#ff0000"}}>{errMsg}</p>
			</section>
		</section>
			)}
			</>
	)
}

export default Login