import React from 'react';
import './LogInSection.css';

const LogInSection = () => {
	return (
		<div className='loginWrapper'>
			<div className='loginBoxBorder1'>
				<h1>Log In Here!</h1>
				<form>
					<label>
						<p>Username</p>
						<input type="text" />
					</label>
					<label>
						<p>Password</p>
						<input type="password" />
					</label>
					<div>
						<button type="submit">Submit</button>
					</div>
					<label>
						<p>Forgot Password? </p>
						<input type="email" placeholder='Enter Email'/>
					</label>
				</form>
			</div>
		</div>
	);
};

export default LogInSection;
      			