'use client'
import { UserContext } from "@/app/context/user.context";
import "./page.css";
import { useContext, useState } from "react";
import Calendario from "@/app/components/Calendario/calendario";
import { TurnoContext, TurnoContextProvider } from "@/app/context/turno.context";
import Horarios from "@/app/components/Horarios/horarios";
import Mascotas from "@/app/components/Mascotas/mascotas";
import Usuario from "@/app/components/Usuario/usuario";
import ConfirmarTurno from "@/app/components/ConfirmarTurno/confirmarTurno";
import Peluqueras from "@/app/components/Peluqueras/peluqueras";
import { Menu } from "@/app/components/nav/nav";

export default function ClientPage() {
    const { userData } = useContext(UserContext);
    const { turnoData } = useContext(TurnoContext);
    const [mostrarCalendario, setMostrarCalendario] = useState(true);
    const [mostrarHorarios, setMostrarHorarios] = useState(false);
    const [mostrarUsuario, setMostrarUsuario] = useState(false);
    const [mostrarMascotas, setMostrarMascotas] = useState(false);
    const [mostrarPeluqueras, setMostrarPeluqueras] = useState(false);
    const [mostrarConfirmarTurno, setMostrarConfirmarTurno] = useState(false);


    return (
        <TurnoContextProvider>
            <main>
                <Menu />
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-12 col-lg-6 d-flex flex-column align-items-center justify-content-center rounded turnero my-3">
                            {mostrarCalendario &&
                                <Calendario
                                    setMostrarCalendario={setMostrarCalendario}
                                    setMostrarHorarios={setMostrarHorarios}
                                />}
                            {mostrarHorarios &&
                                <Horarios
                                    setMostrarCalendario={setMostrarCalendario}
                                    setMostrarHorarios={setMostrarHorarios}
                                    setMostrarUsuario={setMostrarUsuario}
                                />}
                            {mostrarUsuario &&
                                <Usuario
                                    setMostrarHorarios={setMostrarHorarios}
                                    setMostrarUsuario={setMostrarUsuario}
                                    setMostrarMascotas={setMostrarMascotas}
                                />}
                            {mostrarMascotas &&
                                <Mascotas
                                    setMostrarUsuario={setMostrarUsuario}
                                    setMostrarMascotas={setMostrarMascotas}
                                    setMostrarConfirmarTurno={setMostrarConfirmarTurno}
                                />}
                            {/*mostrarPeluqueras &&
                                <Peluqueras
                                    setMostrarMascotas={setMostrarMascotas}
                                    setMostrarPeluqueras={setMostrarPeluqueras}
                                    setMostrarConfirmarTurno={setMostrarConfirmarTurno}
                                />*/}
                            {mostrarConfirmarTurno &&
                                <ConfirmarTurno
                                    setMostrarMascotas={setMostrarMascotas}
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