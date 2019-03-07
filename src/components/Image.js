import React from 'react';

import {connect} from 'react-redux';

const Image = (props) => {
  return (
    <img src={props.src} className="result-image" onClick={() => props.setOpenImage(props.src)} alt={props.src} />
  )
}


const mapStateToProps = (state) => {
  return {};
};


const mapDispatchToProps = (dispatch) => {
  return {
    setOpenImage: (src) => dispatch({type: 'SET_OPEN_IMAGE', payload: src})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);
