import React, {useState, useEffect} from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  
  useEffect(() => {
    getUser();
  });

  const text = user ? password : 'password';
  const asterisk = '*'.repeat(text.length);
  const [show, setShow] = useState(true);

  const handleToggle = () => {
    setShow(!show);
  }

  //get password from database
  const getUser = async () => {
    if (!user) {
      return;
    }
    const userDoc = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      setPassword(userData.password);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  
   const handleSubmit = async (event) => {
		// stops page from refreshing
    event.preventDefault();
    signOut(auth)
      .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
      })
      .catch((error) => {
      // An error happened.
      console.log(error);
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
                <p>Email: {user.email}</p>
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
              </>
            ) : (
              <h1 className='profile-header'> Please log in to view your profile</h1>
            )}
          </div>
        </div>
  )
}

export default Profile;
