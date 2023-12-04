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
  if (user != null) {
    console.log(user);
    
  }
  const text = user ? user.password : 'password';
  const asterisk = '*'.repeat(text.length);
  const [show, setShow] = useState(true);

 // password span text : {show ? text : asterisk}
  const handleToggle = () => {
    setShow(!show);
   };
  
   const handleSubmit = async (event) => {
		// stops page from refreshing
    event.preventDefault();
    localStorage.removeItem('token');
    //refresh page
    window.location.reload();
  };

  return (
    <>
      { user ? (
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
            <form onSubmit={ handleSubmit }>
              <div>
                <button>Sign out from Paw Plan</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        //route to login page
        window.location.href = '/login'
      )
      }
    </>
  )
}

export default Profile
