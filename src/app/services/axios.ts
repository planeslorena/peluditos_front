'use client'
import axios from 'axios';

const createClient = () => {
  const client = axios.create({
    baseURL: 'http://localhost:8080'//'https://peluditospoly.com.ar/api'
  });
  return client;
}
const clientAxios = createClient();
export default clientAxios;


