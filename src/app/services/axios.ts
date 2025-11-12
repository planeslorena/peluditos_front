'use client'
import axios from 'axios';

const createClient = () => {
  const client = axios.create({
    baseURL: 'http://72.61.48.155:8080/'
  });
  return client;
}
const clientAxios = createClient();
export default clientAxios;


