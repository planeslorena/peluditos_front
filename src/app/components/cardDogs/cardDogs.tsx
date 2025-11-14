"use client";
import './cardDogs.css'

export function CardDogs() {

  return (
    <>
      <div>
        <h1 className="text-center text-service m-5 p-3">Nuestros clientes</h1>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-around">
          <div className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center align-items-center shadow rounded card card-dog p-2 m-2">
            <img
              src="/images/badu.jpeg"
              className="img-fluid img-perros rounded"
              alt={`badu`}
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center align-items-center shadow rounded card card-dog p-2 m-2">
            <img
              src="/images/puki.jpeg"
              className="img-fluid img-perros rounded"
              alt={`badu`}
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center align-items-center shadow rounded card card-dog p-2 m-2">
            <img
              src="/images/olivia.jpeg"
              className="img-fluid img-perros rounded"
            />
          </div>
        </div>
      </div>
    </>
  );
}


