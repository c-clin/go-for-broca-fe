import axios from 'axios';
import keys from './config/keys';

const authInstance = axios.create({
  baseURL: `https://goforbroca.herokuapp.com//api`,
  headers: {
    accept: 'application/json'
  }
});

export default authInstance;
