// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1412', // Update with your Spring Boot server URL
});

export default instance;
