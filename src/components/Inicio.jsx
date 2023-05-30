import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import cien from '../img/cien.jpg'
import jugador from '../img/jugador.png'
import meditaciones from '../img/meditaciones.jpg'

const images = [jugador,cien, meditaciones];

const inicio = () => {

  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
return (
  <div> 
    <div className="container p-3">
      <div className="row">
        <div className='text-center col-md-6'>
          <h2>Misión</h2>
          <p>
          Potenciar el aprendizaje en los estudiantes y el ejercicio de la función docente e investigativa, mediante el acceso efectivo a los recursos de información y la provisión de escenarios físicos y virtuales, que respondan a los diferentes estilos de aprendizaje y que promueva la visibilidad académica y científica generada en la Universidad.
          </p>
        </div>
        <div className='text-center col-md-6'>
          <h2>Visión</h2>
          <p>
            Ser el servicio académico de la Universidad de la Costa, más utilizado por la comunidad universitaria interna y externa.
          </p>
        </div>
      </div>

    </div>
    <Slider {...settings}>
    {images.map(image => (
      <div key={image} >
        <img src={image} alt="Imagen" style={{marginTop:40, marginLeft:600}} />
      </div>
    ))}
  </Slider>
  </div>
);

 
}

export default inicio