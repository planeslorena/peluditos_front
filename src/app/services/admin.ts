import { AxiosResponse } from 'axios';
import clientAxios from './axios';
import { ITurno } from '../model/Iturno';
import { IProfesional } from '../model/IProfesional';
import { ITurnoDeshabilitado } from '../model/ITurnoDeshabilitado';

export const getRazas = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('admin/razas');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getPeluqueras = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('admin/peluqueras');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTurnosDisponibles = async ({day}: {day: string}): Promise<any> => {
    try {        
        const response: AxiosResponse<any, any> = await clientAxios.get('turnos/turnosDisponibles',{params: {day}});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const IsDiaNoDisponible = async (from: Date, to: Date): Promise<any> => {
    try {        
        const response: AxiosResponse<any, any> = await clientAxios.get('turnos/diasNoDisponibles',{params: {from,to}});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTurnosPorDia = async (day: string): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('turnos/turnosPorDia/'+day);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTurnosDeshabilitados = async (day: string): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.get('turnos/turnosDeshabilitados/'+day);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deshabilitarTurno = async (turno: ITurnoDeshabilitado): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.post('turnos/deshabilitarTurno', turno);
        return response.status;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}

export const createProfesional = async (profesional: IProfesional): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.post('admin/peluqueras', profesional);
        return response.data;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}

export const updateProfesional = async (profesional: IProfesional): Promise<any> => {
    try {
        const response: AxiosResponse<any, any> = await clientAxios.put('admin/peluqueras/'+profesional.id_peluquera, profesional);
        return response.status;
    } catch (error:any) {
        return error.response.data.statusCode;
    }
}