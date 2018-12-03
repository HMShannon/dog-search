import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="flex-container">
      <div id="site-header">
        <Link to={'/'} style={{textDecoration: 'none', color: 'white' }}><h1>Dog Search</h1></Link>
      </div>
    </div>
  );
}

export default Header;
