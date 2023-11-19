import axios from 'axios';

// create a base route on the server to redirect to corresponding login and register routes
export default axios.create({
    baseURL: 'http://localhost:3500'
});