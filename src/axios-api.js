import axios from 'axios';

let token = localStorage.getItem('token');

const authInstance = axios.create({
  baseURL: `http://localhost:5000/api`,
  headers: {
    Authorization: `bearer ${token}`,
    accept: 'application/json'
  }
});

export default authInstance;
