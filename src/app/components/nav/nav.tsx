'use client'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './nav.css';
import { useRouter } from 'next/navigation';

export function Menu() {
  const router = useRouter();
  const handleClickHome = () => {
    router.push('/home');
  };

  return (
    <>
      <Navbar expand="lg" className="bg-light nav-bar">
        <Container fluid>
          <div className="d-flex align-items-center justify-content-between w-100 ">
            <Navbar.Brand onClick={handleClickHome}>
              <img
                src="/images/logo-peluditos2026.jpeg"
                className="img-fluid img-logo"
                alt="Logo Peluditos"
                onClick={() => { router.push('/home') }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => { router.push('/home') }} >Inicio</Nav.Link>
              <Nav.Link onClick={() => { router.push('/client') }}>Turnos</Nav.Link>
              <Nav.Link onClick={() => { router.push('/home#servicios') }}>Servicios</Nav.Link>
              <Nav.Link onClick={() => { router.push('/home#nosotros') }}>Nosotros</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="d-flex gap-3 my-1 redes-container">
          <a
            href="https://wa.me/5492284614523"
            target="_blank"
            rel="noopener noreferrer"
            className='redes'>
            <i className="bi bi-whatsapp" />
          </a>
          <a
            href="https://www.instagram.com/peluditos.peluqueriacaninapoly"
            target="_blank"
            rel="noopener noreferrer"
            className='redes'>
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://maps.app.goo.gl/Byw9Nj3XQ3g8U9zf7"
            target="_blank"
            rel="noopener noreferrer"
            className='redes'>
            <i className="bi bi-geo-alt"></i>
          </a>
        </div>
      </Navbar>
    </>
  );
}