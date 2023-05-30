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