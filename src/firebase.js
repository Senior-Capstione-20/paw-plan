import {initializeApp} from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCIfqQxDGMRiiVl_jSh6JSBpnzYtO_LyuY",
    authDomain: "paw-plan-96d84.firebaseapp.com",
    projectId: "paw-plan-96d84",
    storageBucket: "paw-plan-96d84.appspot.com",
    messagingSenderId: "680254872125",
    appId: "1:680254872125:web:de1f95db2bd54bc3a06854",
    measurementId: "G-WY7L3Y67DX"
  };
  
  const app = initializeApp(firebaseConfig);

  export default app;