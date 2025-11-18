'use client'
import { useContext, useState } from 'react';
import { TurnoContext } from '@/app/context/turno.context';
import './agregarMascota.css'
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import FormAgregarMascota from '../FormAgregarMascota/formAgregarMascota';

export default function AgregarMascota(props: any) {
    const { handleClose, show }: { setMostrarMascotas: Function, handleClose: Function, show: boolean } = props;
    const [mostrarForm, setMostrarForm] = useState(false);
    const [mostrarRequisitos, setMostrarRequisitos] = useState(true);

    const handleForm = () => {
        setMostrarRequisitos(false);
        setMostrarForm(true);
    }

    const cerrar = () => {
        handleClose();
        setMostrarForm(false);
        setMostrarRequisitos(true);
    }

    return (
        <>
            <Modal show={show} onHide={() => cerrar()}>
                {mostrarRequisitos &&
                    <Modal.Header closeButton>
                        <Modal.Title className="title-name">Requisitos para el turno</Modal.Title>
                    </Modal.Header>
                }
                {mostrarForm &&
                    <Modal.Header closeButton>
                        <Modal.Title className="title-name">Carga los datos de tu mascota</Modal.Title>
                    </Modal.Header>
                }
                <Modal.Body>
                    {mostrarRequisitos &&
                        <div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1 i-patita" icon={faPaw} size="lg" />
                                <p className='font-text m-1'>Venir con correa y pretal</p>
                            </div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1 i-patita" icon={faPaw} size="lg" />
                                <p className='font-text m-1'>Libreta sanitaria actualizada: vacunas anuales de rabia y séxtuple.</p>
                            </div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1 i-patita" icon={faPaw} size="lg"/>
                                <p className='font-text m-1'>Desparacitación cada 6 meses.</p>
                            </div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1 i-patita" icon={faPaw} size="lg"/>
                                <p className='font-text m-1'>SI se encuentra con tratamiento antipulgas o garrapatas: pipeta o pastilla aplicar 5 días antes del baño.</p>
                            </div>
                            <div className='d-flex flex-row align-items-start'>
                                <FontAwesomeIcon className="m-1 i-patita" icon={faPaw} size="lg"/>
                                <p className='font-text m-1'>Puntualidad: avisar con 24 hs de antelación si no puede asistir, de lo contrario se cobrará el servicio completo.</p>
                            </div>
                        </div>}
                    {mostrarForm &&
                        <FormAgregarMascota handleClose={handleClose} />
                    }
                </Modal.Body>
                {mostrarRequisitos &&
                    <Modal.Footer>
                        <button className='btn-style' onClick={() => handleForm()}>
                            Siguiente
                        </button>
                    </Modal.Footer>
                }
            </Modal>
        </>
    );
}