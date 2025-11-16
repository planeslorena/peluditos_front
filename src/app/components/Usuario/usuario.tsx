'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import "./usuario.css"
import { login } from "@/app/services/login";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/app/context/user.context";
import FormRegistrarse from "../FormRegistrarse/formRegistrarse";
import { TurnoContext } from "@/app/context/turno.context";

interface Data {
  dni: number;
}

export default function Usuario(props: any) {
  const { setMostrarHorarios, setMostrarUsuario, setMostrarMascotas }: { setMostrarHorarios: Function, setMostrarUsuario: Function, setMostrarMascotas: Function } = props;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Data>();


  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);
  const [mostrarFormLogin, setMostrarFormLogin] = useState(true);
  const [mostrarFormRegistrarse, setMostrarFormRegistrarse] = useState(false);

  const irAtras = () => {
    router.push("/home");
  }

  const onSubmit: SubmitHandler<Data> = async (data) => {
    //Llama a el backend para generar el login
    const resp = await login(data);

    //Si hay un error de usuario no autorizado o usuario inexistente, muestra mensaje en pantalla
    if (resp.length == 0) {
      setError("dni", {
        type: "manual",
        message: 'No existe un usuario resgistrado con ese DNI. Registrate en el link de abajo para continuar.',
      })
    } else {
      //Si el login es exitoso guardo la info del usuario en el contexto
      setUserData(resp);
      setMostrarUsuario(false);
      setMostrarMascotas(true);
    }
  };

  const handleRegistrarse = () => {
    setMostrarFormLogin(false);
    setMostrarFormRegistrarse(true);
  }

  return (
    <>
      {mostrarFormLogin && (
        <>
          <div className='d-flex flex-column align-items-start justify-content-start w-100'>
            <i className="bi bi-arrow-left" onClick={irAtras}></i>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center mb-3">
            <h4 className="font-text">Inicía sesión en Peluditos</h4>
            <p className="font-text text-center">Si ya sos cliente, ingresa con tu DNI para continuar</p>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column my-2 d-grid gap-2 col-8 mx-auto">
              <input placeholder="DNI" type="number" className="rounded p-1 btn-dni"
                {...register("dni", {
                  required: "Por favor ingrese su DNI",
                  minLength: { value: 6, message: "Ingrese un numero de DNI valido" },
                  maxLength: { value: 8, message: "Ingrese un numero de DNI valido" }
                })} />
              {errors.dni && <small className="fw-light">{errors.dni?.message}</small>}

              <button type="submit" className="btn-style rounded p-1" >Ingresar</button>
              <small className="font-text text-registrarse" onClick={() => handleRegistrarse()}>
                <u className="text-registrarse">Soy nuevo, me quiero registrar</u>
              </small>
            </form>
          </div>
        </>
      )}

      {mostrarFormRegistrarse && (
        <FormRegistrarse
          setMostrarFormLogin={setMostrarFormLogin}
          setMostrarFormRegistrarse={setMostrarFormRegistrarse}
          setMostrarMascotas={setMostrarMascotas}
          setMostrarUsuario={setMostrarUsuario}
        />
      )}
    </>
  )
}