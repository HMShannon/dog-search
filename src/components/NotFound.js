import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = (props) => {
  return (
    <div id="not-found">
      <h1>This page doesn't exist...</h1>
      <Link to="/">Go back</Link>
    </div>
  )
}

export default NotFound;
