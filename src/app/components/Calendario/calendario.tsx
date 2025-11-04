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
    const { setMostrarCalendario, setMostrarHorarios }: { setMostrarCalendario: Function, setMostrarHorarios: Function } = props;
    const [value, onChange] = useState<Value>();
    const { turnoData, setTurnoData } = useContext(TurnoContext);

    const fechaMinima = moment(new Date()).add(1, 'days').toDate();
    const fechaMaxima = moment(new Date()).add(30, 'days').toDate();
    const [diasNoDisponibles, setDiasNoDisponibles] = useState<string[]>([]);

    // Función para obtener los días no disponibles
    const obtenerDiasNoDisponibles = async () => {
        const dias = [];
        let currentDate = new Date(fechaMinima);

        while (currentDate <= fechaMaxima) {
            const dia = new Date(currentDate);
            const esNoDisponible = await IsDiaNoDisponible(dia);
            if (esNoDisponible) {
                dias.push(moment(dia).format('YYYY-MM-DD'));
            }
            // Incrementar la fecha en 1 día
            currentDate.setDate(currentDate.getDate() + 1);
        }
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
        setMostrarCalendario(false);
        setMostrarHorarios(true);
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
    }, [value]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center calendario-box">
            <p className="font-text h5 text-center">Reserve aquí su turno</p>
            <p className="font-text text-center">Seleccione un día</p>
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
        </div>
    );
}