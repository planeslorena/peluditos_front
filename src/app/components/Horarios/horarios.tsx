'use client'
import { useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './horarios.css'
import { getTurnosDisponibles } from '@/app/services/admin';

export default function Horarios(props: any) {
    const { setMostrarCalendario, setMostrarHorarios, setMostrarConfirmarTurno }: { setMostrarCalendario: Function, setMostrarHorarios: Function, setMostrarConfirmarTurno: Function } = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const [horariosDisp, setHorariosDisp] = useState<any[]>([]);

    const cargarHorarios = async () => {
        const horariosDisp = await getTurnosDisponibles({ day: turnoData?.dia.toISOString().split('T')[0] || '' }) || [];
        setHorariosDisp(horariosDisp);
    }

    const guardarHorario = (horario: any) => {
        setTurnoData({
            ...turnoData,
            hora: horario.horario,
            peluquera: { id_peluquera: horario.peluquera.id_peluquera, nombre: horario.peluquera.nombre },
        })
        setMostrarHorarios(false);
        setMostrarConfirmarTurno(true);
    }

    const irAtras = () => {
        setMostrarHorarios(false);
        setMostrarCalendario(true);
    }

    useEffect(() => {
        cargarHorarios();
    }, []);


    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="font-text h5 text-center">Horarios disponibles</p>
                <p className="font-text text-center">
                    {'Turno para: ' + turnoData?.mascota.nombre + ' el ' + turnoData?.dia.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase())}
                </p>

                {horariosDisp.map((horario: any, index: number) => {
                    return (
                        <button key={index}
                            className="btn-style rounded my-2 col-12 mx-auto"
                            onClick={() => guardarHorario(horario)}
                        >
                            {horario.horario} con {horario.peluquera.nombre}
                        </button>
                    )
                })}
            </div>
        </>
    );
}