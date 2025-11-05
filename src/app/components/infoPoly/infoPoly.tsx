'use client';
import './infoPoly.css'

export function InfoPoly() {

    return (
        <section id='nosotros'>
            <div className='row my-5 py-5'>
                <div className="container-fluid py-5 " style={{ background: '#f2e0d5' }}>
                    <div className="row align-items-center" >
                        <div className="col-md-5 text-center mb-2 mb-md-0">
                            <img
                                src="/images/poly.png"
                                alt="Perro en baño de burbujas"
                                className="img-fluid"
                                style={{ width: '350px', height: 'auto', zIndex: 1 }}
                            />
                        </div>

                        <div className="col-md-7 text-white">
                            <h3 className="title-info text-center">¡Hola, soy Poly!</h3>
                            <p className='text-infopoly p-3'>Mi misión es brindar un servicio personalizado que combine amor, dedicación y técnica para cada peludito que pasa por mis manos.

                                En Peluditos  no solo me enfoco en embellecer a tu mascota, sino en comprender sus necesidades específicas. Mi experiencia como Groomer y mis capacitaciones constantes me permiten adaptarme a diferentes mantos, razas y personalidades, asegurando que cada corte y cuidado sea perfecto para ellos.

                                Más allá de la estética, creo firmemente en educar y generar un vínculo más profundo entre humanos y animales. Por eso, también ofrezco orientación sobre cuidados, adiestramiento y bienestar animal, ayudándote a entender mejor a tu compañero peludo.

                                ¡Espero conocerte pronto y ser parte del cuidado integral de tu peludito!
                            </p>
                            <div className="d-flex justify-content-center mt-3" >
                                <a href='#contacto'><button className="btn-style">Contactame</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
