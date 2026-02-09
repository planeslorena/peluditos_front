'use client'
import axios from 'axios';

const createClient = () => {
  const client = axios.create({
    baseURL: 'https://peluditospoly.com.ar/api'
    //baseURL: 'http://localhost:8080'
  });
  return client;
}
const clientAxios = createClient();
export default clientAxios;


