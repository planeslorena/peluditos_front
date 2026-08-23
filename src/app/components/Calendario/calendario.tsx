'use client'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './calendario.css'
import { use, useContext, useEffect, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import moment from 'moment';
import { IsDiaNoDisponible } from '@/app/services/admin';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendario(props: any) {
    const { setMostrarMascotas, setMostrarCalendario, setMostrarHorarios }: { setMostrarMascotas: Function, setMostrarCalendario: Function, setMostrarHorarios: Function } = props;
    const [value, onChange] = useState<Value>();
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const fechaMinima = moment().add(1, 'day').startOf('day').toDate();
    const fechaMaxima = moment('30/09/2026', 'DD/MM/YYYY').toDate(); //moment(new Date()).add(30, 'days').toDate();
    const [diasNoDisponibles, setDiasNoDisponibles] = useState<string[]>([]);
    const [sinDia, setSinDia] = useState<string>();

    const irAtras = () => {
        setMostrarCalendario(false);
        setMostrarMascotas(true);
    }

    // Función para obtener los días no disponibles
    const obtenerDiasNoDisponibles = async () => {
        const fechaMin = new Date(fechaMinima);
        const fechaMax = new Date(fechaMaxima)
        const dias = await IsDiaNoDisponible(fechaMin, fechaMax);;

        setDiasNoDisponibles(dias);
    }

    //Deshabilita del calendario los domingos y los dias en los que no hay turnos disponibles
    const isDateDisabled = (date: Date): boolean => {
        const day = date.getDay();
        const isSunday = day === 0;
        const isInRango = date >= fechaMinima && date <= fechaMaxima;
        const diaNoDisponible = diasNoDisponibles.includes(moment(date).format('YYYY-MM-DD'));
        return isSunday || diaNoDisponible || !isInRango;
    }

    const guardarDia = () => {
        if (value) {
            setMostrarCalendario(false);
            setMostrarHorarios(true);
        } else {
            setSinDia('Debe seleccionar un día');
        }
    }

    useEffect(() => {
        obtenerDiasNoDisponibles();
    }, []);

    useEffect(() => {
        const turnoDataNew = {
            ...turnoData,
            dia: value,
        }
        setTurnoData(turnoDataNew);
        setSinDia("");
    }, [value]);

    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            {/*<p className="font-text h5 text-center m-1"> Proximamente se habilitarán los turnos! </p>
                <p className="font-text h5 text-center m-1">Estate atento a nuestras redes sociales.</p> 
                <p className="font-text h5 text-center m-1">Peluditos</p>*/}
            <div className="d-flex flex-column align-items-center justify-content-center calendario-box">
                <p className="font-text h5 text-center">Reserve aquí su turno para: <br />{turnoData?.mascota.nombre}</p>
                <Calendar
                    className="mi-calendario"
                    locale="es-ES"
                    value={value}
                    onChange={onChange}
                    minDate={fechaMinima}
                    maxDate={fechaMaxima}
                    //Si el dia no tiene turnos disponibles lo deshabilita
                    tileDisabled={({ date }) => isDateDisabled(date)}
                    //SI el dia tiene turnos disponibles le pone un estilo especial
                    tileClassName={({ date }) => {
                        const isDiaNoDisponible = isDateDisabled(date)
                        return isDiaNoDisponible ? '' : 'dia-disponible';
                    }}
                />
                <button
                    className="btn-style rounded p-1 m-3 my-3 d-grid gap-2 col-6 mx-auto"
                    onClick={() => guardarDia()}
                >
                    Siguiente
                </button>
                <small>{sinDia}</small>
            </div>
        </>
    );
}