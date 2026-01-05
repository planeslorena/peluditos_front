import './modales.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTurno, deleteTurno, getAllMascotas } from '@/app/services/client';
import { deshabilitarTurno, getPeluqueras } from '@/app/services/admin';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

const schema = yup.object().shape({
    dia: yup.string().required('Debe seleccionar una fecha'),
    hora: yup.string().required('Debe ingresar un horario'),
    peluquera: yup.number().required('Debe seleccionar una peluquera'),
    mascota: yup.string().required('Debe seleccionar una mascota'),
});

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    updateAgenda: () => void;
    defaultData?: {
        id_turno?: number;
        dia: string | null;
        hora?: string;
        peluquera?: { id_peluquera: number };
        mascota?: { id_mascota: number, nombre: string, duenio?: { nombre: string } };
    };
    action?: string;
}

export const ModalTurno: React.FC<ModalProps> = ({
    show,
    handleClose,
    updateAgenda,
    defaultData,
    action
}) => {
    const [peluqueras, setPeluqueras] = useState<any[]>([]);
    const [mascotas, setMascotas] = useState<any[]>([]);

    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    useEffect(() => {
        const cargarDatos = async () => {
            const peluqs = await getPeluqueras();
            const pets = await getAllMascotas();
            setPeluqueras(peluqs || []);
            setMascotas(pets || []);

            if (defaultData) {
                reset({
                    dia: defaultData?.dia ?? '',
                    hora: defaultData?.hora ?? '',
                    peluquera: defaultData?.peluquera?.id_peluquera ?? '',
                    mascota: defaultData?.mascota?.id_mascota ?? '',
                });
            } else {
                reset({
                    dia: '',
                    hora: '',
                    peluquera: '',
                    mascota: '',
                });
            }
        };

        cargarDatos();
    }, [defaultData, reset]);

    const onSubmit: SubmitHandler<any> = async (formData) => {
        try {
            const turno = {
                ...formData,
                id_turno: null,
                mascota: { id_mascota: formData.mascota },
                peluquera: { id_peluquera: formData.peluquera }
            }
            const resp = await createTurno(turno);
            if (resp === 201) {
                Swal.fire('Turno creado', 'El turno fue asignado correctamente.', 'success');
                updateAgenda();
                handleClose();
            } else {
                Swal.fire('Error', 'No se pudo crear el turno.', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al crear el turno.', 'error');
        }
    };

    const cancelarTurno = async (id_turno: any) => {
        Swal.fire({
            title: "Advertencia",
            text: `Estas seguro de que quieres eliminar el turno?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await deleteTurno(id_turno);
                if (resp == 200) {
                    Swal.fire({
                        title: `Eliminar turno`,
                        text: `El turno fue eliminado con exito!`,
                        icon: "success"
                    });
                    updateAgenda();
                    handleClose();
                } else {
                    Swal.fire({
                        title: `${resp}`,
                        text: `No se pudo eliminar el turno`,
                        icon: "error"
                    });
                }
            }
        });
    }

    const deshabilitaTurno = async (turnoADeshabilitar :any) => {
        Swal.fire({
            title: "Advertencia",
            text: `Estas seguro de que quieres deshabilitar el turno?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await deshabilitarTurno(turnoADeshabilitar);
                if (resp == 201) {
                    Swal.fire({
                        title: `Deshabilitar turno`,
                        text: `El turno fue deshabilitado con exito!`,
                        icon: "success"
                    });
                    updateAgenda();
                    handleClose();
                } else {
                    Swal.fire({
                        title: `${resp}`,
                        text: `No se pudo deshabilitar el turno`,
                        icon: "error"
                    });
                }
            }
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {action === 'ver' ? 'Ver Turno' : 'Asignar Turno'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input hidden defaultValue={defaultData?.id_turno} {...register('id_turno')} />

                    <div className="form-group mb-2">
                        <label>Fecha</label>
                        <input
                            readOnly={action === 'ver'}
                            type="date"
                            className={`form-control ${errors.dia ? 'is-invalid' : ''}`}
                            {...register('dia')}
                        />
                        {errors.dia && <div className="invalid-feedback">{String(errors.dia.message)}</div>}
                    </div>

                    <div className="form-group mb-2">
                        <label>Horario</label>
                        <input
                            type="time"
                            readOnly={action === 'ver'}
                            className={`form-control ${errors.hora ? 'is-invalid' : ''}`}
                            {...register('hora')}
                        />
                        {errors.hora && (
                            <div className="invalid-feedback">{String(errors.hora.message)}</div>
                        )}
                    </div>

                    <div className="form-group mb-2">
                        <label>Peluquera</label>
                        <select
                            className={`form-control ${errors.peluquera ? 'is-invalid' : ''}`}
                            disabled={action === 'ver'}
                            {...register('peluquera')}
                        >
                            <option value="">Seleccione</option>
                            {peluqueras.map((p) => (
                                <option key={p.id_peluquera} value={p.id_peluquera}>
                                    {p.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.peluquera &&
                            <div className="invalid-feedback">{String(errors.peluquera.message)}</div>
                        }
                    </div>

                    <div className="form-group mb-2">
                        <label>Mascota</label>
                        <Controller
                            name="mascota"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    value={mascotas
                                        .map((m) => ({
                                            value: m.id_mascota,
                                            label: `${m.nombre} - ${m.duenio?.nombre}`,
                                        }))
                                        .find((opt) => opt.value === field.value) || null}
                                    onChange={(selected) => field.onChange(selected?.value || '')}
                                    options={mascotas.map((m) => ({
                                        value: m.id_mascota,
                                        label: `${m.nombre} - ${m.duenio?.nombre}`,
                                    }))}
                                    placeholder="Seleccione o busque una mascota..."
                                    isSearchable
                                    isDisabled={action === 'ver'}
                                    classNamePrefix="react-select"
                                    className={errors.mascota ? 'is-invalid' : ''}
                                />
                            )}
                        />

                        {errors.mascota && (
                            <div className="invalid-feedback">{String(errors.mascota.message)}</div>
                        )}
                    </div>

                    {action !== 'ver' &&
                        <div className='d-flex flex-row justify-content-between my-3'>
                            <div>
                                <button
                                    type="button"
                                    className="btn-style"
                                    onClick={() => deshabilitaTurno(
                                        {
                                            dia: defaultData?.dia,
                                            hora: defaultData?.hora,
                                            peluquera: { id_peluquera: defaultData?.peluquera?.id_peluquera }
                                        })}>
                                    Deshabilitar turno
                                </button>
                            </div>
                            <div>
                                <button type="submit" className="btn-style">
                                    Asignar turno
                                </button>
                            </div>
                        </div>
                    }
                    {action === 'ver' &&
                        <div className="d-flex justify-content-end mt-3">
                            <button type="button" className="btn-style" onClick={() => cancelarTurno(defaultData?.id_turno)}>
                                Cancelar turno
                            </button>
                        </div>
                    }
                </form>
            </Modal.Body>
        </Modal>
    );
};
