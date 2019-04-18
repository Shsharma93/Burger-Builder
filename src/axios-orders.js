import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-f6139.firebaseio.com/'
});

export default instance;
