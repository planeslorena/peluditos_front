'use client'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './mascotas.css'
import AgregarMascota from '../AgregarMascota/agregarMascota';
import { getMascotas } from '@/app/services/client';
import { UserContext } from '@/app/context/user.context';



export default function Mascotas(props: any) {
    const { setMostrarUsuario, setMostrarMascotas, setMostrarConfirmarTurno }: { setMostrarUsuario: Function, setMostrarMascotas: Function, setMostrarConfirmarTurno: Function } = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const {userData} = useContext(UserContext);
    const [mascotas, setMascotas] = useState<string[]>([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cargarMascotas = async () => {
        const mascotas = await getMascotas(userData?.dni || 0) || [];
        setMascotas(mascotas);
    }

    const guardarMascota = (mascota: any) => {
        setTurnoData({
            ...turnoData,
            mascota: {id_mascota: mascota.id_mascota, nombre: mascota.nombre},
        })
        setMostrarMascotas(false);
        setMostrarConfirmarTurno(true);
    }

    const irAtras = () => {
        setMostrarMascotas(false);
        setMostrarUsuario(true);
    }

    useEffect(() => {
        cargarMascotas();
    }, []);

    useEffect(() => {
        cargarMascotas();
    }, [show]);

    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="font-text h5 text-center">Mascota</p>
                <p className="font-text text-center">
                    {turnoData?.dia.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase()) + ' ' + turnoData!.hora + ' con ' + turnoData!.peluquera.nombre}
                </p>

                {mascotas.map((mascota: any, index: number) => {
                    return (
                        <button key={index}
                            className="btn-style rounded my-2 col-12 mx-auto"
                            onClick={() => guardarMascota(mascota)}
                        >
                            {mascota.nombre}
                        </button>
                    )
                })}
                <button
                    className="btn-style rounded my-2 col-12 mx-auto"
                    onClick={handleShow}
                >
                    Agregar Mascota
                </button>
                <AgregarMascota show={show} handleClose={handleClose}></AgregarMascota>
            </div>

        </>
    );
}