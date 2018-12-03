import React from 'react';

const Image = (props) => {
  return (
    <img src={props.src} className="result-image" onClick={props.setOpenImage} alt={props.src} />
  )
}

export default Image;
