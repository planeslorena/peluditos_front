import { ICliente } from "./ICliente";

export interface Imascota {
    id_mascota: number;
    num_mascota: number | null;
    nombre: string;
    raza: string;
    edad: number;
    castrado: boolean;
    desparasitado: boolean;
    veterinario: string;
    tel_veterinario: number | null;
    direccion_veterinario: string | null;
    sextuple: string | null;
    antirrabica: string | null;
    shampoo: string | null;
    observaciones: string | null;
    duenio: ICliente;
}