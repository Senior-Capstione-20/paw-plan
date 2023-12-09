import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useFirebaseAuthentication = () => {
 const [currentUser, setCurrentUser] = useState(null);
 const auth = getAuth();

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
     if (user) {
       setCurrentUser(user.uid);
     } else {
       setCurrentUser(null);
     }
   });

   // Cleanup subscription on unmount
   return () => unsubscribe();
 }, [auth]);

 return currentUser;
};

export default useFirebaseAuthentication;
