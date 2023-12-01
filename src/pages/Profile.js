import React, {useState, useEffect} from 'react'

import { FaEye, FaEyeSlash } from 'react-icons/fa';


const getUserFromToken = token => {
  if (token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error(error);
    }
  }
  return null;
 };

const Profile = ({ userId }) => {
  
  let token;
  try {
    token = localStorage.getItem('token');
  } catch (error) {
    console.error(error);
  }

  const user = getUserFromToken(token);
  console.log(user);

  const text = user.password;
  const asterisk = '*'.repeat(text.length);
  const [show, setShow] = useState(true);

 // password span text : {show ? text : asterisk}
  const handleToggle = () => {
    setShow(!show);
   };

  return (
    <div className='profile-container'>
      <div className='profile-box'>
        <h1 className='profile-header'> User's Profile Page</h1>
        <p>Username: {user.username}</p>
        <p>
          
          Password: <span className='password-text'>{show ? asterisk : text}</span> 
          {show ? <FaEyeSlash onClick={handleToggle} />
            : <FaEye onClick={handleToggle} />
          }
        </p>
      </div>
    </div>
  )
}

export default Profile
