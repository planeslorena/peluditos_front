"use client";

export function CardDogs() {
  const dogImages = [
    './images/perro1.png',
    './images/perro2.png',
    './images/perro2.png',

  ];

  return (
    <>
      <div>
        <h1 className="text-center text-service m-5 p-3">Nuestros clientes</h1>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-around">
          {dogImages.map((src, index) => (
            <div key={index} className="col-3 col-sm-6 col-md-4 col-lg-3 p-4 m-2 shadow rounded">
              <img  
                src={src}
                className="img-fluid"
                alt={`Cliente perro ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px'
                }}
              />
              <p className="title-name text-center mt-4">Lola</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


