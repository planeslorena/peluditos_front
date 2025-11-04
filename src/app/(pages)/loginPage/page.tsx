'use client'
import "./page.css";
import FormLogin from "@/app/components/Usuario/usuario";

export default function LoginPage() {

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-5 position-absolute top-50 start-50 translate-middle rounded login d-flex flex-column align-items-center justify-content-center shadow">
                        <h1 className="title-name display-6 my-3">Bienvenidos a Peluditos</h1>
                        <img src="/images/perro_saludando.png" alt="Perro saludando" className="img-fluid h-25 mb-3" />
                        <FormLogin />
                    </div>
                </div>
            </div>
        </main>
    )
}