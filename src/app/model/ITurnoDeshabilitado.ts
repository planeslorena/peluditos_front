export interface ITurnoDeshabilitado {
    id_turno_deshabilitado?: number;
    dia?: string | null;
    hora?: string;
    peluquera?: { id_peluquera?: number}
}