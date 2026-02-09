import './modales.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//import { createProfesional, updateProfesional } from '@/app/services/profesional'; // ajustá la ruta
import { IProfesional } from '@/app/model/IProfesional'; // creá o usá tu interface
import { createProfesional, updateProfesional } from '@/app/services/admin';

// Días de la semana
const diasSemana: Record<number, string> = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
};

// Validación con Yup
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido'),
  dni: yup.string()
    .required('El DNI es requerido')
    .matches(/^\d+$/, 'Debe contener solo números')
    .min(7, 'Debe tener al menos 7 dígitos')
    .max(8, 'No puede tener más de 8 dígitos'),
  telefono: yup.string().required('El teléfono es requerido'),
  fecha_nacimiento: yup.string().required('La fecha de nacimiento es requerida'),
  horarios: yup.array().of(
    yup.object().shape({
      dia: yup.number().required('Seleccione un día'),
      horario: yup.string().required('Ingrese una hora'),
    })
  ).min(1, 'Debe ingresar al menos un horario'),
});

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  data?: any;
  action: string;
  updateData: () => void;
}

export const ModalProfesional: React.FC<ModalProps> = ({
  show,
  handleClose,
  data,
  action,
  updateData
}) => {

  const [errorRegister, setErrorRegister] = useState('');
  const { handleSubmit, register, reset, control, formState: { errors } } = useForm<IProfesional>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
    defaultValues: {
      horarios: data?.horarios || [{ dia: 1, horario: '' }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'horarios',
  });

  useEffect(() => {
    if (data && action === 'Modificar') reset(data);
  }, [data, reset, action]);

  const normalizeData = (data: IProfesional) => ({
    ...data,
    id_peluquera: data.id_peluquera ? Number(data.id_peluquera) : null,
    dni: Number(data.dni),
    telefono: Number(data.telefono),
    horarios: data.horarios.map(h => ({
      ...h,
      id_horario: h.id_horario ? Number(h.id_horario) : null,
      dia: Number(h.dia),
    })),
  });

  const agregarLunesAViernes = () => {
    const input = document.getElementById('lvHorario') as HTMLInputElement;
    const horario = input?.value;

    if (!horario) return;

    const diasLaborales = [1, 2, 3, 4, 5];

    diasLaborales.forEach((dia) => {
      append({
        id_horario: null,
        dia: dia,
        horario: horario
      });
    });

    input.value = '';
  };


  const onSubmit: SubmitHandler<IProfesional> = async (formData) => {
    const profesional = normalizeData(formData);

    if (action === 'Agregar') {
      const resp = await createProfesional(profesional);
      if (resp === 409) {
        Swal.fire({
          title: 'Error en el alta',
          text: 'El DNI ingresado ya se encuentra registrado.',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Alta Profesional',
          text: 'Profesional registrada con éxito.',
          icon: 'success',
        });
        handleClose();
        reset();
        updateData();
      }
    } else if (action === 'Modificar') {
      console.log(profesional);
      const resp = await updateProfesional(profesional);
      if (resp === 404) {
        setErrorRegister('No se encontró la profesional para actualizar.');
      } else if (resp === 409) {
        Swal.fire({
          title: 'Error en la modificación',
          text: 'El DNI ingresado ya se encuentra registrado.',
          icon: 'error',
        });
      } else if (resp === 200) {
        Swal.fire({
          title: 'Modificación Profesional',
          text: 'Datos actualizados con éxito.',
          icon: 'success',
        });
        handleClose();
        reset();
        updateData();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar la profesional.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>{action} profesional</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>

          <input hidden defaultValue={data?.id_peluquera} {...register('id_peluquera')} />

          <div className="form-group mb-2">
            <label>Nombre</label>
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
                type="text"
                readOnly={action === 'Ver'}
                defaultValue={data?.telefono}
                className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                {...register('telefono')}
              />
              {errors.telefono && <div className="invalid-feedback">{errors.telefono.message}</div>}
            </div>
          </div>

          <div className="form-group mb-2">
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              readOnly={action === 'Ver'}
              defaultValue={data?.fecha_nacimiento}
              className={`form-control ${errors.fecha_nacimiento ? 'is-invalid' : ''}`}
              {...register('fecha_nacimiento')}
            />
            {errors.fecha_nacimiento && <div className="invalid-feedback">{errors.fecha_nacimiento.message}</div>}
          </div>

          {/* --- HORARIOS --- */}
          <div className="form-group mb-2">
            <label>Horarios</label>
            {action !== 'Ver' && (
              <div className="row mb-3">
                <div className="col-5">
                  <input
                    type="time"
                    className="form-control"
                    id="lvHorario"
                  />
                </div>
                <div className="col-5">
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => agregarLunesAViernes()}
                  >
                    Lunes a Viernes
                  </button>
                </div>
              </div>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className="row align-items-center mb-2">
                <div className="col-5">
                  <select
                    className={`form-control ${errors.horarios?.[index]?.dia ? 'is-invalid' : ''}`}
                    {...register(`horarios.${index}.dia` as const)}
                    disabled={action === 'Ver'}
                  >
                    <option value="">Día</option>
                    {Object.entries(diasSemana).map(([num, nombre]) => (
                      <option key={num} value={num}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-5">
                  <input
                    type="time"
                    className={`form-control ${errors.horarios?.[index]?.horario ? 'is-invalid' : ''}`}
                    {...register(`horarios.${index}.horario` as const)}
                    disabled={action === 'Ver'}
                  />
                </div>
                {action !== 'Ver' && (
                  <div className="col-2 text-end">
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(index)}>
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
            {errors.horarios && <div className="text-danger">{(errors.horarios as any).message}</div>}

            {action !== 'Ver' && (
              <button
                type="button"
                className="btn btn-secondary btn-sm mt-2"
                onClick={() => append({ dia: 1, horario: '', id_horario: 0 })}
              >
                + Agregar horario
              </button>
            )}
          </div>

          <small className='text-validation'>{errorRegister}</small>
          <div className="d-flex justify-content-end mt-3">
            {action !== 'Ver' && (
              <button type="submit" className="btn-style">{action} profesional</button>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
