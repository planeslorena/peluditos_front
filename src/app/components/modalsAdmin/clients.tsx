//import { createUser, updateClient } from '@/app/services/User';
import './modales.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICliente } from '@/app/model/ICliente';
import { ModalMascota } from './mascotas';
import { createClient, getMascotas, updateCliente } from '@/app/services/client';

const schema = yup.object().shape({
    nombre: yup.string().required('El nombre y apellido son requeridos'),
    dni: yup.string()
        .required('El DNI es requerido')
        .matches(/^\d+$/, 'El DNI debe contener solo números')
        .min(7, 'El DNI debe tener al menos 7 dígitos')
        .max(8, 'El DNI no puede tener más de 8 dígitos'),
    mail: yup.string().email('Ingrese un email válido').required('El email es requerido'),
    telefono: yup.string().required('El teléfono es requerido'),
})

interface clientProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    action: string;
    updateData: () => void;
}

export const ModalCliente: React.FC<clientProps> = ({ show, handleClose, data, action, updateData }) => {

    const [errorRegister, setErrorRegister] = useState('');
    const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm<ICliente>({ mode: 'onChange', resolver: yupResolver(schema) as any });
    const [showMascota, setShowMascota] = useState<boolean>(false);
    const [mascotasCliente, setMascotasCliente] = useState<any[]>(data?.mascotas || []);

    const loadMascotasCliente = async () => {
        const resp = await getMascotas(data.dni)
        setMascotasCliente(resp);
    };

    const normalizeData = (data: ICliente) => {
        return {
            ...data,
            id_cliente: Number(data.id_cliente),
            dni: Number(data.dni),
            nombre: data.nombre,
            telefono: Number(data.telefono),
            mail: data.mail
        };
    }

    const onSubmit: SubmitHandler<ICliente> = async (newData) => {
        const cliente = normalizeData(newData);

        if (action == 'Agregar') {
            const resp = await createClient(cliente);

            if (resp == 409) {
                Swal.fire({
                    title: `Error en el alta`,
                    text: "El DNI ingresado ya se encuentra registrado.",
                    icon: "error"
                });
                reset();
            } else {
                Swal.fire({
                    title: `Alta Cliente`,
                    text: "Cliente registrado con exito!",
                    icon: "success"
                });
                handleClose();
                reset();
                updateData();
            }
        } else if (action == 'Modificar') {
            const originalData = normalizeData(data);
            let isModified = false;

            for (const key in cliente) {
                if (JSON.stringify(cliente[key as keyof typeof cliente]) != JSON.stringify(originalData[key as keyof typeof originalData])) {
                    isModified = true;
                    break;
                }
            }
            if (!isModified) {
                setErrorRegister('Debe modificar algún dato.');
            } else {
                setErrorRegister('');
                const resp = await updateCliente(cliente);

                if (resp == 404) {
                    setErrorRegister('No se encontro cliente para actualizar')
                } else if (resp == 409) {
                    Swal.fire({
                        title: `Error en la modificación`,
                        text: "El DNI ingresado ya se encuentra registrado.",
                        icon: "error"
                    });
                    reset();
                } else {
                    Swal.fire({
                        title: `Modificación Cliente`,
                        text: "Cliente actualizado con exito!",
                        icon: "success"
                    });
                    handleClose();
                    reset();
                    updateData();
                }
            }
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} scrollable={true} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{action} cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form id="pet-form" onSubmit={handleSubmit(onSubmit)} className="pet-form">
                        <input defaultValue={data?.id_cliente} disabled hidden
                            {...register('id_cliente')} />
                        <div className="form-group mb-2">
                            <label>Nombre y Apellido</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver'}
                                defaultValue={data?.nombre}
                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                {...register('nombre')}
                            />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                        </div>

                        <div className="row mb-2">
                            <div className="col">
                                <label>DNI</label>
                                <input
                                    type="number"
                                    readOnly={action === 'Ver'}
                                    defaultValue={data?.dni}
                                    className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
                                    {...register('dni')}
                                />
                                {errors.dni && <div className="invalid-feedback">{errors.dni.message}</div>}
                            </div>
                            <div className="col">
                                <label>Teléfono</label>
                                <input
                                    type="tel"
                                    readOnly={action === 'Ver'}
                                    defaultValue={data?.telefono}
                                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                    {...register('telefono')}
                                />
                                {errors.telefono && <div className="invalid-feedback">{errors.telefono.message}</div>}
                            </div>
                        </div>

                        <div className="form-group mb-2">
                            <label>Email</label>
                            <input
                                type="email"
                                readOnly={action === 'Ver'}
                                defaultValue={data?.mail}
                                className={`form-control ${errors.mail ? 'is-invalid' : ''}`}
                                {...register('mail')}
                            />
                            {errors.mail && <div className="invalid-feedback">{errors.mail.message}</div>}
                        </div>
                        {action !== 'Agregar' &&
                            <div className="form-group mb-2">
                                <label className='mb-2'>Mascotas del cliente:</label>
                                <ul className='list-group'>
                                    {mascotasCliente.map((mascota: any) => (
                                        <li className='list-group-item' key={mascota.id_mascota}>
                                            <p>{mascota.nombre}</p>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        }
                        <small className='text-validation'>{errorRegister}</small>
                        <div className='m-3 d-flex justify-content-end'>
                            {action !== 'Agregar' &&
                                <button type='button' onClick={() => setShowMascota(true)} className='btn-style'>Agregar mascota</button>
                            }
                            <button type='submit' hidden={action === 'Ver'} className='btn-style'>{action} cliente</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {action !== 'Agregar' && (
                <ModalMascota
                    key={data?.dni}
                    dataDuenio={data}
                    show={showMascota}
                    handleClose={() => setShowMascota(false)}
                    action={"Agregar"}
                    updateData={loadMascotasCliente}
                />
            )}
        </>
    )
}

