"use client";
import { faBathtub, faShower } from '@fortawesome/free-solid-svg-icons';
import './cardService.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faScissors } from '@fortawesome/free-solid-svg-icons/faScissors';



export function CardService() {
  return (
    <section id='servicios'>
      <div>
        <h1 className="text-center text-service mb-4 p-4">Nuestros servicios</h1>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-sm-12 col-md-4 col-lg-4 d-flex justify-content-center card shadow p-2 m-3">
            <FontAwesomeIcon icon={faHeart} className="m-3 icon-service" />
            <h5 className="card-title text-center d-flex flex-column font-text" >
              Asesoramiento 
              <br />en cuidado
              <br />y bienestar
            </h5>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4 d-flex justify-content-center card shadow p-2 m-3">
            <FontAwesomeIcon icon={faBathtub} className="m-3 icon-service" />
            <h5 className="card-title text-center d-flex flex-column font-text" >
              Baños 
              <br />higiénicos
            </h5>
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4 d-flex justify-content-center card shadow p-3 m-3">
            <FontAwesomeIcon icon={faScissors} className="m-3 icon-service" />
            <h5 className="card-title text-center d-flex flex-column font-text" >
              Corte y
              <br /> estilismo profesional
            </h5>
          </div>
          
        </div>
      </div>

    </section>
  )
}