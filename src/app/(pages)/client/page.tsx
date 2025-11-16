'use client'
import "./page.css";
import {  useState } from "react";
import Calendario from "@/app/components/Calendario/calendario";
import { TurnoContextProvider } from "@/app/context/turno.context";
import Horarios from "@/app/components/Horarios/horarios";
import Mascotas from "@/app/components/Mascotas/mascotas";
import Usuario from "@/app/components/Usuario/usuario";
import ConfirmarTurno from "@/app/components/ConfirmarTurno/confirmarTurno";
import { Menu } from "@/app/components/nav/nav";

export default function ClientPage() {
    const [mostrarUsuario, setMostrarUsuario] = useState(true);
    const [mostrarMascotas, setMostrarMascotas] = useState(false);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [mostrarHorarios, setMostrarHorarios] = useState(false);
    const [mostrarConfirmarTurno, setMostrarConfirmarTurno] = useState(false);


    return (
        <TurnoContextProvider>
            <main>
                <Menu />
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-12 col-lg-6 d-flex flex-column align-items-center justify-content-center rounded turnero my-3">
                            {mostrarUsuario &&
                                <Usuario
                                    setMostrarUsuario={setMostrarUsuario}
                                    setMostrarMascotas={setMostrarMascotas}
                                />}
                            {mostrarMascotas &&
                                <Mascotas
                                    setMostrarUsuario={setMostrarUsuario}
                                    setMostrarMascotas={setMostrarMascotas}
                                    setMostrarCalendario={setMostrarCalendario}
                                />}
                            {mostrarCalendario &&
                                <Calendario
                                    setMostrarMascotas={setMostrarMascotas}
                                    setMostrarCalendario={setMostrarCalendario}
                                    setMostrarHorarios={setMostrarHorarios}
                                />}
                            {mostrarHorarios &&
                                <Horarios
                                    setMostrarCalendario={setMostrarCalendario}
                                    setMostrarHorarios={setMostrarHorarios}
                                    setMostrarConfirmarTurno={setMostrarConfirmarTurno}
                                />}
                            {mostrarConfirmarTurno &&
                                <ConfirmarTurno
                                    setMostrarHorarios={setMostrarHorarios}
                                    setMostrarConfirmarTurno={setMostrarConfirmarTurno}
                                />}
                        </div>
                    </div>
                    {/*<div className="row">
                        <h1>Mis Turnos</h1>
                    </div>*/}
                </div>
            </main>
        </TurnoContextProvider>
    )
} 