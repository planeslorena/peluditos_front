export interface ITurno {
    id_turno?: number | null;
    dia: Date | null;
    hora: string;
    mascota: {id_mascota: number,num_mascota:number, nombre: string, duenio?: {nombre: string, telefono: number}};
    peluquera: {id_peluquera: number, nombre: string};
}