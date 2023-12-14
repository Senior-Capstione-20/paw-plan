import { useRef, useState, useContext } from 'react';

//firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import './LogIn.css';



const Login = () => {
	// allow reference to variable fields from the webpage
	const userRef = useRef();
	const errorRef = useRef();

	// define variables for client data, dynamic error message parsing, and success flag
	const [email, setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [success, setSuccess] = useState('');

	//firebase auth
	const auth = getAuth();

	// functionality on button press
	const handleSubmit = async (e) => {
		// stops page from refreshing
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
			// The user has been signed in
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
				//routes to dashboard
				window.location.replace("/dashboard")
			) : (
				<section className='loginWrapper'>
					<section className='loginBoxBorder1'>
						<h1>Paw Plan Login</h1>
						<form onSubmit={handleSubmit}>
							<label htmlFor="username">
								<p>Email:</p>
								<input 
									type="email" 
									id="email"
									ref={userRef}
									autoComplete="off"
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
							Want to Register?<br />
						</p>
						<span className="line">
								<a href="/registration" style={{color: "#ede0ff"}}>Click here to sign up!</a>
						</span>
						<p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" style={{color: "#ff0000"}}>{errorMessage}</p>
					</section>
				</section>
			)}
			</>
	)
}

export default Login