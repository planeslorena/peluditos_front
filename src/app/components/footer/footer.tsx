'use client';

import './footer.css'



export function Footer() {

    return (
        <>


            <div className="footer bg-footer text-center py-4 mt-5" id='contacto' >
                <div className="container">
                    <div >
                        <img
                            src="/images/logo-peluditos-8.png"
                            alt="Logo Peluditos"
                            className="footer-logo"
                        />
                    </div>

                    <ul className="footer-icons list-unstyled d-flex justify-content-center gap-4 p-0 m-0">
                        <li>
                            <a href="https://wa.me/5492284614523" target="_blank" >
                               <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/400203/whatsapp--v1.png" alt="whatsapp--v1"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/peluditos.peluqueriacaninapoly/?igsh=eWhhbDd2djNhMzQ3#" target="_blank">
                              <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/400203/instagram-new--v1.png" alt="Instagram" />

                            </a>
                        </li>
                        <li>
                            <a href="https://maps.app.goo.gl/Byw9Nj3XQ3g8U9zf7" target="_blank">
                                <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/400203/marker.png" alt="marker"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
} 
