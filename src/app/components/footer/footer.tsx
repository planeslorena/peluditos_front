'use client';
import './footer.css'

export function Footer() {
    return (
        <>
            <div className="footer bg-footer text-center p-4 mt-5" id='contacto' >
                <div className="container">
                    <div >
                        <img
                            src="/images/logo-peluditos-transp.png"
                            alt="Logo Peluditos"
                            className="footer-logo"
                        />
                    </div>

                    <div className="d-flex justify-content-center gap-3 my-1 redes-container">
                        <a
                            href="https://wa.me/5492284614523"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='social-icon'>
                            <i className="bi bi-whatsapp" />
                        </a>
                        <a
                            href="https://www.instagram.com/peluditos.peluqueriacaninapoly"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='social-icon'>
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a
                            href="https://maps.app.goo.gl/Byw9Nj3XQ3g8U9zf7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='social-icon'>
                            <i className="bi bi-geo-alt"></i>
                        </a>
                    </div>
                    <div className='border-top mt-3'>
                    <p className='mt-3 font-text' >© 2025 Peluditos Poly. Todos los derechos reservados.
                        <br /> Creado por TuWeb Studio
                    </p>
                    </div>
                </div>
            </div>

        </>
    )
} 
