import { AxiosResponse } from 'axios';
import clientAxios from './axios';

export const login = async (data: any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clientAxios.post('client/login', data);
    return respuesta.data;
  } catch (error: any) {
    console.log(error);
  }
}