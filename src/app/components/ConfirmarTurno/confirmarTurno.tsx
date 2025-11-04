import { useContext } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import { createTurno } from '@/app/services/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';



export default function ConfirmarTurno(props: any) {
    const { setMostrarMascotas, setMostrarConfirmarTurno }: { setMostrarMascotas: Function, setMostrarConfirmarTurno: Function } = props;
    const { turnoData, setTurnoData } = useContext(TurnoContext);
    const router = useRouter();

    const guardarTurno = async () => {
        const turno = {
            dia: turnoData?.dia.toISOString().split('T')[0],
            hora: turnoData?.hora,
            mascota: { id_mascota: turnoData?.mascota.id_mascota },
            peluquera: { id_peluquera: turnoData?.peluquera.id_peluquera }
        };
        const resp = await createTurno(turno);

        if (resp == 500) {
            Swal.fire({
                title: `Algo no salio bien.`,
                text: "Intenta nuevamente.",
                icon: "error"
            });
        } else {
            Swal.fire({
                title: `Tu turno se agendó correctamente!`,
                text: "Recibirás un mensaje de confirmación.",
                icon: "success"
            }).then(() => {
                setTurnoData(null);
                router.push('/home');
            });
        }
    }

    const irAtras = () => {
        setMostrarConfirmarTurno(false);
        setMostrarMascotas(true);
    }

    return (
        <>
            <div className='d-flex flex-column align-items-start justify-content-start w-100'>
                <i className="bi bi-arrow-left" onClick={irAtras}></i>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <p className="font-text h5 text-center">Confirmar Turno</p>
                <p className="font-text text-center">
                    {`Dia: ${turnoData?.dia.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase())}`}
                </p>
                <p className="font-text text-center">
                    {`Hora: ${turnoData?.hora}`}
                </p>
                <p className="font-text text-center">
                    {'Mascota: ' + turnoData?.mascota}
                </p>
                <p className="font-text text-center">
                    {'Peluquero/a: ' + turnoData?.peluquera}
                </p>
                <button
                    className="btn-style rounded my-2 col-12 mx-auto"
                    onClick={guardarTurno}
                >
                    Confirmar turno
                </button>

            </div>

        </>
    );
}