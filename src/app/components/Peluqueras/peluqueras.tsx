'use client'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';



export default function Peluqueras(props: any) {
    const { setMostrarMascotas, setMostrarPeluqueras, setMostrarConfirmarTurno }: { setMostrarMascotas: Function, setMostrarPeluqueras: Function , setMostrarConfirmarTurno: Function} = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const peluqueras = ['Poly', 'Ivana'];

    const guardarPeluquera = (peluquera: string) => {
        setTurnoData({...turnoData,
            peluquera: peluquera,
        })
        setMostrarPeluqueras(false);
        setMostrarConfirmarTurno(true);
    }

    const irAtras = () => {
        setMostrarPeluqueras(false);
        setMostrarMascotas(true);
    }

    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="font-text h5 text-center">Peluqueras disponibles</p>
                <p className="font-text text-center">
                    {turnoData?.dia.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase()) + ' - ' + turnoData?.hora + ' - ' + turnoData?.mascota}
                </p>

                {peluqueras.map((peluquera: string, index: number) => {
                    return (
                        <button key={index}
                            className="btn-style rounded my-2 col-12 mx-auto"
                            onClick={() => guardarPeluquera(peluquera)}
                        >
                            {peluquera}
                        </button>
                    )
                })}
            </div>
        </>
    );
}