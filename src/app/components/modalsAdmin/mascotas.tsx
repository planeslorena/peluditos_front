//import { createUser, updateClient } from '@/app/services/User';
import './modales.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getRazas } from '@/app/services/admin';
import { Imascota } from '@/app/model/Imascota';
import { createMascota, updateMascota } from '@/app/services/client';


const schema = yup.object().shape({
    //Datos de la mascota
    nombre: yup.string().required('El nombre de la mascota es requerido'),
    num_mascota: yup.string()
        .required('La numero de mascota es requerido')
        .matches(/^\d+$/, 'El numero debe ser un número')
        .test('positive', 'El numero debe ser positivo', value =>
            value ? parseInt(value) > 0 : true
        ),
    raza: yup.string().required('La raza es requerida'),
    edad: yup.string()
        .required('La edad es requerida')
        .matches(/^\d+$/, 'La edad debe ser un número')
        .test('positive', 'La edad debe ser positiva', value =>
            value ? parseInt(value) > 0 : true
        ),
    castrado: yup.boolean().required('Debe indicar si está castrado'),
    desparasitado: yup.boolean().required('Debe indicar si está desparasitado'),
    antirrabica: yup.string().required('La fecha de la vacuna de rabia es requerida').matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato inválido, use MM/AAAA').test('no-futura', 'La fecha no puede ser futura', (value) => {
        if (!value) return true;
        const [mes, anio] = value.split('/').map(Number);
        const fecha = new Date(anio, mes - 1);
        return fecha <= new Date();
    }),
    sextuple: yup.string().required('La fecha de la vacuna sextuple es requerida').matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato inválido, use MM/AAAA').test('no-futura', 'La fecha no puede ser futura', (value) => {
        if (!value) return true;
        const [mes, anio] = value.split('/').map(Number);
        const fecha = new Date(anio, mes - 1);
        return fecha <= new Date();
    }),
    veterinario: yup.string().required('El nombre del veterinario es requerido'),
    tel_veterinario: yup.string().required('El teléfono del veterinario es requerido').matches(/^\d+$/, 'El teléfono debe ser un número'),
    direccion_veterinario: yup.string().optional(),
    observaciones: yup.string().optional(),
    shampoo: yup.string().optional(),
    //Datos del dueño
    duenio: yup.object().shape({
        dni: yup.number().required("Por favor ingrese un DNI del dueño"),
        nombre: yup.string().required("Por favor ingrese un nombre del dueño"),
        telefono: yup.number().required("Por favor ingrese un teléfono del dueño"),
        mail: yup.string().email('Ingrese un email válido').required("Por favor ingrese un email del dueño"),
    }),
});

interface clientProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    dataDuenio?: any;
    action: string;
    updateData: () => void;
}

export const ModalMascota: React.FC<clientProps> = ({ show, handleClose, data, action, updateData, dataDuenio }) => {

    const [errorRegister, setErrorRegister] = useState('');
    const [razas, setRazas] = useState<string[]>([]);
    const { handleSubmit, register, reset, setValue, formState: { errors, isValid } } = useForm<Imascota>({
        mode: 'onChange',
        resolver: yupResolver(schema) as any,
        defaultValues: {
            raza: '', // valor por defecto vacío
        },
    });


    const cargarRazas = async () => {
        const razas = await getRazas() || [];
        setRazas(razas);
    }

    const normalizeData = (data: Imascota) => {
        return {
            ...data,
            id_mascota: data.id_mascota ? Number(data.id_mascota) : null,
            num_mascota: data.num_mascota ? Number(data.num_mascota) : null,
            edad: Number(data.edad),
            observaciones: data.observaciones == "" ? null : data.observaciones,
            shampoo: data.shampoo == "" ? null : data.shampoo,
            tel_veterinario: Number(data.tel_veterinario),
            direccion_veterinario: data.direccion_veterinario == "" ? null : data.direccion_veterinario,
            duenio: {
                id_cliente: Number(data.duenio.id_cliente),
                dni: Number(data.duenio.dni),
                nombre: data.duenio.nombre,
                telefono: Number(data.duenio.telefono),
                mail: data.duenio.mail
            },
        };
    }

    const onSubmit: SubmitHandler<Imascota> = async (newData) => {
        const newMascota = normalizeData(newData);

        if (action == 'Agregar') {
            const resp = await createMascota(newMascota);

            if (resp == 500) {
                Swal.fire({
                    title: `Algo no salio bien.`,
                    text: "Intenta nuevamente.",
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: `${newMascota.nombre} se agrego correctamente!`,
                    text: "Ya podes reservarle un turno!",
                    icon: "success"
                });
                updateData();
                handleClose();
            }

        } else if (action == 'Modificar') {
            const originalData = normalizeData(data);
            let isModified = false;

            for (const key in newMascota) {
                if (JSON.stringify(newMascota[key as keyof typeof newMascota]) != JSON.stringify(originalData[key as keyof typeof originalData])) {
                    isModified = true;
                    break;
                }
            }

            if (!isModified) {
                setErrorRegister('Debe modificar algún dato.');
            } else {
                setErrorRegister('');
                const resp = await updateMascota(newMascota);

                if (resp == 404) {
                    setErrorRegister('No se encontro mascota para actualizar')
                } else {
                    Swal.fire({
                        title: `Modificación de Mascota`,
                        text: "Mascota actualizada con exito!",
                        icon: "success"
                    });
                    updateData();
                }
            }
        }
    }

    useEffect(() => {
        cargarRazas();
    }, []);

    // Este useEffect se asegura que el valor se setee cuando las razas ya están cargadas
    useEffect(() => {
        if (data?.raza && razas.length > 0) {
            setValue('raza', data.raza);
        }
    }, [razas, data, setValue]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{action} mascota</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <input defaultValue={data?.id_mascota} disabled hidden
                    {...register('id_mascota')} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row mb-2'>
                        <div className="col">
                            <label>Numero de mascota</label>
                            <input
                                type="number"
                                readOnly={action === 'Ver'}
                                defaultValue={data?.num_mascota}
                                className={`form-control ${errors.num_mascota ? 'is-invalid' : ''}`}
                                {...register('num_mascota')}
                            />
                            {errors.num_mascota && <div className="invalid-feedback">{errors.num_mascota.message}</div>}
                        </div>
                        <div className="col">
                            <label>Nombre de la mascota</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver'}
                                defaultValue={data?.nombre}
                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                {...register('nombre')}
                            />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                        </div>
                    </div>

                    <div className='row mb-2'>
                        <div className="col">
                            <label>Raza (o parecido a:)</label>
                            <select
                                disabled={action === 'Ver'}
                                className={`form-control ${errors.raza ? 'is-invalid' : ''}`}
                                {...register('raza')}
                            >
                                {action === 'Agregar' && <option key={0} value="" disabled >Seleccione una raza</option>}
                                {razas.map((raza: any) => (
                                    <option key={raza.raza} value={raza.raza}>{raza.raza}</option>
                                ))}
                            </select>
                            {errors.raza && <div className="invalid-feedback">{errors.raza.message}</div>}
                        </div>

                        <div className="col">
                            <label>Edad (años)</label>
                            <input
                                type="number"
                                readOnly={action === 'Ver'}
                                defaultValue={data?.edad}
                                className={`form-control ${errors.edad ? 'is-invalid' : ''}`}
                                {...register('edad')}
                            />
                            {errors.edad && <div className="invalid-feedback">{errors.edad.message}</div>}
                        </div>
                    </div>
                    <div className='row mb-2'>

                        <div className=" col">
                            <label className="form-check-label">Vacuna de la rabia</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver'}
                                placeholder="MM/AAAA"
                                defaultValue={data?.antirrabica}
                                className={`form-control ${errors.antirrabica ? 'is-invalid' : ''}`}
                                {...register('antirrabica')}
                            />
                            {errors.antirrabica && <div className="text-danger">{errors.antirrabica.message}</div>}
                        </div>
                        <div className=" col">
                            <label className="form-check-label">Vacuna sextuple</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver'}
                                placeholder="MM/AAAA"
                                defaultValue={data?.sextuple}
                                className={`form-control ${errors.sextuple ? 'is-invalid' : ''}`}
                                {...register('sextuple')}
                            />
                            {errors.sextuple && <div className="text-danger">{errors.sextuple.message}</div>}
                        </div>
                    </div>
                    <div className='row mb-2 ms-1'>
                        <div className="form-check col">
                            <input
                                type="checkbox"
                                readOnly={action === 'Ver'}
                                defaultChecked={data?.desparasitado}
                                className="form-check-input"
                                {...register('desparasitado')}
                            />
                            <label className="form-check-label">Desparasitado</label>
                            {errors.desparasitado && <div className="text-danger">{errors.desparasitado.message}</div>}
                        </div>

                        <div className="form-check col">
                            <input
                                type="checkbox"
                                readOnly={action === 'Ver'}
                                defaultChecked={data?.castrado}
                                className="form-check-input"
                                {...register('castrado')}
                            />
                            <label className="form-check-label">Castrado</label>
                            {errors.castrado && <div className="text-danger">{errors.castrado.message}</div>}
                        </div>
                    </div>
                    <div className="form-group mb-2">
                        <label>Veterinario</label>
                        <input
                            type="text"
                            readOnly={action === 'Ver'}
                            defaultValue={data?.veterinario}
                            className={`form-control ${errors.veterinario ? 'is-invalid' : ''}`}
                            {...register('veterinario')}
                        />
                        {errors.veterinario && <div className="invalid-feedback">{errors.veterinario.message}</div>}
                    </div>

                    <div className='row mb-2'>
                        <div className="col">
                            <label>Tel. Veterinario</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver'}
                                defaultValue={data?.tel_veterinario}
                                className={`form-control ${errors.tel_veterinario ? 'is-invalid' : ''}`}
                                {...register('tel_veterinario')}
                            />
                            {errors.tel_veterinario && <div className="invalid-feedback">{errors.tel_veterinario.message}</div>}
                        </div>
                        <div className="col">
                            <label>Dirección Veterinario</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver'}
                                defaultValue={data?.direccion_veterinario}
                                className={`form-control ${errors.direccion_veterinario ? 'is-invalid' : ''}`}
                                {...register('direccion_veterinario')}
                            />
                            {errors.direccion_veterinario && <div className="invalid-feedback">{errors.direccion_veterinario.message}</div>}
                        </div>
                    </div>
                    <div className="form-group mb-2">
                        <label>Shampoo</label>
                        <input
                            type="text"
                            readOnly={action === 'Ver'}
                            defaultValue={data?.shampoo}
                            className={`form-control ${errors.shampoo ? 'is-invalid' : ''}`}
                            {...register('shampoo')}
                        />
                        {errors.shampoo && <div className="invalid-feedback">{errors.shampoo.message}</div>}
                    </div>

                    <div className="form-group mb-2">
                        <label>Observaciones</label>
                        <textarea
                            readOnly={action === 'Ver'}
                            defaultValue={data?.observaciones}
                            className={`form-control ${errors.observaciones ? 'is-invalid' : ''}`}
                            {...register('observaciones')}
                            placeholder='Escribe aquí cualquier detalle adicional que consideres importante del comportamiento o salud de tu mascota (Miedos, fobias, alergias, cuidados especiales, etc.)'
                            rows={3}
                        />
                        {errors.observaciones && <div className="invalid-feedback">{errors.observaciones.message}</div>}
                    </div>
                    <input defaultValue={data?.duenio.id_cliente || dataDuenio?.id_cliente}
                        disabled hidden {...register('duenio.id_cliente')} />
                    <div className='row mb-2'>
                        <div className="col">
                            <label>Dueño</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver' || action === 'Modificar'}
                                defaultValue={data?.duenio.nombre || dataDuenio?.nombre}
                                className={`form-control ${errors.duenio?.nombre ? 'is-invalid' : ''}`}
                                {...register('duenio.nombre')}
                            />
                            {errors.duenio?.nombre && <div className="invalid-feedback">{errors.duenio.nombre.message}</div>}
                        </div>
                        <div className="col">
                            <label>DNI dueño</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver' || action === 'Modificar'}
                                defaultValue={data?.duenio.dni || dataDuenio?.dni}
                                className={`form-control ${errors.duenio?.dni ? 'is-invalid' : ''}`}
                                {...register('duenio.dni')}
                            />
                            {errors.duenio?.dni && <div className="invalid-feedback">{errors.duenio.dni.message}</div>}
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className="col">
                            <label>Tel. Dueño</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver' || action === 'Modificar'}
                                defaultValue={data?.duenio.telefono || dataDuenio?.telefono}
                                className={`form-control ${errors.duenio?.telefono ? 'is-invalid' : ''}`}
                                {...register('duenio.telefono')}
                            />
                            {errors.duenio?.telefono && <div className="invalid-feedback">{errors.duenio.telefono.message}</div>}
                        </div>
                        <div className="col">
                            <label>Mail Dueño</label>
                            <input
                                type="text"
                                readOnly={action === 'Ver' || action === 'Modificar'}
                                defaultValue={data?.duenio.mail || dataDuenio?.mail}
                                className={`form-control ${errors.duenio?.mail ? 'is-invalid' : ''}`}
                                {...register('duenio.mail')}
                            />
                            {errors.duenio?.mail && <div className="invalid-feedback">{errors.duenio.mail.message}</div>}
                        </div>
                    </div>
                    <small className='text-validation'>{errorRegister}</small>
                    <div className='m-3 d-flex justify-content-end'>
                        <button type='submit' hidden={action === 'Ver'} className='btn-style'>{action} mascota</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

