'use client';
import Carousel from 'react-bootstrap/Carousel';
import './bannerHome.css';
import { useRouter } from 'next/navigation';

export function BannerHome() {
    const router = useRouter();
    const handleClickClient = () => {
        router.push('/client');
    }

    return (
        <div className='carousel-wrapper'>
            <Carousel controls={false} indicators={false}>
                <Carousel.Item>
                    <img
                        src="/images/banner1.webp"
                        alt="Perro saludando"
                        className="d-block w-100 img-banner"
                    />
                    <Carousel.Caption>
                        <h3>Un espacio de amor y profesionalismo
                            <br />dedicado a tu mejor amigo</h3>
                        <button className="btn-style p-2 m-2 btn-reserva" onClick={handleClickClient}>
                            Reserva tu turno
                        </button>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        src="/images/banner2.jpg"
                        alt="Perro saludando"
                        className="d-block w-100 img-banner"
                    />
                    <Carousel.Caption>
                        <h3>Un espacio de amor y profesionalismo
                            <br />dedicado a tu mejor amigo</h3>
                        <button className="btn-style p-2 m-2 btn-reserva" onClick={handleClickClient}>
                            Reserva tu turno
                        </button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="/images/banner3.jpeg"
                        alt="Perro saludando"
                        className="d-block w-100 img-banner"
                    />
                    <Carousel.Caption>
                        <h3>Un espacio de amor y profesionalismo
                            <br />dedicado a tu mejor amigo</h3>
                        <button className="btn-style p-2 m-2 btn-reserva" onClick={handleClickClient}>
                            Reserva tu turno
                        </button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>

    );
}
