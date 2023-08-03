import React from 'react';
import '../StylesPages/CircleLoader.css';

const CircleLoader = ({ animationDuration = '2s' }) => {
  // Utiliza la propiedad animationDuration para establecer la duración de la animación
  return (
    <div className="overlay">
      <div className="circle" style={{ '--animation-duration': animationDuration }}></div>
    </div>
  );
};

export default CircleLoader;
