"use client";

export function CardDogs() {
  const dogImages = [
    './images/perro1.png',
    './images/perro1.png',
    './images/perro1.png',
    './images/perro1.png',
    './images/perro2.png',
    './images/perro2.png',
    
  ];

  return (
    <>
      <div>
        <h1 className="text-center text-service mb-4 p-3">Nuestros clientes</h1>
      </div>

      <div className="container">
        <div className="row">
          {dogImages.map((src, index) => (
            <div key={index} className=" col-6 col-sm-6 col-md-4 col-lg-4 mb-4">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


