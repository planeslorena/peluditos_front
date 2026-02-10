'use client'
import React, { useEffect, useState } from 'react';
import './page.css';
import { getPeluqueras, getTurnosDeshabilitados, getTurnosPorDia } from '@/app/services/admin';
import { IProfesional } from '@/app/model/IProfesional';
import { ITurno } from '@/app/model/Iturno';
import { Menu } from '@/app/components/nav/nav';
import { ITurnoDeshabilitado } from '@/app/model/ITurnoDeshabilitado';
import moment from 'moment';



export default function PelusPage() {
  const [peluqueras, setPeluqueras] = useState<IProfesional[]>([]);
  const [turnos, setTurnos] = useState<ITurno[]>([]);
  const [turnosDeshabilitados, setTurnosDeshabilitados] = useState<ITurnoDeshabilitado[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const cargarDatos = async () => {
    const peluqs = await getPeluqueras();
    const t = await getTurnosPorDia(fechaSeleccionada);
    const td = await getTurnosDeshabilitados(fechaSeleccionada);
    setPeluqueras(peluqs);
    setTurnos([...t]);
    setTurnosDeshabilitados(td);
  };

  useEffect(() => {
    cargarDatos();
  }, [fechaSeleccionada]);

  // obtenemos todos los horarios posibles (union de todos los horarios de todas las peluqueras y todos los horarios ds los turnos)
  const todosHorarios = Array.from(
    new Set([
      ...peluqueras.flatMap((p) =>
        p.horarios
          .filter((h) => h.dia === moment(fechaSeleccionada).day())
          .map((h) => h.horario)
      ),
      ...turnos.map((t) => t.hora),
    ])
  ).sort();

  const cambiarDia = (cantidad: number) => {
    const nuevaFecha = moment(fechaSeleccionada)
      .add(cantidad, 'days')
      .format('YYYY-MM-DD');

    setFechaSeleccionada(nuevaFecha);
  };

  return (
    <main>
      <Menu />

      <div className="agenda-page page-admin">
        <div className='d-flex flex-row justify-content-between'>
          <div className="d-flex flex-row align-items-center mb-4">
            <label htmlFor="fecha" className="me-2">Fecha:</label>

            <button
              type="button"
              className="btn btn-light me-2"
              onClick={() => cambiarDia(-1)}
            >
              <i className="bi bi-caret-left"></i>
            </button>

            <input
              id="fecha"
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              className="input-fecha"
            />

            <button
              type="button"
              className="btn btn-light ms-2"
              onClick={() => cambiarDia(1)}
            >
              <i className="bi bi-caret-right"></i>
            </button>
          </div>
        </div>
        <div className="table-admin-container">
          <table className="table-agenda">
            <thead className="table-admin-thead">
              <tr>
                <th className="table-admin-th">Horario</th>
                {peluqueras.map((p) => (
                  <th key={p.id_peluquera} className="table-admin-th text-center">
                    {p.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todosHorarios.map((hora) => (
                <tr key={hora}>
                  <td className="table-admin-td fw-bold">{hora}</td>
                  {peluqueras.map((p) => {
                    // Buscar turno de esta peluquera en este horario
                    const turno = turnos.find(
                      (t) =>
                        t.peluquera.id_peluquera === p.id_peluquera &&
                        t.hora === hora
                    );

                    // Si existe turno, mostrarlo (aunque sea fuera de horario habitual)
                    if (turno) {
                      const esHorarioExtra = !p.horarios.some((h) => h.horario === hora);
                      return (
                        <td
                          key={p.id_peluquera}
                          className={'table-admin-td ocupado'}
                          title={esHorarioExtra ? 'Turno fuera de horario habitual' : ''}
                        >
                          🐾 {turno.mascota.nombre} -
                          <br />{turno.mascota.duenio?.nombre}{esHorarioExtra ? ' (extra)' : ''}
                          <br />{turno.mascota.duenio?.telefono}
                        </td>
                      );
                    }

                    //Si no hay turno, pero el horario está deshabilitado → Deshabilitado
                    const turnoDeshabilitado = turnosDeshabilitados.find(
                      (t) => t.peluquera?.id_peluquera === p.id_peluquera && t.hora === hora
                    );
                    if (turnoDeshabilitado) {
                      return (
                        <td
                          key={p.id_peluquera}
                          className="table-admin-td no-horario"
                        >
                          Deshabilitado
                        </td>
                      );
                    }

                    // Si no hay turno y la peluquera trabaja ese horario → Pendiente
                    const tieneHorario = p.horarios.some(
                      (h) => h.horario === hora && h.dia === moment(fechaSeleccionada).day()
                    ); 
                    if (tieneHorario) {
                      return (
                        <td
                          key={p.id_peluquera}
                          className="table-admin-td pendiente clickable"
                        >
                          Pendiente
                        </td>
                      );
                    }

                    // Si no tiene turno ni trabaja ese horario → guion
                    return (
                      <td key={p.id_peluquera} className="table-admin-td no-horario">
                        –
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};