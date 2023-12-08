import React, {useState, useEffect} from 'react'

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";

const Profile = () => {
  const auth = getAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  
  const email = user ? user.email : 'email';

  
   const handleSubmit = async (event) => {
		// stops page from refreshing
    event.preventDefault();
    signOut(auth)
      .then(() => {
      // Sign-out successful.

      })
      .catch((error) => {
      // An error happened.
      });
    //refresh page
    window.location.reload();
  };

  return (
        <div className='profile-container'>
          <div className='profile-box'>
          { user ? (
              <>
                <h1 className='profile-header'> User's Profile Page</h1>
                <p>UserID: {user.uid}</p>
                <p>Email: {user.email}</p>
                <form onSubmit={ handleSubmit }>
                  <div>
                    <button>Sign out from Paw Plan</button>
                  </div>
                </form>
              </>
            ) : (
              <h1 className='profile-header'> Please log in to view your profile</h1>
            )}
          </div>
        </div>
  )
}

export default Profile
