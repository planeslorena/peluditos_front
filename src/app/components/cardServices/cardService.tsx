"use client";
import { faBathtub, faShower } from '@fortawesome/free-solid-svg-icons';
import './cardService.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faScissors } from '@fortawesome/free-solid-svg-icons/faScissors';



export function CardService() {
    return (
        <>
        <div>
        <h1 className="text-center text-service mb-4 p-5">Nuestros servicios</h1>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div className="card shadow" style={{  width: '340px', height: '110px', background: '#f2e0d5'}}>
              <div className="card-body d-flex justify-content-center align-items-center">
                <h5 className="card-title text-center" style={{ color: '#400203'}} >
                
                  <FontAwesomeIcon icon={faHeart} style={{ color: '#400203', fontSize: '32px' }} className="me-2" />
                  Asesoramiento en cuidado y bienestar
                </h5>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div className="card shadow" style={{width: '340px',height: '110px' ,background: '#CD9F85'}}>
              <div className="card-body d-flex justify-content-center align-items-center">
                <h5 className="card-title text-center" style={{ color: '#400203'}}>
                  <FontAwesomeIcon icon={faBathtub} style={{ color: '#400203', fontSize: '32px' }} className="me-2" />
                  Baños higiénicos
                </h5>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center "  >
            <div className="card shadow"style={{ width: '340px', height: '110px', background: '#CD9F85' }} >
              <div className="card-body d-flex justify-content-center align-items-center">
                <h5 className="card-title text-center" style={{ color: '#400203'}}>
                  <FontAwesomeIcon icon={faScissors} style={{ color: '#400203', fontSize: '32px' }} className="me-2" />
                  Corte y estilismo profesional
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

        </>


    )
}