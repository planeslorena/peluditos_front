export interface ITurno {
    id_turno?: number | null;
    dia: Date;
    hora: string;
    mascota: {id_mascota: number, nombre: string, duenio?: {nombre: string}} ;
    peluquera: {id_peluquera: number, nombre: string};
}