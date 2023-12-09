import React, {useState, useEffect} from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged} from "firebase/auth";



const DogHouse = () => {
    const auth = getAuth();
    const db = getFirestore();
    let userDoc;

    const [dogs, setDogs] = useState([]);

    onAuthStateChanged(auth, (user) => {
        if (user){
            userDoc = doc(db, "users", user.uid);
        }

        getUser();
    });

    

    const getUser = async () => {
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setDogs(userData.dogs);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    const dogElements = dogs ? dogs.map((dog, index) => {
        return (
          <div key={index}>
            <h2>{dog.petName}</h2>
            <p>{dog.petWeight} lbs</p>
            <p>{dog.petBreed}</p>
            <p>{dog.petAge} years old</p>
          </div>
        );
    }) : null;

  return (
    <div className='doghouse-container'>
        <div className='doghouse'>
            <h1 className='doghouse-header'>Dog House</h1>
            {/*Map over the Dog array from the firestore*/}
            {dogElements}
        </div> 
    </div>
  )
}

export default DogHouse
