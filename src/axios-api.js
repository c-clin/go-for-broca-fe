import axios from 'axios';

const authInstance = axios.create({
  baseURL: `https://goforbroca.herokuapp.com//api`,
  headers: {
    accept: 'application/json'
  }
});

export default authInstance;
