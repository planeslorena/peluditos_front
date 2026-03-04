'use client'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './mascotas.css'
import AgregarMascota from '../AgregarMascota/agregarMascota';
import { getMascotas, getTurnos } from '@/app/services/client';
import { UserContext } from '@/app/context/user.context';
import moment from 'moment';



export default function Mascotas(props: any) {
    const { setMostrarUsuario, setMostrarMascotas, setMostrarCalendario }: { setMostrarUsuario: Function, setMostrarMascotas: Function, setMostrarCalendario: Function } = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const { userData } = useContext(UserContext);
    const [mascotas, setMascotas] = useState<string[]>([]);
    const [turnos, setTurnos] = useState<string[]>([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cargarMascotas = async () => {
        const mascotas = await getMascotas(userData?.dni || 0) || [];
        setMascotas(mascotas);
    }

    const cargarTurnos = async () => {
        const turnos = await getTurnos(userData?.dni || 0) || [];
        setTurnos(turnos);
    }

    const guardarMascota = (mascota: any) => {
        setTurnoData({
            ...turnoData,
            mascota: { id_mascota: mascota.id_mascota, nombre: mascota.nombre },
        })
        setMostrarMascotas(false);
        setMostrarCalendario(true);
    }

    const irAtras = () => {
        setMostrarMascotas(false);
        setMostrarUsuario(true);
    }

    useEffect(() => {
        cargarMascotas();
        cargarTurnos();
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
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="font-text h5 text-center">Próximos Turnos</p>
                <ul>
                    {turnos.map((turno: any, index: number) => {
                        return (
                            <li key={index} className="my-2 col-12 mx-auto">
                                {turno.mascota.nombre} - {moment(turno.dia).format('DD/MM/YYYY')} - {turno.hora} - Peluquero/a: {turno.peluquera.nombre}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}