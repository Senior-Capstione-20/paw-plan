import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import './LogIn.css';

import axios from '../api/axios';
const LOGIN_URL = '/login';



const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd])

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			const response = await axios.post(LOGIN_URL, 
				JSON.stringify({user, pwd}), 
				{
					headers: { 'Content-Type': 'application/json'},
					withCredentials: true
				}
			);
			console.log(JSON.stringify(response?.data));
			const accessToken = response?.data?.accessToken;
			//const roles = response?.data?.roles;
			//setAuth({ user, pwd, roles, accessToken })
			setAuth({ user, pwd, accessToken })
			setUser('');
			setPwd('');
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No server response');
			} else if (err.response?.status === 400) {
				setErrMsg('Invalid username or password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Something went wrong');
			}
			errRef.current.focus();
		}
		
	}

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
				<p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
			</section>
		</section>
			)}
			</>
	)
}

export default Login