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
  const text = 'User\'s Password';
  const asterisk = '*'.repeat(text.length);
  const [show, setShow] = useState(false);
  
  let token;
  try {
    token = localStorage.getItem('token');
  } catch (error) {
    console.error(error);
  }

  const user = getUserFromToken(token);
  console.log(user);

  useEffect(() => {
    
  }, []);
  /* 
  This is for when users should be logged in to view profile

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [userId]);
  if (!user) {
    return <div>Loading...</div>;
  }
  */
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
          
          Password: <span className='password-text'>{show ? asterisk : user.password}</span> 
          {show ? <FaEyeSlash onClick={handleToggle} />
            : <FaEye onClick={handleToggle} />
          }
        </p>
      </div>
    </div>
  )
}

export default Profile
