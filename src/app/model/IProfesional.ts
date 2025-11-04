export interface IProfesional {
    id_peluquera: number | null;
    nombre: string;
    dni: number;
    telefono: number;
    fecha_nacimiento: Date;
    horarios: Horario[];
}

export interface Horario {
    id_horario: number | null;
    dia: number;
    horario: string;
}