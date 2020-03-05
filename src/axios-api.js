import axios from 'axios';
import keys from './config/keys';

const authInstance = axios.create({
  baseURL: `${keys.HOST}/api`,
  headers: {
    accept: 'application/json'
  }
});

export default authInstance;
