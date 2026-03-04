import { AxiosResponse } from 'axios';
import clientAxios from './axios';
import { ICliente } from '../model/ICliente';

export const getClientes = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('client');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllMascotas = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('client/mascotas');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getMascotas = async (user:number): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('client/mascotas/'+user);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTurnos = async (dni:number): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('turnos/'+dni);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createClient = async (user:ICliente): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.post('client', user);
        return response.data;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}

export const createMascota = async (mascota: any): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.post('client/mascotas', mascota);
        return response.data;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}

export const createTurno = async (turno: any): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.post('/turnos', turno);
        return response.status;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}

export const updateMascota = async (mascota: any): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.patch('client/mascotas/'+mascota.id_mascota, mascota);
        return response.data;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}

export const updateCliente = async (cliente: any): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.patch('client/'+cliente.id_cliente, cliente);
        return response.data;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}

export const deleteTurno = async (id_turno: any): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.delete('/turnos/' + id_turno);
        return response.status;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}