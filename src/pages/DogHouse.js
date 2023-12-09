import React, {useState, useEffect} from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import useFirebaseAuthentication from '../useFirebaseAuthentication';




const DogHouse = () => {
    const db = getFirestore();
    const [dogs, setDogs] = useState([]);
    const currentUser = useFirebaseAuthentication();

    

    const getUser = async () => {
      if (!currentUser) {
        return;
      }
      const userDoc = doc(db, "users", currentUser);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setDogs(userData.dogs);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    useEffect(() => {
        getUser();
    });
    

    const [dogIndex, setDogIndex] = useState(0);

    const handleLeftClick = () => {
        setDogIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : dogs.length - 1));
    };
       
    const handleRightClick = () => {
        setDogIndex((prevIndex) => (prevIndex < dogs.length - 1 ? prevIndex + 1 : 0));
    };

    const dogElements = dogs ? dogs.map((dog, dogIndex) => {
        return (
            <div>
                <h2>{dog.petName}</h2>
                <p>{dog.petWeight} lbs</p>
                <p>{dog.petBreed}</p>
                <p>{dog.petAge} years old</p>
            </div>
        )
    }) : null;

  return (
    <div className='doghouse-container'>
        <div className='doghouse'>
            <h1 className='doghouse-header'>Dog House</h1>
            {/*Map over the Dog array from the firestore*/}
            <div className='doghouse-dog'>
            <button onClick={handleLeftClick}><FontAwesomeIcon icon={faArrowLeft} /></button>
                {dogElements[dogIndex]}
            <button onClick={handleRightClick}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div> 
    </div>
  )
}

export default DogHouse
