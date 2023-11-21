import React, {useState, useEffect} from 'react'

import { Icon } from 'react-icons-kit';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Profile = ({ userId }) => {
  const text = 'User\'s Password';
  const asterisk = '*'.repeat(text.length);
  const [show, setShow] = useState(false);

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
  const handleToggle = () => {
    setShow(!show);
   };

  return (
    <div className='profile-container'>
      <div className='profile-box'>
        <h1 className='profile-header'> User's Profile Page</h1>
        <p>Username: Dummy Username</p>
        <p>
          Password: <span className='password-text'>{show ? text : asterisk}</span> 
          {show ? <FaEyeSlash onClick={handleToggle} />
            : <FaEye onClick={handleToggle} />
          }
        </p>
      </div>
    </div>
  )
}

export default Profile
