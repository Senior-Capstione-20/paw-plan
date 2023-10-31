import React from 'react';
import './RegistrationSection.css';

const RegistrationSection = () => {
	return (
		<div className='registrationWrapper'>
			<div className='registrationBoxBorder1'>
				<h1>Register Here!</h1>
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
				</form>
			</div>
		</div>
	);
};

export default RegistrationSection;
      			