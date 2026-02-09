'use client'
import './formAgregarMascota.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '@/app/context/user.context';
import { useContext, useState } from 'react';
import { createMascota } from '@/app/services/client';
import Swal from 'sweetalert2';
import { getRazas } from '@/app/services/admin';

const schema = yup.object().shape({
    nombreMascota: yup.string().required('El nombre de la mascota es requerido'),
    raza: yup.string().required('La raza es requerida'),
    edad: yup.string()
        .required('La edad es requerida')
        .matches(/^\d+$/, 'La edad debe ser un número')
        .test('positive', 'La edad debe ser positiva', value =>
            value ? parseInt(value) > 0 : true
        ),
    tipo_edad: yup.string().required('El tipo de edad es requerido'),
    castrado: yup.boolean().required('Debe indicar si está castrado'),
    vacuna_rabia: yup.string().required('La fecha de la vacuna de rabia es requerida').matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato inválido, use MM/AAAA').test('no-futura', 'La fecha no puede ser futura', (value) => {
        if (!value) return true;
        const [mes, anio] = value.split('/').map(Number);
        const fecha = new Date(anio, mes - 1);
        return fecha <= new Date();
    }),
    vacuna_sextuple: yup.string().required('La fecha de la vacuna sextuple es requerida').matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato inválido, use MM/AAAA').test('no-futura', 'La fecha no puede ser futura', (value) => {
        if (!value) return true;
        const [mes, anio] = value.split('/').map(Number);
        const fecha = new Date(anio, mes - 1);
        return fecha <= new Date();
    }),
    desparasitado: yup.boolean().required('Debe indicar si está desparasitado'),
    veterinario: yup.string().required('El nombre del veterinario es requerido'),
    tel_veterinario: yup.string().required('El teléfono del veterinario es requerido').matches(/^\d+$/, 'El teléfono debe ser un número'),
    direccion_veterinario: yup.string().optional(),
    observaciones: yup.string().optional(),
});

interface FormData {
    nombreMascota: string;
    raza: string;
    edad: string;
    tipo_edad: string;
    castrado: boolean;
    desparasitado: boolean;
    vacuna_rabia: string;
    vacuna_sextuple: string;
    veterinario: string;
    tel_veterinario: number;
    direccion_veterinario?: string;
    observaciones?: string;
}

export default function FormAgregarMascota(props: any) {
    const { handleClose}: { handleClose: Function } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) as any
    });
    const { userData } = useContext(UserContext);
    const [razas, setRazas] = useState<string[]>([]);


    const cargarRazas = async () => {
        const razas = await getRazas() || [];
        setRazas(razas);
    }

    const onSubmit = async (data: FormData) => {
        const mascota = {
            nombre: data.nombreMascota,
            raza: data.raza,
            edad: data.edad,
            tipo_edad: data.tipo_edad,
            castrado: data.castrado,
            desparasitado: data.desparasitado,
            antirrabica: data.vacuna_rabia,
            sextuple: data.vacuna_sextuple,
            veterinario: data.veterinario,
            tel_veterinario: data.tel_veterinario,
            direccion_veterinario: data.direccion_veterinario,
            observaciones: data.observaciones,
            duenio: userData?.id_cliente
        };
        const resp = await createMascota(mascota);

        if (resp == 500) {
            Swal.fire({
                title: `Algo no salio bien.`,
                text: "Intenta nuevamente.",
                icon: "error"
            });
        } else {
            Swal.fire({
                title: `${mascota.nombre} se agrego correctamente!`,
                text: "Ya podes reservarle un turno!",
                icon: "success"
            });
            handleClose();
        }
    };

    return (
        <>
            <form id="pet-form" onSubmit={handleSubmit(onSubmit)} className="pet-form">
                <div className="form-group mb-2">
                    <label>Nombre de la mascota</label>
                    <input
                        type="text"
                        className={`form-control ${errors.nombreMascota ? 'is-invalid' : ''}`}
                        {...register('nombreMascota')}
                    />
                    {errors.nombreMascota && <div className="invalid-feedback">{errors.nombreMascota.message}</div>}
                </div>

                <div className='row mb-2'>
                    <div className="col-6">
                        <label>Raza (o parecido a:)</label>
                        <select
                            className={`form-control ${errors.raza ? 'is-invalid' : ''}`}
                            {...register('raza')}
                            onClick={cargarRazas}
                            defaultValue=""
                        >
                            <option key={0} value="" disabled>Seleccione una raza</option>
                            {razas.map((raza: any) => (
                                <option key={raza.id_raza} value={raza.raza}>{raza.raza}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-3">
                        <label>Edad</label>
                        <input
                            type="number"
                            className={`form-control ${errors.edad ? 'is-invalid' : ''}`}
                            {...register('edad')}
                        />
                        {errors.edad && <div className="invalid-feedback">{errors.edad.message}</div>}
                    </div>
                    <div className="col-3">
                        <label>Años/Meses</label>
                        <select
                            className={`form-control ${errors.tipo_edad ? 'is-invalid' : ''}`}
                            {...register('tipo_edad')}
                            defaultValue=""
                        >
                            <option value="años">Años</option>
                            <option value="meses">Meses</option>
                        </select>
                    </div>
                </div>
                <div className='row mb-2'>

                    <div className=" col">
                        <label className="form-check-label">Vacuna de la rabia</label>
                        <input
                            type="text" placeholder="MM/AAAA"
                            className={`form-control ${errors.vacuna_rabia ? 'is-invalid' : ''}`}
                            {...register('vacuna_rabia')}
                        />
                        {errors.vacuna_rabia && <div className="text-danger">{errors.vacuna_rabia.message}</div>}
                    </div>
                    <div className=" col">
                        <label className="form-check-label">Vacuna sextuple</label>
                        <input
                            type="text" placeholder="MM/AAAA"
                            className={`form-control ${errors.vacuna_sextuple ? 'is-invalid' : ''}`}
                            {...register('vacuna_sextuple')}
                        />
                        {errors.vacuna_sextuple && <div className="text-danger">{errors.vacuna_sextuple.message}</div>}
                    </div>
                </div>
                <div className='row mb-2 ms-1'>
                    <div className="form-check col">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register('desparasitado')}
                        />
                        <label className="form-check-label">Desparasitado</label>
                        {errors.desparasitado && <div className="text-danger">{errors.desparasitado.message}</div>}
                    </div>

                    <div className="form-check col">
                        <input
                            type="checkbox"
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
                            className={`form-control ${errors.tel_veterinario ? 'is-invalid' : ''}`}
                            {...register('tel_veterinario')}
                        />
                        {errors.tel_veterinario && <div className="invalid-feedback">{errors.tel_veterinario.message}</div>}
                    </div>
                    <div className="col">
                        <label>Dirección Veterinario</label>
                        <input
                            type="text"
                            className={`form-control ${errors.direccion_veterinario ? 'is-invalid' : ''}`}
                            {...register('direccion_veterinario')}
                        />
                        {errors.direccion_veterinario && <div className="invalid-feedback">{errors.direccion_veterinario.message}</div>}
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label>Observaciones</label>
                    <textarea
                        className={`form-control ${errors.observaciones ? 'is-invalid' : ''}`}
                        {...register('observaciones')}
                        placeholder='Escribe aquí cualquier detalle adicional que consideres importante del comportamiento o salud de tu mascota (Miedos, fobias, alergias, cuidados especiales, etc.)'
                        rows={3}
                    />
                    {errors.observaciones && <div className="invalid-feedback">{errors.observaciones.message}</div>}
                </div>
                <button type="submit" className='btn-style'> Guardar</button>
            </form>
        </>
    );
}
