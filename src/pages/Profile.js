import React, {useState, useEffect} from 'react'
import { sessionService } from 'redux-react-session';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../store';


import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Profile = () => {
  const text = 'User\'s Password';
  const asterisk = '*'.repeat(text.length);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    sessionService.loadSession()
      .then(currentSession => {
        if (currentSession.user) {
          console.log('User ' + user.username + ' is logged in');
        } else {
          console.log('User is not logged in');
          navigate('/login'); // Fixed the navigate function call
        }
      })
      .catch(err => console.error(err));
  }, [user.username, navigate]);


  const handleToggle = () => {
    setShow(!show);
   };

  return (
    <div className='profile-container'>
      <div className='profile-box'>
        <h1 className='profile-header'> User's Profile Page</h1>
        <p>Username: {user.username}</p>
        <p>
          Password: <span className='password-text'>{show ? text : asterisk}</span> 
          {show ? <FaEyeSlash onClick={handleToggle} />
            : <FaEye onClick={handleToggle} />
          }
        </p>
        <div className='logout-button'>
          <button onClick={() => {
            sessionService.deleteSession();
            store.dispatch({type: 'DELETE_USER'});
            navigate('/login');
          }}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
